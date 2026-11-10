const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');

const output = path.resolve(process.argv[2] || path.join(__dirname, '../../validation_client_import_20261110'));
const expected = {
  ios: ['shadowrocket://add/sub://', 'surge:///install-config', 'stash://install-config'],
  android: ['clash://install-config', 'surfboard:///install-config', 'sing-box://import-remote-profile'],
  macos: ['clash://install-config', 'surge:///install-config', 'sing-box://import-remote-profile'],
  windows: ['clash://install-config', 'clash://install-config', 'sing-box://import-remote-profile']
};

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1510, height: 1016 } });
    const cdp = await page.context().newCDPSession(page);
    await cdp.send('Page.enable');
    const dialogs = [];
    const errors = [];
    const requests = [];
    page.on('dialog', dialog => { dialogs.push(dialog.message()); void dialog.dismiss(); });
    page.on('pageerror', error => errors.push(error.message));
    cdp.on('Page.frameRequestedNavigation', event => requests.push(event.url));
    const preview = pathToFileURL(path.resolve(__dirname, '../preview.html')).href;
    await page.goto(`${preview}?state=user&route=dashboard&hidepanel=1`);
    await page.waitForLoadState('networkidle');
    await page.locator('.quick-subscribe-card').waitFor({ state: 'visible' });
    await page.locator('[data-action="show-sub-qr"]').click();
    assert.equal(await page.locator('#global-dialog .quick-qr-code svg').count(), 1);
    assert.equal(await page.locator('#global-dialog img').count(), 0, 'QR generation uses no remote image service');
    await page.locator('#global-dialog [data-action="close-dialog"]').click();

    const cases = [];
    for (const [os, prefixes] of Object.entries(expected)) {
      await page.locator(`[data-action="set-quick-os"][data-os="${os}"]`).click();
      assert.equal(await page.locator('.quick-client-list a').count(), os === 'windows' ? 2 : 3);
      for (let index = 0; index < prefixes.length; index++) {
        const button = page.locator('[data-action="open-quick-client"]').nth(index);
        const label = await button.locator('span').innerText();
        const requestCount = requests.length;
        await button.click();
        // Leave enough time to catch the original 1.5 second false failure dialog.
        await page.waitForTimeout(1800);
        assert.equal(requests.length, requestCount + 1, `${os}: ${label} must request a native navigation`);
        const uri = requests.at(-1);
        assert.ok(uri.startsWith(prefixes[index]), `${os}: ${uri}`);
        const client = await button.getAttribute('data-client');
        const original = 'https://example.com/s/nebula-preview';
        const imported = client === 'shadowrocket'
          ? Buffer.from(uri.slice('shadowrocket://add/sub://'.length).split('?')[0], 'base64url').toString('utf8')
          : new URL(uri).searchParams.get('url');
        assert.equal(imported, original, `${os}/${client}: do not add a template flag`);
        assert.equal(await button.getAttribute('data-flag'), null);
        assert.equal(await button.locator('small').innerText(), '客户端自动识别');
        assert.equal(dialogs.length, 0, 'do not interrupt browser/client opening with a guessed failure');
        assert.equal(new URL(page.url()).protocol, 'file:', 'import does not replace the dashboard');
        assert.ok((await page.locator('.toast-stack').innerText()).includes('允许打开客户端'));
        cases.push({ os, client: label, uri, status: 'PASS' });
        console.log(`PASS ${os}: ${label}`);
      }
    }

    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(output, 'dashboard-desktop.png'), fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), 'mobile layout must not scroll horizontally');
    await page.screenshot({ path: path.join(output, 'dashboard-mobile.png'), fullPage: true });
    assert.deepEqual(errors, [], 'no uncaught page errors');
    fs.writeFileSync(path.join(output, 'browser-results.json'), JSON.stringify({
      cases, dialogs, errors,
      nativeClientLaunch: 'Not tested: this machine has no registered target clients. CDP verifies browser requests only.'
    }, null, 2));
    console.log('PASS desktop/mobile layout; no false dialogs or uncaught page errors');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
