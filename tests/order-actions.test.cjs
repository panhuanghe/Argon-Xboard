const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../assets/theme.js'), 'utf8');
const actionStart = source.indexOf('  function setOrderActionBusy(');
const actions = source.slice(actionStart >= 0 ? actionStart : source.indexOf('  async function openOrderPayment('), source.indexOf('  function openPaymentQr('));
const checkout = source.slice(source.indexOf('  async function checkout('), source.indexOf('  async function handleAuth('));

function load() {
  const calls = [];
  const buttons = ['pay-order', 'cancel-order'].map(action => ({ disabled: false, dataset: { trade: 'same-order', action } }));
  let finish;
  const gate = new Promise(resolve => { finish = resolve; });
  const submit = { disabled: false };
  const form = { dataset: { trade: 'same-order' }, querySelector: () => submit };
  const dialog = { open: true, close() { this.open = false; } };
  const context = vm.createContext({
    orderActionsInFlight: new Set(), state: { renderId: 1, auth: 'Bearer test' },
    document: {
      querySelectorAll: () => buttons,
      getElementById: id => id === 'payment-form' ? form : dialog
    },
    api: async (...args) => { calls.push(args); return gate; },
    renderPayments: () => {}, render: () => {}, toast: () => {}, tx: key => key, t: key => key,
    go: () => {}, FormData: class { get() { return null; } }
  });
  vm.runInContext(actions + checkout, context);
  return { context, buttons, calls, finish, form };
}

test('an unfinished cancellation blocks payment setup for the same order', async () => {
  const app = load();
  const pending = app.context.cancelOrder(app.buttons[1]);
  assert.ok(app.buttons.every(button => button.disabled));
  await app.context.openOrderPayment('same-order');
  assert.equal(app.calls.length, 1);
  assert.equal(app.calls[0][0], '/user/order/cancel');
  app.finish(true);
  await pending;
  assert.ok(app.buttons.every(button => !button.disabled));
});

test('payment setup blocks cancellation while loading the order and methods', async () => {
  const app = load();
  const pending = app.context.openOrderPayment('same-order');
  assert.ok(app.buttons.every(button => button.disabled));
  await app.context.cancelOrder(app.buttons[1]);
  assert.equal(app.calls.length, 1);
  assert.ok(app.calls[0][0].startsWith('/user/order/detail'));
  app.finish({ status: 0, total_amount: 0 });
  await pending;
  assert.ok(app.buttons.every(button => !button.disabled));
});

test('checkout remains exclusive even after the payment dialog is closed', async () => {
  const app = load();
  const pending = app.context.checkout(app.form);
  assert.ok(app.buttons.every(button => button.disabled));
  app.context.document.getElementById('global-dialog').close();
  await app.context.cancelOrder(app.buttons[1]);
  assert.equal(app.calls.length, 1);
  assert.equal(app.calls[0][0], '/user/order/checkout');
  app.finish({ type: 0, data: 'https://qr.example/test' });
  await pending;
  assert.ok(app.buttons.every(button => !button.disabled));
});
