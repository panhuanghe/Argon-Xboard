const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../assets/theme.js'), 'utf8');
const functions = source.slice(source.indexOf('  function encodeBase64Utf8('), source.indexOf('  function icon('));

// Clash Verge Rev v2.5.10: scheme.rs extracts the raw suffix after url=;
// prfitem.rs fix_dirty_url moves &name= from the path to the query when needed.
// The bundled Xboard theme deliberately produces this accepted name parameter.
function revReceivedUrl(uri) {
  const rawQuery = new URL(uri).search.slice(1);
  let candidate = rawQuery.slice(rawQuery.indexOf('url=') + 4).trim();
  for (let count = 0; count <= 2; count++) {
    try {
      const parsed = new URL(candidate);
      if (!parsed.search && parsed.pathname.includes('&')) {
        const split = parsed.pathname.indexOf('&');
        const parameters = parsed.pathname.slice(split + 1);
        parsed.pathname = parsed.pathname.slice(0, split);
        for (const [key, value] of new URLSearchParams(parameters)) parsed.searchParams.append(key, value);
      }
      return parsed;
    } catch (_) {
      if (count === 2) throw new Error('invalid subscription URL');
      candidate = decodeURIComponent(candidate);
    }
  }
}

test('Clash Verge follows the working native Xboard link and accepts its name parameter', async () => {
  const requests = [];
  const brand = '枫叶云';
  const yaml = 'proxies:\n  - name: contract-node\n    type: ss\n    server: example.com\n    port: 443\n    cipher: aes-128-gcm\n    password: test\n';
  const server = http.createServer((request, response) => {
    const url = new URL(request.url, 'http://127.0.0.1');
    const valid = url.pathname === '/s/test-token' && !url.searchParams.has('flag')
      && url.searchParams.get('name') === brand
      && (!url.searchParams.has('token') || url.searchParams.get('token') === 'test+token');
    requests.push({ path: url.pathname, status: valid ? 200 : 400 });
    response.writeHead(valid ? 200 : 400, { 'Content-Type': 'application/yaml' });
    response.end(valid ? yaml : 'invalid subscription parameters');
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  try {
    const base = `http://127.0.0.1:${server.address().port}/s/test-token`;
    for (const os of ['windows', 'macos']) {
      for (const subscribeUrl of [base, base + '?token=test%2Btoken']) {
        const navigation = [];
        const context = vm.createContext({
          URL, config: { brandName: brand },
          state: { quickSubscribeOS: os, subscribe: { subscribe_url: subscribeUrl } },
          safeHttpUrl: value => new URL(value).href,
          window: { location: { set href(value) { navigation.push(value); } } },
          toast: () => {}, t: key => key
        });
        vm.runInContext(functions, context);
        const item = context.quickClientItemsByOS(os)[0];
        context.openQuickClientImport(item.client);
        assert.equal(navigation.length, 1);
        const uri = navigation[0];
        const nativeUri = `clash://install-config?url=${encodeURIComponent(subscribeUrl)}&name=${encodeURIComponent(brand)}`;
        assert.equal(uri, nativeUri, 'match the actual bundled native theme expression');
        const received = revReceivedUrl(uri);
        assert.equal(received.pathname, '/s/test-token');
        assert.equal(received.searchParams.get('name'), brand);
        assert.equal(received.searchParams.get('flag'), null);
        const response = await fetch(received);
        assert.equal(response.status, 200);
        assert.equal(await response.text(), yaml);
      }
    }
    assert.equal(requests.length, 4);
    assert.ok(requests.every(request => request.status === 200));
  } finally {
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
});
