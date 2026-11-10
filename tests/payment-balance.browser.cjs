const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const output = path.resolve(process.argv[2] || path.join(root, '../validation_orders_mobile_20261110'));
const trade = '2026111018115237296526574';
const plan = { id: 1, name: '余额支付验证套餐', transfer_enable: 1000, month_price: 50000, year_price: 100000, show: true, sell: true };

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const results = [];
  try {
    for (const scenario of ['balance-success', 'balance-error']) {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
      const calls = [];
      const errors = [];
      let paid = false;
      page.on('pageerror', error => errors.push(error.message));
      await page.route('http://argon.test/**', async route => {
        const request = route.request();
        const pathname = new URL(request.url()).pathname;
        if (pathname === '/') {
          return route.fulfill({ contentType: 'text/html', body: `<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="/assets/theme.css"></head><body><div id="app"></div><script>localStorage.setItem('nebulax_auth_data','Bearer balance-checkout-test');</script><script src="/assets/qrcode.js"></script><script src="/assets/theme.js"></script></body></html>` });
        }
        if (pathname === '/assets/theme.js' || pathname === '/assets/theme.css' || pathname === '/assets/qrcode.js') {
          return route.fulfill({ path: path.join(root, pathname.slice(1)), contentType: pathname.endsWith('.css') ? 'text/css' : 'text/javascript' });
        }
        calls.push({ path: pathname, method: request.method(), body: request.postDataJSON() });
        if (pathname === '/api/v1/user/order/checkout') {
          assert.deepEqual(request.postDataJSON(), { trade_no: trade, method: 0 });
          if (scenario === 'balance-error') return route.fulfill({ status: 400, json: { message: '余额不足，请重新选择支付方式' } });
          paid = true;
          // The exact real Xboard balance/free checkout envelope, unlike the demo adapter.
          return route.fulfill({ json: { type: -1, data: true } });
        }
        const data = pathname === '/api/v1/user/plan/fetch' ? [plan]
          : pathname === '/api/v1/user/order/save' ? trade
          : pathname === '/api/v1/user/order/detail' ? { trade_no: trade, plan, status: paid ? 3 : 0, total_amount: 0, balance_amount: 50000, period: 'month_price' }
          : pathname === '/api/v1/user/order/check' ? paid ? 3 : 0
          : pathname === '/api/v1/user/order/getPaymentMethod' || pathname === '/api/v1/user/ticket/fetch' ? []
          : pathname === '/api/v1/user/info' ? { email: 'balance-test@example.com', balance: paid ? 10000 : 60000 }
          : pathname === '/api/v1/user/getSubscribe' ? { plan, subscribe_url: 'https://example.com/test-subscription', transfer_enable: 1073741824000, u: 0, d: 0, expired_at: 1825804800 }
          : {};
        return route.fulfill({ json: { data } });
      });
      await page.goto('http://argon.test/#/plans');
      await page.waitForLoadState('networkidle');
      await page.locator('[data-action="purchase"]').click();
      await page.locator('#purchase-form [type="submit"]').click();
      await page.locator('[data-action="pay-order"]').click();
      await page.locator('#payment-form').waitFor({ state: 'visible' });
      const paymentText = await page.locator('#payment-form').innerText();
      assert.ok(paymentText.includes('余额抵扣: ¥500'), paymentText);
      await page.locator('#payment-form [type="submit"]').click();
      if (scenario === 'balance-success') {
        await page.waitForURL('**/#/dashboard');
        await page.waitForLoadState('networkidle');
        assert.equal(await page.locator('#global-dialog').evaluate(dialog => dialog.open), false);
        assert.ok((await page.locator('.content').innerText()).includes(plan.name));
        assert.ok((await page.locator('.toast-stack').innerText()).includes('套餐已成功开通'));
        assert.ok(calls.some(call => call.path === '/api/v1/user/info'));
        assert.ok(calls.some(call => call.path === '/api/v1/user/getSubscribe'));
      } else {
        await page.locator('.toast.error').waitFor({ state: 'visible' });
        assert.equal(new URL(page.url()).hash, `#/order/${trade}`);
        assert.equal(await page.locator('#global-dialog').evaluate(dialog => dialog.open), true);
        assert.equal(await page.locator('#payment-form [type="submit"]').isEnabled(), true);
        assert.ok(!(await page.locator('.toast-stack').innerText()).includes('套餐已成功开通'));
      }
      assert.equal(calls.filter(call => call.path === '/api/v1/user/order/checkout').length, 1);
      assert.deepEqual(errors, []);
      await page.screenshot({ path: path.join(output, `${scenario}.png`), fullPage: true });
      results.push({ scenario, checkoutRequests: 1, dashboardRefreshed: scenario === 'balance-success', status: 'PASS' });
      console.log(`PASS ${scenario}: ${scenario === 'balance-success' ? 'dialog closes, dashboard refreshes balance and subscription' : 'error stays visible, payment can retry, no false success'}`);
      await page.close();
    }
    fs.writeFileSync(path.join(output, 'payment-results.json'), JSON.stringify({ results, mode: 'production frontend with isolated Xboard API fixtures; no live balance deducted' }, null, 2));
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
