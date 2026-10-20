const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

test('Pipeline Studio DNA PRO — Chat Orb Ingestion & Dual-Stack Artifacts', async (t) => {
  const masterDir = path.resolve(__dirname, '../../copias/useplanes-com');

  await t.test('Stage 1-9: PIPELINE_STATUS.json validation', () => {
    const statusFile = path.join(masterDir, 'PIPELINE_STATUS.json');
    assert.strictEqual(fs.existsSync(statusFile), true, 'PIPELINE_STATUS.json must exist');
    const status = JSON.parse(fs.readFileSync(statusFile, 'utf8'));
    assert.strictEqual(status.status, 'completed', 'Pipeline execution status must be completed');
    assert.strictEqual(status.stages.length, 9, 'All 9 stages must be recorded');
    status.stages.forEach(stage => {
      assert.strictEqual(stage.status, 'passed', `Stage ${stage.name} must have passed`);
    });
  });

  await t.test('Artifact: MASTER_SPEC.md & Assets Manifest', () => {
    assert.strictEqual(fs.existsSync(path.join(masterDir, 'MASTER_SPEC.md')), true);
    assert.strictEqual(fs.existsSync(path.join(masterDir, 'assets-manifest.json')), true);
    assert.strictEqual(fs.existsSync(path.join(masterDir, 'AI_PROMPTS.md')), true);
    assert.strictEqual(fs.existsSync(path.join(masterDir, 'SITE_TYPE.json')), true);
  });

  await t.test('Artifact: Design System Tokens & Styleguide', () => {
    const dsDir = path.join(masterDir, 'design-system');
    assert.strictEqual(fs.existsSync(path.join(dsDir, 'design_dna.json')), true);
    assert.strictEqual(fs.existsSync(path.join(dsDir, 'design-system.html')), true);
  });

  await t.test('Dual-Version Standard: Next.js Component & Standalone HTML exist', () => {
    const standaloneHtml = path.join(masterDir, 'chat-orb-standalone.html');
    const nextJsComponent = path.resolve(__dirname, '../../src/components/ChatOrb/ChatOrb.tsx');
    assert.strictEqual(fs.existsSync(standaloneHtml), true, 'Standalone HTML must exist');
    assert.strictEqual(fs.existsSync(nextJsComponent), true, 'Next.js component must exist');
  });

  await t.test('Runtime Verification: Standalone HTML renders and interacts without errors in Playwright', async () => {
    const standaloneHtml = path.join(masterDir, 'chat-orb-standalone.html');
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    const fileUrl = 'file:///' + standaloneHtml.replace(/\\/g, '/');
    await page.goto(fileUrl, { waitUntil: 'load' });
    await page.waitForTimeout(500);

    // Verify initial element presence
    const shell = await page.$('#orb-morph-shell');
    assert.ok(shell, 'Morph shell element must be present in DOM');

    // Click to open chat
    await shell.click();
    await page.waitForTimeout(400);

    // Verify dialog content is active
    const input = await page.$('#chat-input');
    assert.ok(input, 'Chat input textarea must be present');

    // Type and send a message
    await input.fill('Optimistic updates?');
    await page.click('#btn-send-message');
    await page.waitForTimeout(800);

    // Verify user message rendered in list
    const msgText = await page.textContent('#chat-messages-list');
    assert.ok(msgText.includes('Optimistic updates?'), 'User message must appear in the chat log');

    // Close chat
    await page.click('#btn-close-chat');
    await page.waitForTimeout(300);

    assert.strictEqual(consoleErrors.length, 0, `Should have 0 console errors, got: ${JSON.stringify(consoleErrors)}`);

    await browser.close();
  });
});
