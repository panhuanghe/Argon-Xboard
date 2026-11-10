const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../assets/theme.js'), 'utf8');
const labels = source.slice(source.indexOf('  function orderStatusLabel('), source.indexOf('  const app ='));

test('order status labels match cedar2025 Xboard, including discounted orders', () => {
  const context = vm.createContext({ t: key => key, tx: key => key });
  vm.runInContext(labels, context);
  assert.equal(context.orderStatusLabel(2)[0], 'status_cancelled');
  assert.equal(context.orderStatusLabel(3)[0], 'status_completed');
  assert.equal(context.orderStatusLabel(4)[0], 'status_discounted');
});

test('paid statistics exclude cancelled orders and include the balance used', async () => {
  const stats = [];
  const context = vm.createContext({
    t: key => key, tx: key => key, e: String, periodLabel: String, date: String,
    money: value => String(value), icon: () => '', shell: html => html,
    pageHead: () => '', empty: () => '', renderError: error => { throw error; },
    app: { innerHTML: '' }, state: { renderId: 1 },
    statCard: (...args) => { stats.push(args); return ''; },
    api: async () => [
      { trade_no: 'cancelled', status: 2, total_amount: 999999 },
      { trade_no: 'balance', status: 3, total_amount: 0, balance_amount: 50000 },
      { trade_no: 'discounted', status: 4, total_amount: 1000, handling_amount: 100 }
    ]
  });
  vm.runInContext(labels + source.slice(source.indexOf('  async function renderOrders('), source.indexOf('  function docsHeader(')), context);
  await context.renderOrders(1);
  assert.equal(stats.find(args => args[0] === 'wallet')[1], '51100');
  assert.equal(stats.find(args => args[0] === 'chart')[1], 1);
});

function loadStatusPoll(responses) {
  const timers = new Map();
  const notices = [];
  let calls = 0;
  let renders = 0;
  let timerId = 0;
  const context = vm.createContext({
    state: { renderId: 1, auth: 'Bearer order-poll-test' }, orderStatusTimer: 0,
    setTimeout: (callback, delay) => { timers.set(++timerId, { callback, delay }); return timerId; },
    clearTimeout: id => timers.delete(id),
    toast: (...args) => notices.push(args), tx: key => key,
    render: () => renders++,
    api: async () => {
      const result = responses[Math.min(calls++, responses.length - 1)];
      if (result instanceof Error) throw result;
      return result;
    }
  });
  vm.runInContext(source.slice(source.indexOf('  function checkOrderStatus('), source.indexOf('  async function renderOrderDetail(')), context);
  return {
    context, timers, notices, calls: () => calls, renders: () => renders,
    async tick() {
      const [id, timer] = timers.entries().next().value;
      timers.delete(id);
      await timer.callback();
    }
  };
}

test('order polling recovers from a temporary server failure and then observes completion', async () => {
  const error = Object.assign(new Error('temporary gateway failure'), { status: 502 });
  const app = loadStatusPoll([error, 3]);
  app.context.checkOrderStatus('trade', 0, 1);
  await app.tick();
  assert.equal(app.timers.size, 1, 'a temporary failure must schedule a retry');
  await app.tick();
  assert.equal(app.calls(), 2);
  assert.equal(app.renders(), 1, 'refresh when the backend confirms the new state');
  assert.equal(app.timers.size, 0);
  assert.deepEqual(app.notices, []);
});

test('order polling retries are bounded and leave an actionable error after repeated failure', async () => {
  const app = loadStatusPoll([Object.assign(new Error('gateway unavailable'), { status: 503 })]);
  app.context.checkOrderStatus('trade', 0, 1);
  for (let count = 0; count < 5 && app.timers.size; count++) await app.tick();
  assert.equal(app.calls(), 4, 'at most three retries');
  assert.equal(app.timers.size, 0);
  assert.equal(app.notices.length, 1);
  assert.equal(app.renders(), 0);
});

test('order polling does not retry authorization or invalid status responses', async () => {
  for (const response of [Object.assign(new Error('forbidden'), { status: 403 }), 99]) {
    const app = loadStatusPoll([response]);
    app.context.checkOrderStatus('trade', 0, 1);
    await app.tick();
    assert.equal(app.timers.size, 0);
    assert.equal(app.notices.length, 1);
  }
});

test('order polling retry stops after navigation or logout', async () => {
  const app = loadStatusPoll([Object.assign(new Error('network unavailable'), { status: 502 })]);
  app.context.checkOrderStatus('trade', 0, 1);
  await app.tick();
  assert.equal(app.timers.size, 1);
  app.context.state.renderId = 2;
  app.context.state.auth = '';
  await app.tick();
  assert.equal(app.calls(), 1);
  assert.equal(app.timers.size, 0);
});
