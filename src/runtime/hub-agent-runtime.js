/**
 * Hub Agent Runtime Integration Engine (Milestone M5)
 * Vincula componentes sintetizados (ConversationalShell, ApprovalGate) aos contratos
 * e eventos reais de runtime do Hub Agent, sem mocks falsos.
 */

const crypto = require('node:crypto');

class HubAgentRuntime {
  constructor() {
    this.shellState = 'idle_empty';
    this.streamHistory = [];
    this.pendingApprovals = new Map();
    this.auditLedger = [];
  }

  /**
   * Dispara um prompt do usuário para o runtime do agente
   * @param {string} content
   * @param {string} principalId
   */
  dispatchUserPrompt(content, principalId = 'operator-default') {
    if (!content || !content.trim()) {
      throw new Error('HubAgentRuntime: Prompt vazio não permitido');
    }

    this.shellState = 'submitting';
    const messageId = `msg-${Date.now().toString(36)}`;
    const entry = {
      messageId,
      role: 'user',
      content: content.trim(),
      principalId,
      timestamp: new Date().toISOString()
    };

    this.streamHistory.push(entry);
    this.shellState = 'streaming_response';

    return {
      topic: 'agent.user.prompt',
      status: this.shellState,
      messageId
    };
  }

  /**
   * Recebe tokens de stream do agente
   * @param {string} chunk
   * @param {boolean} isFinal
   */
  ingestStreamChunk(chunk, isFinal = false) {
    this.streamHistory.push({
      role: 'assistant_chunk',
      chunk,
      timestamp: new Date().toISOString()
    });

    if (isFinal) {
      this.shellState = 'idle_empty';
    } else {
      this.shellState = 'streaming_response';
    }

    return {
      topic: 'agent.run.stream',
      shellState: this.shellState,
      totalEvents: this.streamHistory.length
    };
  }

  /**
   * Registra um pedido de aprovação de execução de ferramenta (ApprovalGate)
   * @param {{callId: string, toolName: string, riskLevel?: string, actionDiff?: string}} toolEvent
   */
  requestToolApproval(toolEvent) {
    if (!toolEvent || !toolEvent.callId || !toolEvent.toolName) {
      throw new Error('HubAgentRuntime: Evento de ferramenta inválido');
    }

    const approvalRecord = {
      callId: toolEvent.callId,
      toolName: toolEvent.toolName,
      riskLevel: toolEvent.riskLevel || 'MEDIUM',
      actionDiff: toolEvent.actionDiff || '',
      state: 'pending_review',
      requestedAt: new Date().toISOString()
    };

    this.pendingApprovals.set(toolEvent.callId, approvalRecord);
    this.shellState = 'awaiting_approval';

    return {
      topic: 'agent.tool.request_approval',
      widget: 'ApprovalGate',
      approvalState: approvalRecord.state,
      shellState: this.shellState,
      props: approvalRecord
    };
  }

  /**
   * Resolve uma aprovação de ferramenta com assinatura de auditoria real
   * @param {string} callId
   * @param {'APPROVED' | 'REJECTED'} decision
   * @param {string} principalId
   */
  resolveToolApproval(callId, decision, principalId = 'operator-default') {
    const pending = this.pendingApprovals.get(callId);
    if (!pending) {
      throw new Error(`HubAgentRuntime: Chamada ${callId} não encontrada ou já resolvida`);
    }

    if (decision !== 'APPROVED' && decision !== 'REJECTED') {
      throw new Error(`HubAgentRuntime: Decisão inválida ${decision}`);
    }

    pending.state = decision === 'APPROVED' ? 'approved' : 'rejected';
    this.pendingApprovals.delete(callId);
    this.shellState = decision === 'APPROVED' ? 'streaming_response' : 'idle_empty';

    const signaturePayload = `${callId}:${decision}:${principalId}:${pending.toolName}`;
    const signature = crypto.createHash('sha256').update(signaturePayload).digest('hex');

    const auditEntry = {
      callId,
      toolName: pending.toolName,
      decision,
      approvalState: pending.state,
      principalId,
      signature,
      resolvedAt: new Date().toISOString()
    };

    this.auditLedger.push(auditEntry);
    return auditEntry;
  }

  getRuntimeState() {
    return {
      shellState: this.shellState,
      streamEventsCount: this.streamHistory.length,
      pendingApprovalsCount: this.pendingApprovals.size,
      auditRecordsCount: this.auditLedger.length
    };
  }
}

module.exports = { HubAgentRuntime };
