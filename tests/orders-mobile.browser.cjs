const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const output = path.resolve(process.argv[2] || path.join(root, '../validation_orders_mobile_20261110'));
const orders = [
  { trade_no: '20261110123456789012345678901234', status: 0, total_amount: 29900, period: 'year_price', created_at: 1794268800, plan: { name: '1000G包年套餐与多设备订阅' } },
  { trade_no: '20261109123456789012345678901234', status: 3, total_amount: 2600, period: 'month_price', created_at: 1794182400, plan: { name: '星云畅享' } }
];

async function swipe(page, wrapper, direction) {
  const rect = await wrapper.boundingBox();
  const x = rect.x + rect.width * (direction === 'left' ? 0.85 : 0.15);
  const y = rect.y + 24;
  const session = await page.context().newCDPSession(page);
  try {
    await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
    for (let step = 1; step <= 12; step++) {
      await session.send('Input.dispatchTouchEvent', {
        type: 'touchMove',
        touchPoints: [{ x: x + (direction === 'left' ? -1 : 1) * step * 16, y }]
      });
      await page.waitForTimeout(20);
    }
    await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await page.waitForTimeout(300);
  } finally {
    await session.detach();
  }
}

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const results = [];
  try {
    for (const width of [320, 390, 430, 768, 1510]) {
      const mobile = width < 800;
      const page = await browser.newPage({ viewport: { width, height: 900 }, isMobile: mobile, hasTouch: mobile });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      // Use the production API/render path with isolated response fixtures, without writing real orders.
      await page.route('http://argon.test/**', async route => {
        const pathname = new URL(route.request().url()).pathname;
        if (pathname === '/') {
          return route.fulfill({ contentType: 'text/html', body: `<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="/assets/theme.css"></head><body><div id="app"></div><script>localStorage.setItem('nebulax_auth_data','Bearer orders-layout-test');</script><script src="/assets/theme.js"></script></body></html>` });
        }
        if (pathname === '/assets/theme.js' || pathname === '/assets/theme.css') {
          return route.fulfill({ path: path.join(root, pathname.slice(1)), contentType: pathname.endsWith('.css') ? 'text/css' : 'text/javascript' });
        }
        const data = pathname === '/api/v1/user/order/fetch' ? orders
          : pathname === '/api/v1/user/ticket/fetch' ? [] : {};
        assert.equal(route.request().method(), 'GET', 'layout checks never mutate orders');
        return route.fulfill({ json: { data } });
      });
      await page.goto('http://argon.test/#/orders');
      await page.waitForLoadState('networkidle');
      const wrapper = page.locator('.table-wrap');
      await wrapper.waitFor({ state: 'visible' });
      const measurements = await wrapper.evaluate(w => ({
        viewport: innerWidth,
        main: w.closest('.main').getBoundingClientRect().width,
        client: w.clientWidth,
        scroll: w.scrollWidth
      }));
      assert.ok(measurements.main <= width + 1, `main content must fit ${width}px: ${JSON.stringify(measurements)}`);
      assert.equal(await page.locator('.table thead th').count(), 6);
      assert.equal(await page.locator('.table tbody tr').count(), 2);
      assert.ok((await page.locator('.table').innerText()).includes(orders[0].trade_no));
      assert.equal(await page.locator('.table td').first().evaluate(td => getComputedStyle(td).whiteSpace), 'nowrap', 'keep order numbers and values readable');
      await wrapper.evaluate(w => w.scrollIntoView({ block: 'center' }));
      if (mobile && measurements.scroll > measurements.client) {
        assert.ok(measurements.scroll > measurements.client, 'wide order columns must scroll inside the module');
        await page.screenshot({ path: path.join(output, `orders-${width}-left.png`), fullPage: true });
        await swipe(page, wrapper, 'left');
        assert.ok(await wrapper.evaluate(w => w.scrollLeft > 0), 'left swipe must reveal later columns');
        await wrapper.evaluate(w => { w.scrollLeft = w.scrollWidth; });
        const end = await wrapper.evaluate(w => w.scrollLeft);
        const bounds = await wrapper.boundingBox();
        const action = await page.locator('[data-action="cancel-order"]').boundingBox();
        assert.ok(action.x >= bounds.x && action.x + action.width <= bounds.x + bounds.width + 1, 'last operation column must be fully reachable');
        await page.screenshot({ path: path.join(output, `orders-${width}-right.png`), fullPage: true });
        await swipe(page, wrapper, 'right');
        assert.ok(await wrapper.evaluate(w => w.scrollLeft) < end, 'right swipe must return toward the first columns');
      } else {
        await page.screenshot({ path: path.join(output, `orders-${width}.png`), fullPage: true });
      }
      assert.deepEqual(errors, []);
      results.push({ width, ...measurements, status: 'PASS' });
      console.log(`PASS ${width}px: content fits, all six columns reachable${mobile && measurements.scroll > measurements.client ? ', touch scrolls both ways' : ''}`);
      await page.close();
    }
    fs.writeFileSync(path.join(output, 'browser-results.json'), JSON.stringify({ results, apiMode: 'production fetch/render with isolated fixtures', deviceMode: 'Chromium touch emulation; physical phones not tested' }, null, 2));
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
