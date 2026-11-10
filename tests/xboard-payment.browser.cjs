const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');
const output = path.resolve(root, '../validation_xboard_audit_20261110');
const trade = '202611101234567890';
const plan = { id: 1, name: 'Xboard接口验证套餐', month_price: 50000, transfer_enable: 1000, show: true, sell: true };

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const results = [];
  try {
    for (const scenario of ['cancelled', 'completed', 'discounted', 'qr', 'methods-error', 'methods-none', 'qr-retry', 'qr-dismissed']) {
      let status = scenario === 'cancelled' ? 2 : scenario === 'completed' ? 3 : scenario === 'discounted' ? 4 : 0;
      let checkoutCount = 0;
      let checks = 0;
      const requests = [];
      const errors = [];
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
      page.on('pageerror', e => errors.push(e.message));
      await page.route('**/*', async route => {
        const request = route.request();
        const url = new URL(request.url());
        requests.push(url.href);
        assert.equal(url.origin, 'http://argon.test', 'QR generation must stay local');
        if (url.pathname === '/') return route.fulfill({ contentType: 'text/html', body: '<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/assets/theme.css"></head><body><div id="app"></div><script>localStorage.setItem("nebulax_auth_data","Bearer isolated-test");</script><script src="/assets/qrcode.js"></script><script src="/assets/theme.js"></script></body></html>' });
        if (url.pathname.startsWith('/assets/')) return route.fulfill({ path: path.join(root, url.pathname.slice(1)) });
        if (url.pathname === '/api/v1/user/order/checkout') {
          checkoutCount++;
          assert.deepEqual(request.postDataJSON(), { trade_no: trade, method: '1' });
          if (scenario === 'qr-dismissed') await new Promise(resolve => setTimeout(resolve, 700));
          return route.fulfill({ json: { type: 0, data: 'https://qr.alipay.com/isolated-payment' } });
        }
        if (url.pathname === '/api/v1/user/order/getPaymentMethod' && scenario === 'methods-error') return route.fulfill({ status: 503, json: { message: '支付方式接口暂不可用' } });
        if (url.pathname === '/api/v1/user/order/check') {
          checks++;
          if (scenario === 'qr-retry' && checks === 1) return route.fulfill({ status: 502, json: { message: '临时网关错误' } });
          if (checkoutCount) status = 3;
        }
        const data = url.pathname === '/api/v1/user/order/detail' ? { trade_no: trade, status, plan, total_amount: 50000, balance_amount: 0, period: 'month_price', created_at: 1794268800 }
          : url.pathname === '/api/v1/user/order/check' ? status
          : url.pathname === '/api/v1/user/order/getPaymentMethod' ? scenario === 'methods-none' ? [] : [{ id: 1, name: '支付宝当面付', payment: 'AlipayF2F' }]
          : url.pathname === '/api/v1/user/info' ? { email: 'test@example.com', balance: 0 }
          : url.pathname === '/api/v1/user/ticket/fetch' ? [] : {};
        return route.fulfill({ json: { data } });
      });
      await page.goto(`http://argon.test/#/order/${trade}`);
      await page.locator('[data-order-detail]').waitFor({ state: 'visible', timeout: 5000 });
      const text = await page.locator('[data-order-detail]').innerText();
      assert.ok(text.includes(trade));
      if (scenario === 'cancelled') {
        assert.ok(text.includes('已取消'));
        assert.equal(await page.locator('[data-action="pay-order"]').count(), 0);
      } else if (scenario === 'completed' || scenario === 'discounted') {
        assert.ok(text.includes(scenario === 'completed' ? '已完成' : '已折抵'));
      } else {
        await page.locator('[data-action="pay-order"]').click();
        if (scenario === 'methods-error') {
          await page.locator('.toast.error').waitFor();
          assert.equal(await page.locator('#payment-form').count(), 0, 'API failure cannot pretend there are no payment methods');
        } else if (scenario === 'methods-none') {
          await page.locator('#payment-form').waitFor();
          assert.equal(await page.locator('#payment-form [type="submit"]').isDisabled(), true);
          assert.equal(checkoutCount, 0, 'positive unpaid amount needs an actual payment method');
        } else {
          await page.locator('#payment-form [type="submit"]').click();
          if (scenario === 'qr-dismissed') {
            await page.locator('#payment-form [data-action="close-dialog"]').click();
            await page.evaluate(() => { location.hash = '#/dashboard'; });
            await page.waitForURL('**/#/dashboard');
            await page.waitForTimeout(1000);
            assert.equal(await page.locator('#global-dialog').evaluate(d => d.open), false);
            assert.equal(await page.locator('#global-dialog .quick-qr-code svg').count(), 0, 'stale checkout cannot open a QR on the new page');
            assert.equal(checkoutCount, 1);
            assert.equal(checks, 0, 'old order polling stops after navigation');
            assert.deepEqual(errors, []);
            results.push({ scenario, status: 'PASS', checkoutCount, checks, externalRequests: 0 });
            console.log(`PASS ${scenario}: delayed checkout stays dismissed after navigation`);
            await page.close();
            continue;
          }
          await page.locator('#global-dialog .quick-qr-code svg').waitFor();
          await page.screenshot({ path: path.join(output, 'payment-qr.png') });
          assert.equal(new URL(page.url()).hash, `#/order/${trade}`);
          assert.equal(await page.locator('#payment-form').count(), 0, 'prevent duplicate checkout while QR waits');
          await page.waitForFunction(() => document.querySelector('[data-order-detail]')?.innerText.includes('已完成'), null, { timeout: 10000 });
          assert.equal(await page.locator('#global-dialog').evaluate(d => d.open), false);
          assert.equal(checkoutCount, 1);
          assert.ok(checks > 0);
          if (scenario === 'qr-retry') assert.equal(checks, 2, 'temporary error must retry and observe completion');
        }
      }
      await page.screenshot({ path: path.join(output, `${scenario}.png`), fullPage: true });
      assert.deepEqual(errors, []);
      results.push({ scenario, status: 'PASS', checkoutCount, checks, externalRequests: 0 });
      console.log(`PASS ${scenario}: official order route/status/payment contract`);
      await page.close();
    }
    fs.writeFileSync(path.join(output, 'payment-results.json'), JSON.stringify(results, null, 2));
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
