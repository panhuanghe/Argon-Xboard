const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../assets/theme.js'), 'utf8');
const cancellation = source.slice(source.indexOf('  function setOrderActionBusy('), source.indexOf('  function openPaymentQr('));

function load(result = true) {
  const calls = [];
  const notices = [];
  let renders = 0;
  const button = { disabled: false, dataset: { trade: 'order-cancellation-test' } };
  const context = vm.createContext({
    orderActionsInFlight: new Set(), document: { querySelectorAll: () => [button] },
    state: { auth: 'Bearer cancellation-test', renderId: 1 },
    tx: key => key, t: key => key,
    toast: (...args) => notices.push(args),
    render: () => renders++,
    api: async (...args) => {
      calls.push(args);
      if (result instanceof Error) throw result;
      return result;
    }
  });
  vm.runInContext(cancellation, context);
  return { context, button, calls, notices, renders: () => renders };
}

test('cancel payment sends the existing backend cancellation request and then refreshes', async () => {
  const app = load();
  assert.equal(typeof app.context.cancelOrder, 'function');
  await app.context.cancelOrder(app.button);
  assert.equal(app.calls.length, 1);
  assert.equal(app.calls[0][0], '/user/order/cancel');
  assert.equal(app.calls[0][1].method, 'POST');
  assert.equal(app.calls[0][1].body.trade_no, app.button.dataset.trade);
  assert.equal(app.notices[0][0], 'order_cancelled');
  assert.equal(app.renders(), 1);
});

test('cancel payment allows only one in-flight request per button', async () => {
  const app = load();
  await Promise.all([app.context.cancelOrder(app.button), app.context.cancelOrder(app.button)]);
  assert.equal(app.calls.length, 1);
});

test('rejected or unsuccessful cancellations cannot show cancelled and leave retry enabled', async () => {
  for (const response of [false, new Error('Only pending orders can be cancelled')]) {
    const app = load(response);
    await app.context.cancelOrder(app.button);
    assert.equal(app.renders(), 0);
    assert.equal(app.notices[0][1], 'error');
    assert.ok(!app.notices.some(notice => notice[0] === 'order_cancelled'));
    assert.equal(app.button.disabled, false);
  }
});

test('delayed cancellation does not replace a page opened meanwhile', async () => {
  const app = load();
  let finish;
  app.context.api = () => new Promise(resolve => { finish = resolve; });
  const pending = app.context.cancelOrder(app.button);
  app.context.state.renderId++;
  finish(true);
  await pending;
  assert.equal(app.renders(), 0);
  assert.deepEqual(app.notices, []);
});
