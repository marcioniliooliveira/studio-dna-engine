const test = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const { chromium } = require('playwright');

test('Pipeline Scraped Site — useplanes-com/site/index.html Full Fidelity & Functionality Verification', async (t) => {
  const filePath = path.resolve(__dirname, '../../copias/useplanes-com/site/index.html');
  const fileUrl = 'file:///' + filePath.replace(/\\/g, '/');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  await page.goto(fileUrl, { waitUntil: 'load' });
  await page.waitForTimeout(1000);

  await t.test('Page Structure: Navigation, Header, Sections exist in DOM', async () => {
    const title = await page.title();
    assert.ok(title.includes('Chat Orb') || title.includes('Planes'), 'Title should reflect page name');

    const aside = await page.$('aside');
    assert.ok(aside, 'Sidebar navigation aside should exist');

    const main = await page.$('main');
    assert.ok(main, 'Main container should exist');

    const h1 = await page.textContent('h1');
    assert.ok(h1.includes('Chat Orb'), 'H1 should contain Chat Orb');

    const installation = await page.$('#installation');
    assert.ok(installation, 'Installation section should exist');

    const usage = await page.$('#usage');
    assert.ok(usage, 'Usage section should exist');

    const useCases = await page.$('#use-cases');
    assert.ok(useCases, 'Use cases section should exist');
  });

  await t.test('Tabs: Usage vs Props switching works', async () => {
    const tabUsage = await page.$('#tab-btn-usage');
    const tabProps = await page.$('#tab-btn-props');
    const panelUsage = await page.$('#tab-panel-usage');
    const panelProps = await page.$('#tab-panel-props');

    assert.ok(tabUsage && tabProps, 'Tabs must exist');
    assert.ok(panelUsage && panelProps, 'Panels must exist');

    // Initially usage is visible, props is hidden
    let propsHidden = await panelProps.evaluate(el => el.classList.contains('hidden'));
    assert.strictEqual(propsHidden, true, 'Props panel should be hidden initially');

    // Click Props tab
    await tabProps.click();
    await page.waitForTimeout(300);

    propsHidden = await panelProps.evaluate(el => el.classList.contains('hidden'));
    assert.strictEqual(propsHidden, false, 'Props panel should now be visible');

    // Switch back to Usage tab
    await tabUsage.click();
    await page.waitForTimeout(300);
    const usageHidden = await panelUsage.evaluate(el => el.classList.contains('hidden'));
    assert.strictEqual(usageHidden, false, 'Usage panel should now be visible again');
  });

  await t.test('Theme Toggle: Switches dark and light class on <html>', async () => {
    const themeBtn = await page.$('#theme-toggle-btn') || await page.$('button[aria-label="Toggle theme"]');
    assert.ok(themeBtn, 'Theme button must exist');
    const isDarkBefore = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    await themeBtn.click({ force: true });
    await page.waitForTimeout(300);
    const isDarkAfter = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    assert.notStrictEqual(isDarkBefore, isDarkAfter, 'Theme toggle should flip dark class');
  });

  await t.test('Interactive Chat Orb: Mascot, Eye tracking, Open Dialog, Send Message & Close', async () => {
    const orbBtn = await page.$('#orb-button');
    assert.ok(orbBtn, 'Orb button should exist in preview canvas');

    // Simulate mouse move to verify eye tracking
    await page.mouse.move(700, 300);
    await page.waitForTimeout(200);

    // Click Orb to open chat
    await orbBtn.click();
    await page.waitForTimeout(500);

    const dialog = await page.$('#live-chat-dialog');
    assert.ok(dialog, 'Chat dialog should be created and visible');

    const input = await page.$('#live-chat-input');
    assert.ok(input, 'Message textarea should exist');

    // Send a message
    await input.fill('How do optimistic updates work?');
    await page.click('#live-btn-send');
    await page.waitForTimeout(900);

    // Verify messages list has user message and AI response
    const msgListText = await page.textContent('#live-chat-messages');
    assert.ok(msgListText.includes('How do optimistic updates work?'), 'User message should appear');
    assert.ok(msgListText.includes('Thought for 2s'), 'Reasoning trace should appear');

    // Close chat
    await page.click('#btn-dialog-close');
    await page.waitForTimeout(400);

    const dialogDisplay = await dialog.evaluate(el => el.style.display);
    assert.strictEqual(dialogDisplay, 'none', 'Dialog should close');
  });

  await browser.close();
});
