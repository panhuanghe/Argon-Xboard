const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const output = path.resolve(process.argv[2] || path.join(root, '../validation_brand_20261111'));

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const results = [];
  try {
    for (const width of [320, 390, 1510]) {
      for (const theme of ['light', 'dark']) {
        const page = await browser.newPage({ viewport: { width, height: 1016 } });
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.addInitScript(({ theme }) => {
          localStorage.setItem('nebulax_debug', JSON.stringify({ config: { brandName: '枫叶云' }, colorMode: theme }));
        }, { theme });
        const preview = pathToFileURL(path.join(root, 'preview.html')).href;
        await page.goto(`${preview}?state=user&route=dashboard&hidepanel=1`);
        await page.waitForLoadState('networkidle');
        await page.locator('.quick-subscribe-card').waitFor({ state: 'visible' });
        const brand = page.locator(width < 800 ? '.mobile-brand > .brand' : '.sidebar > .brand');
        const emblem = brand.locator('.brand-mark--emblem .brand-symbol');
        await emblem.waitFor({ state: 'visible', timeout: 5000 });
        assert.equal(await emblem.count(), 1, 'default logo uses the supplied image');
        assert.ok(await emblem.evaluate(img => img.complete && img.naturalWidth > 0));
        assert.ok((await emblem.getAttribute('src')).endsWith('/brand-symbol.png'));
        assert.equal(await emblem.evaluate(img => img.naturalWidth), 108);
        assert.equal(await page.locator('.boot-line').count(), 0);
        assert.equal(await brand.locator('.brand-title strong').innerText(), '枫叶云');
        assert.equal(await brand.locator('.brand-wordmark small').innerText(), 'DASHBOARD');
        assert.equal(await emblem.evaluate(img => Math.round(img.getBoundingClientRect().width)), 38, 'keep the existing default logo footprint');
        const animation = await brand.locator('.brand-mark--emblem').evaluate(el => getComputedStyle(el, '::after').animationName);
        assert.equal(animation, 'brand-sweep');
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'no horizontal page overflow');
        const bounds = await brand.boundingBox();
        const title = await brand.locator('.brand-title').boundingBox();
        assert.ok(title.x + title.width <= bounds.x + bounds.width + 1, 'wordmark fits the available brand space');
        await page.screenshot({ path: path.join(output, `dashboard-${width}-${theme}.png`), fullPage: true });
        await page.screenshot({ path: path.join(output, `brand-${width}-${theme}.png`), clip: bounds, scale: 'css' });
        const effect = brand.locator('.brand-mark--emblem');
        const pause = await page.addStyleTag({ content: '.brand-mark--emblem::after { animation-delay: -1.5s; animation-play-state: paused; }' });
        await page.screenshot({ path: path.join(output, `brand-${width}-${theme}-shine.png`), clip: bounds });
        await pause.evaluate(el => el.remove());
        await page.emulateMedia({ reducedMotion: 'reduce' });
        assert.equal(await effect.evaluate(el => getComputedStyle(el, '::after').animationName), 'none');
        assert.deepEqual(errors, []);
        results.push({ width, theme, logoWidth: 38, reducedMotion: 'PASS', status: 'PASS' });
        console.log(`PASS ${width}px ${theme}: brand, logo, sweep and reduced motion`);
        await page.close();
      }
    }
    const custom = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const customLogo = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="108" height="108"><rect width="108" height="108" fill="#12aabb"/></svg>');
    await custom.addInitScript(({ customLogo }) => {
      localStorage.setItem('nebulax_debug', JSON.stringify({ config: { brandName: 'Custom brand with a longer name', logoUrl: customLogo } }));
    }, { customLogo });
    await custom.goto(`${pathToFileURL(path.join(root, 'preview.html')).href}?state=user&route=dashboard&hidepanel=1`);
    await custom.waitForLoadState('networkidle');
    await custom.locator('.quick-subscribe-card').waitFor({ state: 'visible' });
    assert.equal(await custom.locator('.mobile-brand .brand-logo').getAttribute('src'), customLogo);
    assert.equal(await custom.locator('.mobile-brand .brand-mark--emblem').count(), 0);
    assert.equal(await custom.locator('.mobile-brand .brand-logo').evaluate(el => Math.round(el.getBoundingClientRect().width)), 36);
    assert.ok(await custom.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await custom.close();
    const guest = await browser.newPage({ viewport: { width: 1510, height: 1016 }, reducedMotion: 'reduce' });
    await guest.addInitScript(() => localStorage.setItem('nebulax_debug', JSON.stringify({ config: { brandName: '枫叶云' } })));
    await guest.goto(`${pathToFileURL(path.join(root, 'preview.html')).href}?state=guest&route=login&hidepanel=1`);
    await guest.waitForLoadState('networkidle');
    assert.equal(await guest.locator('.auth-panel > .brand .brand-symbol').count(), 1);
    await guest.screenshot({ path: path.join(output, 'login-desktop.png'), fullPage: true });
    await guest.close();
    const startup = await browser.newPage({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
    await startup.goto(pathToFileURL(path.join(root, 'preview.html')).href);
    await startup.waitForLoadState('networkidle');
    assert.equal(await startup.locator('.boot-line').count(), 0, 'startup has no loading strip before application scripts run');
    assert.equal(await startup.locator('.boot-screen .brand-symbol').getAttribute('src'), './assets/brand-symbol.png');
    const favicon = startup.locator('link[rel="icon"][type="image/png"]');
    assert.equal(await favicon.getAttribute('href'), './assets/favicon-32.png');
    assert.equal(await startup.locator('link[rel="icon"][type="image/x-icon"]').getAttribute('href'), './favicon.ico');
    await startup.screenshot({ path: path.join(output, 'startup-without-loading-bar.png') });
    await startup.close();
    const blade = fs.readFileSync(path.join(root, 'dashboard.blade.php'), 'utf8');
    assert.ok(!blade.includes('boot-line'));
    assert.ok(blade.includes('/assets/favicon-32.png?v={{ $assetVersionIcon }}'));
    assert.ok(blade.includes('/favicon.ico?v={{ $assetVersionIcon }}'));
    fs.writeFileSync(path.join(output, 'browser-results.json'), JSON.stringify({ results, customLogo: 'PASS', longName: 'PASS', loginBrand: 'PASS', startupWithoutBar: 'PASS', faviconReferences: 'PASS' }, null, 2));
    console.log('PASS custom logo, long brand name, login brand, favicons and startup without loading bar');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
