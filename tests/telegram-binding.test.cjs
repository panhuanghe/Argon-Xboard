const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const projectRoot = path.join(__dirname, '..');
const themeSource = fs.readFileSync(path.join(projectRoot, 'assets', 'theme.js'), 'utf8');
const themeCssSource = fs.readFileSync(path.join(projectRoot, 'assets', 'theme.css'), 'utf8');

function extractFunction(name) {
  const marker = `  function ${name}(`;
  const start = themeSource.indexOf(marker);
  if (start === -1) {
    const fallback = name === 'isTelegramBindingEnabled' ? 'false' : "''";
    return `function ${name}() { return ${fallback}; }`;
  }

  const bodyStart = themeSource.indexOf('{', themeSource.indexOf(')', start));
  let depth = 0;
  for (let index = bodyStart; index < themeSource.length; index += 1) {
    if (themeSource[index] === '{') depth += 1;
    if (themeSource[index] === '}') depth -= 1;
    if (depth === 0) return themeSource.slice(start + 2, index + 1);
  }

  throw new Error(`unterminated ${name} in assets/theme.js`);
}

const context = vm.createContext({
  e: value => String(value),
  icon: name => `<i>${name}</i>`,
  safeHttpUrl: value => /^https?:\/\//i.test(String(value || '')) ? String(value) : '',
  t: key => key,
  tx: key => ({
    telegram_title: '绑定 Telegram',
    telegram_start: '立即开始',
    telegram_bound: '已绑定'
  }[key] || key)
});

vm.runInContext([
  extractFunction('isToggleEnabled'),
  extractFunction('isTelegramBindingEnabled'),
  extractFunction('telegramBotUrl'),
  extractFunction('telegramBindCommand'),
  extractFunction('renderTelegramBindingRow'),
  extractFunction('renderTelegramBindDialog'),
  'this.isTelegramBindingEnabled = isTelegramBindingEnabled;',
  'this.telegramBotUrl = telegramBotUrl;',
  'this.telegramBindCommand = telegramBindCommand;',
  'this.renderTelegramBindingRow = renderTelegramBindingRow;',
  'this.renderTelegramBindDialog = renderTelegramBindDialog;'
].join('\n'), context);

const {
  isTelegramBindingEnabled,
  telegramBotUrl,
  telegramBindCommand,
  renderTelegramBindingRow,
  renderTelegramBindDialog
} = context;

test('Telegram binding follows the backend switch and fails closed', () => {
  assert.equal(isTelegramBindingEnabled({ is_telegram: 1 }), true);
  assert.equal(isTelegramBindingEnabled({ is_telegram: '0' }), false);
  assert.equal(isTelegramBindingEnabled({}), false);
  assert.equal(isTelegramBindingEnabled(null), false);
});

test('Telegram helper builds safe bot links and bind commands', () => {
  assert.equal(telegramBotUrl('argon_bot'), 'https://t.me/argon_bot');
  assert.equal(telegramBotUrl('argon bot'), '');
  assert.equal(telegramBindCommand('https://example.com/s/preview'), '/bind https://example.com/s/preview');
  assert.equal(telegramBindCommand(''), '');
});

test('Telegram row shows binding action only when enabled and not already bound', () => {
  const unbound = renderTelegramBindingRow({ telegram_id: null });
  assert.match(unbound, /data-action="bind-telegram"/);
  assert.match(unbound, /立即开始/);

  const bound = renderTelegramBindingRow({ telegram_id: 12345 });
  assert.match(bound, /已绑定/);
  assert.match(bound, /disabled/);
});

test('Telegram binding dialog shows the bot and subscription command', () => {
  const html = renderTelegramBindDialog(
    { username: 'argon_bot' },
    { subscribe_url: 'https://example.com/s/preview' }
  );
  assert.match(html, /https:\/\/t\.me\/argon_bot/);
  assert.match(html, /\/bind https:\/\/example\.com\/s\/preview/);
  assert.match(html, /data-action="copy-telegram-command"/);
});

test('account page loads the user-scoped Telegram switch and removes the duplicate theme row', () => {
  assert.match(themeSource, /api\('\/user\/comm\/config'\)/);
  assert.match(themeSource, /isTelegramBindingEnabled\(state\.appConfig\)/);
  assert.match(themeSource, /data-action="bind-telegram"/);
  assert.match(themeSource, /api\('\/user\/telegram\/getBotInfo'\)/);
  assert.match(themeSource, /action === 'copy-telegram-command'/);
  assert.doesNotMatch(themeSource, /<div class="info-item"><span>\$\{t\('ui_theme'\)\}<\/span>/);
  assert.ok((themeSource.match(/data-action="theme"/g) || []).length >= 2, 'topbar theme controls must remain available');
});

test('Telegram binding dialog styles are present', () => {
  assert.match(themeCssSource, /\.telegram-bind-command\s*\{/);
  assert.match(themeCssSource, /\.telegram-bind-step\s*\{/);
});
