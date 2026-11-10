const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../assets/theme.js'), 'utf8');
const functions = source.slice(source.indexOf('  function encodeBase64Utf8('), source.indexOf('  function icon('));
const subscribeUrl = 'https://example.com/subscribe?token=test%2Btoken&flag=old#profile';
const nativeFixtures = require('./fixtures/xboard-native-import-links.json');

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
  ios: [['shadowrocket', 'Shadowrocket', 'shadowrocket://add/sub://'], ['surge', 'Surge', 'surge:///install-config'], ['stash', 'Stash', 'stash://install-config']],
  android: [['clash-meta', 'Clash Meta', 'clash://install-config'], ['surfboard', 'Surfboard', 'surfboard:///install-config'], ['sing-box', 'SingBox', 'sing-box://import-remote-profile']],
  macos: [['clash-verge', 'Clash Meta', 'clash://install-config'], ['surge', 'Surge', 'surge:///install-config'], ['sing-box', 'SingBox', 'sing-box://import-remote-profile']],
  windows: [['clash-verge', 'Clash', 'clash://install-config'], ['clash', 'Clash', 'clash://install-config'], ['sing-box', 'SingBox', 'sing-box://import-remote-profile']]
};

for (const [os, expected] of Object.entries(clients)) {
  for (const [index, [client, nativeName, prefix]] of expected.entries()) {
    test(`${os}: ${client} matches native import format and preserves the backend URL`, () => {
      const app = load(os);
      const item = app.context.quickClientItemsByOS(os)[index];
      assert.equal(item.client, client);
      app.context.openQuickClientImport(item.client);
      const importUrl = app.navigation[0];
      assert.ok(importUrl.startsWith(prefix), importUrl);
      const parsed = new URL(importUrl);
      const profileName = client === 'sing-box'
        ? decodeURIComponent(parsed.hash.slice(1))
        : parsed.searchParams.get(client === 'shadowrocket' ? 'remark' : 'name');
      assert.equal(profileName, '枫叶云 & Test');
      const importedUrl = client === 'shadowrocket'
        ? Buffer.from(importUrl.slice('shadowrocket://add/sub://'.length).split('?')[0], 'base64').toString('utf8')
        : parsed.searchParams.get('url');
      assert.equal(importedUrl, subscribeUrl);
      assert.equal(new URL(importedUrl).searchParams.get('flag'), 'old');
      assert.equal(new URL(importedUrl).searchParams.get('token'), 'test+token');
    });

    test(`${os}: ${client} requests launch synchronously without a false installation prompt`, async () => {
      const app = load(os);
      const item = app.context.quickClientItemsByOS(os)[index];
      const pending = app.context.openQuickClientImport(item.client);
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

test('all 12 entry points match links generated by the pinned native Xboard registry', () => {
  for (const sample of nativeFixtures.cases) {
    for (const [os, expected] of Object.entries(clients)) {
      for (const [index, [client, nativeName]] of expected.entries()) {
        const app = load(os, sample.subscribeUrl);
        const item = app.context.quickClientItemsByOS(os)[index];
        app.context.openQuickClientImport(item.client);
        assert.equal(app.navigation[0], sample.links[nativeName], `${os}/${client}: preserve the original subscription and native URI`);
      }
    }
  }
});

test('invalid subscription URLs do not launch a client', async () => {
  for (const url of ['', 'javascript:alert(1)', 'file:///private/config']) {
    const app = load('windows', url);
    await app.context.openQuickClientImport('clash-verge');
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

for (const os of ['windows', 'macos']) {
  test(`${os}: Clash Verge import matches the bundled Xboard theme exactly`, () => {
    // cedar2025/Xboard d826a3b... theme/Xboard/assets/umi.js:
    // o = encodeURIComponent(subscribe_url), n = encodeURIComponent(title)
    // url: `clash://install-config?url=${o}&name=${n}`
    for (const url of ['https://example.com/s/test-token', subscribeUrl]) {
      const app = load(os, url);
      const item = app.context.quickClientItemsByOS(os)[0];
      app.context.openQuickClientImport(item.client);
      const expected = `clash://install-config?url=${encodeURIComponent(url)}&name=${encodeURIComponent('枫叶云 & Test')}`;
      assert.equal(app.navigation[0], expected);
      assert.equal(new URL(app.navigation[0]).searchParams.get('url'), url, 'pass through the backend link without adding or replacing a format flag');
    }
  });
}
