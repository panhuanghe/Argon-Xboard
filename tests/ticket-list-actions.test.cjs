const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const themePath = path.join(__dirname, '..', 'assets', 'theme.js');
const themeSource = fs.readFileSync(themePath, 'utf8');

function extractFunction(name) {
  const marker = `  function ${name}(`;
  const start = themeSource.indexOf(marker);
  assert.notEqual(start, -1, `missing ${name} in assets/theme.js`);

  const bodyStart = themeSource.indexOf('{', start);
  let depth = 0;
  for (let index = bodyStart; index < themeSource.length; index += 1) {
    if (themeSource[index] === '{') depth += 1;
    if (themeSource[index] === '}') depth -= 1;
    if (depth === 0) return themeSource.slice(start + 2, index + 1);
  }

  throw new Error(`unterminated ${name} in assets/theme.js`);
}

const labels = {
  action: '操作',
  cancel: '取消',
  close_ticket: '关闭工单',
  ticket_close_confirm_hint: '关闭后将无法继续回复，确定要关闭这个工单吗？',
  ticket_close_confirm_title: '确认关闭工单',
  view_ticket: '查看'
};

const context = vm.createContext({
  e: value => String(value),
  icon: name => `<i>${name}</i>`,
  t: key => labels[key] || key,
  tx: key => labels[key] || key
});

vm.runInContext([
  extractFunction('ticketId'),
  extractFunction('isTicketClosed'),
  extractFunction('closedTicketCount'),
  extractFunction('ticketLastReplyTime'),
  extractFunction('renderTicketActions'),
  extractFunction('renderTicketCloseConfirm'),
  'this.closedTicketCount = closedTicketCount;',
  'this.ticketLastReplyTime = ticketLastReplyTime;',
  'this.renderTicketActions = renderTicketActions;',
  'this.renderTicketCloseConfirm = renderTicketCloseConfirm;'
].join('\n'), context);

const {
  closedTicketCount,
  ticketLastReplyTime,
  renderTicketActions,
  renderTicketCloseConfirm
} = context;

test('counts only closed tickets', () => {
  assert.equal(closedTicketCount([
    { status: 0 },
    { status: 1 },
    { status: '1' }
  ]), 2);
});

test('last reply time prefers updated_at and falls back to created_at', () => {
  assert.equal(ticketLastReplyTime({ updated_at: 200, created_at: 100 }), 200);
  assert.equal(ticketLastReplyTime({ created_at: 100 }), 100);
});

test('open tickets expose view and close actions', () => {
  const html = renderTicketActions({ id: 8, status: 0 });
  assert.match(html, /data-action="open-ticket"/);
  assert.match(html, /data-action="request-close-ticket"/);
  assert.doesNotMatch(html, /disabled/);
});

test('closed tickets disable the close action', () => {
  const html = renderTicketActions({ id: 9, status: 1 });
  assert.match(html, /data-action="open-ticket"/);
  assert.match(html, /disabled/);
  assert.doesNotMatch(html, /data-action="request-close-ticket"/);
});

test('close confirmation is a separate explicit action', () => {
  const html = renderTicketCloseConfirm('8');
  assert.match(html, /data-action="confirm-close-ticket"/);
  assert.match(html, /data-id="8"/);
});

test('ticket table wires closed statistics, last reply, actions and confirmation', () => {
  assert.match(themeSource, /data-ticket-stat="closed"/);
  assert.match(themeSource, /tx\('ticket_last_reply_time'\)/);
  assert.match(themeSource, /t\('action'\)/);
  assert.match(themeSource, /action === 'request-close-ticket'/);
  assert.match(themeSource, /action === 'confirm-close-ticket'/);
});
