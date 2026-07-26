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

const context = vm.createContext({ state: { user: null } });
vm.runInContext([
  extractFunction('ticketTimeValue'),
  extractFunction('parseIsMeFlag'),
  extractFunction('messageIsFromUser'),
  extractFunction('ticketLastSpeaker'),
  extractFunction('serverUnreadState'),
  extractFunction('hasTicketReply'),
  extractFunction('ticketReplyState'),
  'this.ticketReplyState = ticketReplyState;'
].join('\n'), context);

const { ticketReplyState } = context;

test('reply_status 0 stays waiting after ticket details are opened', () => {
  const listTicket = { id: 12, reply_status: 0 };
  const detailTicket = {
    id: 12,
    reply_status: 0,
    message: [{ id: 99, is_me: true, message: '用户补充信息' }]
  };
  const openedTicket = Object.assign({}, listTicket, {
    reply_status: detailTicket.reply_status ?? listTicket.reply_status,
    message: detailTicket.message
  });

  assert.equal(ticketReplyState(listTicket), 'waiting');
  assert.equal(ticketReplyState(openedTicket), 'waiting');
});

test('reply_status 1 is rendered as replied', () => {
  assert.equal(ticketReplyState({ id: 13, reply_status: 1 }), 'replied');
});
