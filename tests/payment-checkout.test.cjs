const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../assets/theme.js'), 'utf8');
const apiSource = source.slice(source.indexOf('  async function api('), source.indexOf('  function mockApi('));
const checkoutSource = source.slice(source.indexOf('  async function checkout('), source.indexOf('  async function handleAuth('));

function load(response, { ok = true, status = 200 } = {}) {
  const calls = [];
  const notices = [];
  const routes = [];
  const opens = [];
  const qr = [];
  const button = { disabled: false, textContent: '确认支付' };
  const form = { dataset: { trade: '2026111018115237296526574' }, querySelector: () => button };
  const dialog = { open: true, closed: false, close() { this.closed = true; this.open = false; } };
  const location = { hash: '#/plans', href: '' };
  const context = vm.createContext({
    isPreview: false, state: { auth: 'Bearer checkout-test', renderId: 1 },
    FormData: class { get(name) { return null; } },
    fetch: async (url, options) => {
      calls.push({ url, ...options });
      return { ok, status, json: async () => response };
    },
    location, document: { getElementById: id => id === 'payment-form' ? form : dialog },
    window: { open: (...args) => opens.push(args) },
    t: key => key, tx: key => key,
    toast: (...args) => notices.push(args), go: route => routes.push(route),
    openPaymentQr: (...args) => qr.push(args),
    safeHttpUrl: value => { try { const url = new URL(value); return /^https?:$/.test(url.protocol) ? url.href : ''; } catch { return ''; } },
    URL,
    clearAuth() { context.state.auth = ''; }
  });
  vm.runInContext(apiSource + checkoutSource, context);
  return { context, form, button, dialog, location, calls, notices, routes, opens, qr };
}

test('balance checkout keeps the real Xboard response envelope and leaves the payment screen', async () => {
  const app = load({ type: -1, data: true });
  await app.context.checkout(app.form);
  assert.equal(app.calls.length, 1, 'do not submit balance payment twice');
  assert.equal(app.calls[0].url, '/api/v1/user/order/checkout');
  assert.deepEqual(JSON.parse(app.calls[0].body), { trade_no: app.form.dataset.trade, method: 0 });
  assert.equal(app.dialog.closed, true, 'close the payment dialog after backend success');
  assert.deepEqual(app.routes, ['dashboard']);
  assert.equal(app.notices[0][0], 'plan_activated');
  assert.deepEqual(app.opens, []);
});

test('normal APIs still unwrap their data', async () => {
  const app = load({ data: [{ id: 1, name: 'payment' }] });
  const result = await app.context.api('/user/order/getPaymentMethod');
  assert.equal(result[0].name, 'payment');
});

test('checkout can explicitly retain response type without changing other endpoints', async () => {
  const app = load({ type: -1, data: true });
  const result = await app.context.api('/user/order/checkout', { rawResponse: true });
  assert.equal(result.type, -1);
  assert.equal(result.data, true);
});

test('online checkout still redirects to the returned payment URL', async () => {
  const app = load({ type: 1, data: 'https://payment.example/checkout' });
  await app.context.checkout(app.form);
  assert.equal(app.location.href, 'https://payment.example/checkout');
  assert.deepEqual(app.routes, []);
  assert.equal(app.dialog.closed, false);
});

test('failed checkout keeps the dialog open and allows retry without a success claim', async () => {
  const app = load({ message: '余额不足' }, { ok: false, status: 400 });
  await app.context.checkout(app.form);
  assert.equal(app.dialog.closed, false);
  assert.deepEqual(app.routes, []);
  assert.equal(app.button.disabled, false);
  assert.equal(app.notices[0][0], '余额不足');
  assert.equal(app.notices[0][1], 'error');
});

test('type 0 renders payment QR content instead of navigating to it', async () => {
  const app = load({ type: 0, data: 'https://qr.alipay.com/test-checkout' });
  await app.context.checkout(app.form);
  assert.equal(app.location.href, '');
  assert.deepEqual(app.qr, [[app.form.dataset.trade, 'https://qr.alipay.com/test-checkout']]);
  assert.deepEqual(app.opens, []);
});

test('an unsuccessful type -1 response never claims payment succeeded', async () => {
  const app = load({ type: -1, data: false });
  await app.context.checkout(app.form);
  assert.deepEqual(app.routes, []);
  assert.equal(app.dialog.closed, false);
  assert.equal(app.button.disabled, false);
  assert.equal(app.notices[0][1], 'error');
});

test('repeated submits cannot create concurrent checkout requests', async () => {
  const app = load({ type: -1, data: true });
  await Promise.all([app.context.checkout(app.form), app.context.checkout(app.form)]);
  assert.equal(app.calls.length, 1);
});

test('API errors preserve HTTP status for retry decisions', async () => {
  const app = load({ message: 'gateway unavailable' }, { ok: false, status: 502 });
  await assert.rejects(() => app.context.api('/user/order/check'), error => error.status === 502);
});

test('slow checkout responses cannot reopen an old QR after navigation or dismissal', async () => {
  for (const change of ['navigation', 'dismissal', 'logout']) {
    const app = load({ type: 0, data: 'https://qr.alipay.com/old-payment' });
    let resolve;
    app.context.fetch = () => new Promise(done => { resolve = done; });
    const pending = app.context.checkout(app.form);
    if (change === 'navigation') app.context.state.renderId++;
    if (change === 'dismissal') app.dialog.close();
    if (change === 'logout') app.context.state.auth = '';
    resolve({ ok: true, status: 200, json: async () => ({ type: 0, data: 'https://qr.alipay.com/old-payment' }) });
    await pending;
    assert.deepEqual(app.qr, []);
    assert.deepEqual(app.routes, []);
    assert.deepEqual(app.notices, []);
  }
});

test('stale checkout errors do not alter the new page or reopen payment', async () => {
  const app = load({});
  let reject;
  app.context.fetch = () => new Promise((resolve, fail) => { reject = fail; });
  const pending = app.context.checkout(app.form);
  app.context.state.renderId++;
  reject(new Error('old checkout unavailable'));
  await pending;
  assert.deepEqual(app.notices, []);
  assert.deepEqual(app.qr, []);
});
