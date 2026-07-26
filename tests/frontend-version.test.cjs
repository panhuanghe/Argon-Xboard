const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const projectRoot = path.join(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(projectRoot, 'config.json'), 'utf8'));
const themeSource = fs.readFileSync(path.join(projectRoot, 'assets', 'theme.js'), 'utf8');

test('account page displays the theme version instead of the Xboard backend version', () => {
  const configuredVersion = themeSource.match(/frontendVersion:\s*'([^']+)'/);
  assert.ok(configuredVersion, 'theme.js must define an independent frontendVersion');
  assert.equal(configuredVersion[1], manifest.version);

  const versionRow = themeSource.match(/<div class="info-item"><span>\$\{t\('frontend_version'\)\}<\/span><b>[^\n]+/);
  assert.ok(versionRow, 'theme.js must render the frontend version row');
  assert.match(versionRow[0], /config\.frontendVersion/);
  assert.doesNotMatch(versionRow[0], /config\.version/);
});
