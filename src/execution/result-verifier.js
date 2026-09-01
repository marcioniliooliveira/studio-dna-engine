const { TaskResultWire } = require('../orchestration/contracts');

function verifierError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function assertTaskPackage(taskPackage) {
  if (!taskPackage || typeof taskPackage !== 'object' || Array.isArray(taskPackage)
    || !['rid', 'cid', 'nid'].every((key) => typeof taskPackage[key] === 'string' && taskPackage[key].length > 0)
    || !Array.isArray(taskPackage.out) || !taskPackage.out.every((id) => typeof id === 'string' && id.length > 0)
    || !Array.isArray(taskPackage.g) || taskPackage.g.length === 0
    || !taskPackage.g.every((id) => typeof id === 'string' && id.length > 0)
    || new Set(taskPackage.out).size !== taskPackage.out.length
    || new Set(taskPackage.g).size !== taskPackage.g.length) {
    throw verifierError('TASK_PACKAGE_INVALID', 'Task package must contain unique declared outputs and gates');
  }
}

function parseTaskResult(taskResult) {
  try {
    return TaskResultWire.parse(taskResult);
  } catch {
    throw verifierError('TASK_RESULT_SCHEMA_INVALID', 'Executor result does not match the strict task-result schema');
  }
}

function artifactReference(taskPackage, artifact) {
  if (!/^[a-f0-9]{64}$/.test(artifact.sha)) {
    throw verifierError('TASK_RESULT_ARTIFACT_INVALID', 'Executor artifact hashes must be lowercase SHA-256 values');
  }
  return {
    id: artifact.sha,
    sha256: artifact.sha,
    runId: taskPackage.rid,
    clientId: taskPackage.cid,
    type: artifact.id,
    relativePath: `${taskPackage.cid}/${taskPackage.rid}/artifacts/${artifact.id}/${artifact.sha}.json`
  };
}

function compactGateResult(id, result) {
  if (!result || typeof result !== 'object' || Array.isArray(result) || typeof result.passed !== 'boolean') {
    return { id, passed: false, evidence: { code: 'GATE_RESULT_INVALID' } };
  }
  return { id, passed: result.passed, evidence: result.evidence ?? null };
}

function failureForArtifact(error, artifactId) {
  return {
    passed: false,
    gateResults: [{
      id: 'artifact.hash',
      passed: false,
      evidence: { code: error.code || 'ARTIFACT_VERIFICATION_FAILED', artifactId }
    }],
    artifactRefs: []
  };
}

function createResultVerifier({ gateCatalog, artifactRegistry }) {
  if (!gateCatalog || typeof gateCatalog !== 'object' || Array.isArray(gateCatalog)
    || !artifactRegistry || typeof artifactRegistry.verify !== 'function' || typeof artifactRegistry.putJson !== 'function') {
    throw new TypeError('gateCatalog and artifactRegistry are required');
  }

  async function verify({ taskPackage, taskResult }) {
    assertTaskPackage(taskPackage);
    const result = parseTaskResult(taskResult);
    if (result.rid !== taskPackage.rid || result.cid !== taskPackage.cid || result.nid !== taskPackage.nid) {
      throw verifierError('TASK_RESULT_IDENTITY_MISMATCH', 'Executor result is not bound to the task package');
    }
    if (!result.art.every((artifact) => taskPackage.out.includes(artifact.id))) {
      throw verifierError('TASK_RESULT_ARTIFACT_UNDECLARED', 'Executor result contains an undeclared artifact');
    }

    const artifactRefs = [];
    for (const artifact of result.art) {
      let reference;
      try {
        reference = artifactReference(taskPackage, artifact);
        artifactRegistry.verify(reference);
      } catch (error) {
        return failureForArtifact(error, artifact.id);
      }
      artifactRefs.push(reference);
    }

    const gateResults = [];
    for (const gateId of taskPackage.g) {
      const gate = gateCatalog[gateId];
      if (typeof gate !== 'function') {
        gateResults.push({ id: gateId, passed: false, evidence: { code: 'GATE_UNAVAILABLE' } });
        continue;
      }
      try {
        gateResults.push(compactGateResult(gateId, await gate({ taskPackage, taskResult: result, artifactRefs })));
      } catch (error) {
        gateResults.push({ id: gateId, passed: false, evidence: { code: error.code || 'GATE_EXCEPTION' } });
      }
    }

    const verification = {
      passed: result.st === 'ok' && gateResults.every((gate) => gate.passed),
      gateResults,
      artifactRefs
    };
    artifactRegistry.putJson({
      runId: taskPackage.rid,
      clientId: taskPackage.cid,
      type: 'verification',
      value: verification,
      sources: artifactRefs
    });
    return verification;
  }

  return Object.freeze({ identity: 'result-verifier', independent: true, verify });
}

module.exports = { createResultVerifier };
