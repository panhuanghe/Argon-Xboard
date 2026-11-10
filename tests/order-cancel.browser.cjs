const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const output = path.resolve(root, '../validation_cancel_payment_20261110');
const trade = '2026111022114871376283429';

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const results = [];
  try {
    for (const width of [390, 1510]) {
      for (const scenario of ['success', 'failure', 'processing', 'cancelled', 'completed', 'discounted', 'slow-cancel', 'slow-payment-setup']) {
        let status = { processing: 1, cancelled: 2, completed: 3, discounted: 4 }[scenario] || 0;
        let balance = 0;
        let requests = 0;
        let checks = 0;
        const errors = [];
        const page = await browser.newPage({ viewport: { width, height: 900 }, isMobile: width < 800, hasTouch: width < 800 });
        page.on('pageerror', error => errors.push(error.message));
        await page.route('http://argon.test/**', async route => {
          const request = route.request();
          const pathname = new URL(request.url()).pathname;
          if (pathname === '/') return route.fulfill({ contentType: 'text/html', body: '<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/assets/theme.css"></head><body><div id="app"></div><script>localStorage.setItem("nebulax_auth_data","Bearer cancel-payment-test");</script><script src="/assets/qrcode.js"></script><script src="/assets/theme.js"></script></body></html>' });
          if (pathname.startsWith('/assets/')) return route.fulfill({ path: path.join(root, pathname.slice(1)) });
          if (pathname === '/api/v1/user/order/cancel') {
            requests++;
            assert.equal(request.method(), 'POST');
            assert.deepEqual(request.postDataJSON(), { trade_no: trade });
            if (scenario === 'slow-cancel') await new Promise(resolve => setTimeout(resolve, 600));
            if (scenario === 'failure') return route.fulfill({ status: 400, json: { message: '订单已支付，无法取消' } });
            status = 2;
            balance = 100000; // Simulate the backend refund in an isolated fixture.
            return route.fulfill({ json: { data: true } });
          }
          if (pathname === '/api/v1/user/order/check') checks++;
          assert.equal(request.method(), 'GET', 'no checkout or other order writes during cancellation test');
          if (pathname === '/api/v1/user/order/getPaymentMethod' && scenario === 'slow-payment-setup') await new Promise(resolve => setTimeout(resolve, 600));
          const data = pathname === '/api/v1/user/order/detail' ? { trade_no: trade, status, plan: { id: 1, name: '1000G包年套餐' }, total_amount: scenario === 'slow-payment-setup' ? 100000 : 0, balance_amount: 100000, period: 'year_price' }
            : pathname === '/api/v1/user/order/getPaymentMethod' ? [{ id: 1, name: '测试支付' }]
            : pathname === '/api/v1/user/order/check' ? status
            : pathname === '/api/v1/user/info' ? { email: 'cancel-test@example.com', balance }
            : pathname === '/api/v1/user/ticket/fetch' ? [] : {};
          return route.fulfill({ json: { data } });
        });
        await page.goto(`http://argon.test/#/order/${trade}`);
        await page.locator('[data-order-detail]').waitFor();
        const cancel = page.locator('[data-order-detail] [data-action="cancel-order"]');
        if (scenario === 'success' || scenario === 'failure' || scenario === 'slow-cancel') {
          assert.equal(await cancel.innerText(), '取消支付');
          assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'order actions fit mobile viewport');
          if (scenario === 'success') await page.screenshot({ path: path.join(output, `pending-${width}.png`), fullPage: true });
          await cancel.click();
          if (scenario === 'slow-cancel') assert.equal(await page.locator('[data-action="pay-order"]').isDisabled(), true, 'cancel request disables sibling payment action');
          if (scenario === 'success' || scenario === 'slow-cancel') {
            await page.waitForFunction(() => document.querySelector('[data-order-detail] .status')?.textContent.includes('已取消'));
            assert.equal(await cancel.count(), 0);
            assert.equal(await page.locator('[data-action="pay-order"]').count(), 0);
            const previousChecks = checks;
            await page.waitForTimeout(1700);
            assert.equal(checks, previousChecks, 'cancelled order stops status polling');
            await page.screenshot({ path: path.join(output, `cancelled-${width}.png`), fullPage: true });
            await page.locator('[data-order-detail] a[href="#/dashboard"]').click();
            await page.waitForFunction(() => document.querySelector('.content')?.textContent.includes('¥1000'));
          } else {
            await page.locator('.toast.error').waitFor();
            assert.ok((await page.locator('.toast.error').innerText()).includes('订单已支付，无法取消'));
            assert.ok(!(await page.locator('.toast-stack').innerText()).includes('订单已取消'));
            assert.equal(await cancel.isEnabled(), true);
            assert.equal(await page.locator('[data-order-detail] .status').innerText(), '待支付');
          }
          assert.equal(requests, 1);
        } else if (scenario === 'slow-payment-setup') {
          await page.locator('[data-action="pay-order"]').click();
          assert.equal(await cancel.isDisabled(), true, 'payment setup disables sibling cancellation');
          await page.locator('#payment-form').waitFor();
          await page.locator('#payment-form [data-action="close-dialog"]').click();
          assert.equal(await cancel.isEnabled(), true);
          assert.equal(requests, 0);
        } else {
          assert.equal(await cancel.count(), 0, 'only pending orders offer cancellation');
          assert.equal(requests, 0);
        }
        assert.deepEqual(errors, []);
        results.push({ width, scenario, cancellationRequests: requests, status: 'PASS' });
        console.log(`PASS ${width}px: ${scenario}`);
        await page.close();
      }
    }
    fs.writeFileSync(path.join(output, 'browser-results.json'), JSON.stringify({ results, mode: 'production frontend with isolated API fixtures; no live cancellation or refund' }, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
