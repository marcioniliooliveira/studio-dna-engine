/**
 * test/deep-scrutiny-falsifiability.test.js
 * 
 * Bateria de Testes de Falsificabilidade Negativa (Expected Failure Test Fixtures)
 * Comprova sem ambiguidade que o DeepScrutinyGate detecta e reprova falhas intencionais.
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const { DeepScrutinyGate } = require('../src/qa/deep-scrutiny-gate');

const fixturesRoot = path.resolve(__dirname, 'fixtures/deep-scrutiny-negatives');

test('Falsifiability: DeepScrutinyGate detects and rejects broken sticky scroll container', async () => {
  const siteDir = path.join(fixturesRoot, 'negative-sticky-broken');
  const res = await DeepScrutinyGate.audit({ siteDir, headless: true });

  assert.equal(res.passed, false, 'O gate geral DEVE reprovar a fixture com sticky quebrado');
  assert.equal(res.vetores.stickyIntegrity.passed, false, 'O vetor stickyIntegrity DEVE reprovar');
  assert.ok(res.vetores.stickyIntegrity.brokenStickyCount > 0, 'Deve identificar ao menos 1 elemento com sticky quebrado');
  const broken = res.vetores.stickyIntegrity.brokenStickies[0];
  assert.ok(broken.offendingAncestorsCount > 0, 'Deve identificar os ancestrais causadores do overflow');
});

test('Falsifiability: DeepScrutinyGate detects and rejects AABB text collisions (ghosting)', async () => {
  const siteDir = path.join(fixturesRoot, 'negative-aabb-overlap');
  const res = await DeepScrutinyGate.audit({ siteDir, headless: true });

  assert.equal(res.passed, false, 'O gate geral DEVE reprovar a fixture com colisão de textos');
  assert.equal(res.vetores.aabbOverlap.passed, false, 'O vetor aabbOverlap DEVE reprovar');
  assert.ok(res.vetores.aabbOverlap.collisionsCount > 0, 'Deve identificar colisões de texto 2D');
  assert.ok(res.vetores.aabbOverlap.collisions[0].overlapArea > 20, 'Área de colisão calculada deve ser > 20px²');
});

test('Falsifiability: DeepScrutinyGate permits an explicitly declared 3D front/back text overlap', async () => {
  const siteDir = path.join(fixturesRoot, 'allowed-3d-front-back-overlap');
  const res = await DeepScrutinyGate.audit({ siteDir, headless: true });

  assert.equal(res.passed, true, 'O gate geral DEVE permitir somente a sobreposição declarada');
  assert.equal(res.vetores.aabbOverlap.passed, true, 'O vetor AABB DEVE ignorar o par 3D explicitamente declarado');
  assert.equal(res.vetores.aabbOverlap.collisionsCount, 0, 'O par declarado não deve ser registrado como colisão');
});

test('Falsifiability: DeepScrutinyGate inherits an explicit 3D contract from front/back wrappers', async () => {
  const siteDir = path.join(fixturesRoot, 'allowed-3d-wrapper-contract');
  const res = await DeepScrutinyGate.audit({ siteDir, headless: true });

  assert.equal(res.passed, true, 'O gate deve permitir contrato declarado no wrapper das faces');
  assert.equal(res.vetores.aabbOverlap.passed, true, 'O AABB deve herdar o contrato do ancestral mais próximo');
  assert.equal(res.vetores.aabbOverlap.collisionsCount, 0, 'Folhas de texto sem atributos próprios não devem gerar colisão');
});

test('Falsifiability: DeepScrutinyGate rejects a declared overlap without a 3D front/back pair', async () => {
  const siteDir = path.join(fixturesRoot, 'negative-declared-non-3d-overlap');
  const res = await DeepScrutinyGate.audit({ siteDir, headless: true });

  assert.equal(res.passed, false, 'O gate geral DEVE reprovar uma declaração sem par 3D legítimo');
  assert.equal(res.vetores.aabbOverlap.passed, false, 'O vetor AABB DEVE reprovar grupo declarado sem profundidade 3D');
  assert.ok(res.vetores.aabbOverlap.collisionsCount > 0, 'A colisão declarada sem 3D deve continuar registrada');
});

test('Falsifiability: DeepScrutinyGate detects and rejects click hijacking (invisible overlay)', async () => {
  const siteDir = path.join(fixturesRoot, 'negative-click-hijack');
  const res = await DeepScrutinyGate.audit({ siteDir, headless: true });

  assert.equal(res.passed, false, 'O gate geral DEVE reprovar botão com clique sequestrado');
  assert.equal(res.vetores.clickHijack.passed, false, 'O vetor clickHijack DEVE reprovar');
  assert.ok(res.vetores.clickHijack.hijackedCount > 0, 'Deve identificar o botão bloqueado');
  const hijacked = res.vetores.clickHijack.hijackedTargets[0];
  assert.equal(hijacked.obscuredBy.id, 'intruder-div', 'Deve apontar exatamente o id do elemento intruso');
});

test('Falsifiability: DeepScrutinyGate detects and rejects language leaks (untranslated English)', async () => {
  const siteDir = path.join(fixturesRoot, 'negative-language-leak');
  const res = await DeepScrutinyGate.audit({ siteDir, headless: true });

  assert.equal(res.passed, false, 'O gate geral DEVE reprovar página com termos em inglês não traduzidos');
  assert.equal(res.vetores.languageLeak.passed, false, 'O vetor languageLeak DEVE reprovar');
  assert.ok(res.vetores.languageLeak.untranslatedCount > 0, 'Deve registrar o termo não traduzido');
  const finding = res.vetores.languageLeak.findings[0];
  assert.equal(finding.matchedTerm, 'results-driven', 'Deve identificar a palavra proibida específica');
});

test('Falsifiability: DeepScrutinyGate detects and rejects horizontal layout bleed on mobile', async () => {
  const siteDir = path.join(fixturesRoot, 'negative-layout-bleed');
  const res = await DeepScrutinyGate.audit({ siteDir, headless: true });

  assert.equal(res.passed, false, 'O gate geral DEVE reprovar elemento que causa rolagem horizontal no mobile');
  assert.equal(res.vetores.layoutBleed.passed, false, 'O vetor layoutBleed DEVE reprovar');
  assert.ok(res.vetores.layoutBleed.bleedingElementsCount > 0, 'Deve registrar overflow');
});
