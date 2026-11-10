const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../assets/theme.js'), 'utf8');
const functions = source.slice(source.indexOf('  function normalizeTemplateFlag('), source.indexOf('  function icon('));
const subscribeUrl = 'https://example.com/subscribe?token=test%2Btoken&flag=old#profile';

function load(os = 'windows', url = subscribeUrl) {
  const timers = new Map();
  const navigation = [];
  const prompts = [];
  const downloads = [];
  const notices = [];
  const document = new EventTarget();
  document.hidden = false;
  document.visibilityState = 'visible';
  const window = new EventTarget();
  window.location = { set href(value) { navigation.push(value); } };
  window.confirm = message => { prompts.push(message); return false; };
  window.open = (...args) => downloads.push(args);
  let timerId = 0;
  const context = vm.createContext({
    URL, document, window,
    config: { brandName: '枫叶云 & Test' },
    state: { subscribe: { subscribe_url: url }, quickSubscribeOS: os },
    setTimeout: (callback, delay) => { timers.set(++timerId, { callback, delay }); return timerId; },
    clearTimeout: id => timers.delete(id),
    btoa: value => Buffer.from(value, 'binary').toString('base64'),
    safeHttpUrl: value => { try { const u = new URL(value); return /^https?:$/.test(u.protocol) ? u.href : ''; } catch { return ''; } },
    e: value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char])),
    icon: () => '',
    t: key => key,
    toast: (...args) => notices.push(args)
  });
  vm.runInContext(functions, context);
  return {
    context, navigation, prompts, downloads, notices,
    tick() {
      for (const [id, timer] of [...timers].sort((a, b) => a[1].delay - b[1].delay)) {
        if (timers.delete(id)) timer.callback();
      }
    }
  };
}

const clients = {
  ios: [['shadowrocket', 'shadowrocket', 'shadowrocket://add/sub://'], ['surge', 'surge', 'surge:///install-config'], ['stash', 'stash', 'stash://install-config']],
  android: [['clash-meta', 'clash-meta', 'clash://install-config'], ['surfboard', 'surfboard', 'surfboard:///install-config'], ['sing-box', 'sing-box', 'sing-box://import-remote-profile']],
  macos: [['clash-verge', 'clash-meta', 'clash-verge://install-config'], ['surge', 'surge', 'surgeconfig:///install-config'], ['sing-box', 'sing-box', 'sing-box://import-remote-profile']],
  windows: [['clash-verge', 'clash-meta', 'clash-verge://install-config'], ['clash', 'clash', 'clash://install-config'], ['sing-box', 'sing-box', 'sing-box://import-remote-profile']]
};

for (const [os, expected] of Object.entries(clients)) {
  for (const [index, [client, flag, prefix]] of expected.entries()) {
    test(`${os}: ${client} targets the right app and preserves the template URL`, () => {
      const { context } = load(os);
      const item = context.quickClientItemsByOS(os)[index];
      assert.equal(item.client, client);
      assert.equal(item.flag, flag);
      const template = context.buildTemplateSubscribeUrl(subscribeUrl, item.flag);
      const importUrl = context.buildQuickImportUrl(item.client, template);
      assert.ok(importUrl.startsWith(prefix), importUrl);
      const parsed = new URL(importUrl);
      const profileName = client === 'sing-box'
        ? decodeURIComponent(parsed.hash.slice(1))
        : parsed.searchParams.get(client === 'shadowrocket' ? 'remark' : 'name');
      assert.equal(profileName, '枫叶云 & Test');
      const importedUrl = client === 'shadowrocket'
        ? Buffer.from(importUrl.slice('shadowrocket://add/sub://'.length).split('?')[0], 'base64').toString('utf8')
        : parsed.searchParams.get('url');
      assert.equal(importedUrl, template);
      assert.equal(new URL(importedUrl).searchParams.get('flag'), flag);
      assert.equal(new URL(importedUrl).searchParams.get('token'), 'test+token');
    });

    test(`${os}: ${client} requests launch synchronously without a false installation prompt`, async () => {
      const app = load(os);
      const item = app.context.quickClientItemsByOS(os)[index];
      const pending = app.context.openQuickClientImport(item.client, item.flag);
      assert.equal(app.navigation.length, 1, 'keep the browser click user activation');
      app.tick();
      await pending;
      assert.deepEqual(app.prompts, [], 'a visible page cannot prove the client is missing');
      assert.deepEqual(app.downloads, [], 'download only after an explicit user click');
      assert.ok(app.notices.some(args => args[0].includes('浏览器')), 'explain the browser opening prompt');
    });
  }

  test(`${os}: downloads remain explicit and separate from import buttons`, () => {
    const { context } = load(os);
    const html = context.renderQuickSubscribeModule({ subscribe_url: subscribeUrl });
    assert.equal((html.match(/data-action="open-quick-client"/g) || []).length, 3);
    assert.equal((html.match(/>下载客户端<\/a>/g) || []).length, os === 'windows' ? 2 : 3);
    for (const item of context.quickClientItemsByOS(os)) {
      const download = context.getQuickClientDownloadLink(item.client, os);
      if (item.client === 'clash') {
        assert.equal(download, '', 'do not link to the removed CFW repository');
        continue;
      }
      assert.equal(new URL(download).protocol, 'https:');
      assert.ok(html.includes(`href="${download}"`));
    }
  });
}

test('invalid subscription URLs do not launch a client', async () => {
  for (const url of ['', 'javascript:alert(1)', 'file:///private/config']) {
    const app = load('windows', url);
    await app.context.openQuickClientImport('clash-verge', 'clash-meta');
    assert.deepEqual(app.navigation, []);
    assert.deepEqual(app.downloads, []);
    assert.equal(app.notices[0][0], 'no_subscribe_url');
  }
});

test('Surfboard download uses the official website', () => {
  assert.equal(load('android').context.getQuickClientDownloadLink('surfboard', 'android'), 'https://getsurfboard.com/');
});

test('Shadowrocket subscription payload uses URL safe base64, as in the bundled theme', () => {
  const { context } = load('ios');
  const url = 'https://example.com/?x=???';
  const uri = context.buildQuickImportUrl('shadowrocket', url);
  const payload = uri.slice('shadowrocket://add/sub://'.length).split('?')[0];
  assert.ok(!/[+/=]/.test(payload));
  assert.equal(Buffer.from(payload, 'base64url').toString('utf8'), url);
});
