<!doctype html>
<html lang="{{ $theme_config['default_i18n'] ?? 'zh-CN' }}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="{{ $theme_config['primary_color'] ?? '#5e72e4' }}">
  <meta name="description" content="{{ $description ?? '' }}">
  <title>{{ $title }}</title>
  @php($assetVersionIcon = @filemtime(public_path("/theme/{$theme}/favicon.ico")) ?: ($version ?? '1.2.38'))
  <link rel="icon" type="image/x-icon" sizes="16x16 32x32 48x48 64x64" href="/theme/{{ $theme }}/favicon.ico?v={{ $assetVersionIcon }}">
  <link rel="icon" type="image/png" sizes="32x32" href="/theme/{{ $theme }}/assets/favicon-32.png?v={{ $assetVersionIcon }}">
  @php($assetVersionCss = @filemtime(public_path("/theme/{$theme}/assets/theme.css")) ?: ($version ?? '1.2.38'))
  @php($assetVersionJs = @filemtime(public_path("/theme/{$theme}/assets/theme.js")) ?: ($version ?? '1.2.38'))
  <link rel="stylesheet" href="/theme/{{ $theme }}/assets/theme.css?v={{ $assetVersionCss }}">
</head>
<body>
  <div id="app" aria-live="polite">
    <div class="boot-screen">
      <div class="brand-mark brand-mark--large brand-mark--emblem" aria-hidden="true"><img class="brand-symbol" src="/theme/{{ $theme }}/assets/brand-symbol.png" alt=""></div>
      <p>正在连接控制中心…</p>
    </div>
  </div>

  <script>
    window.XBOARD_ASSETS = '/theme/{{ $theme }}/assets';
    window.XBOARD_THEME = {!! json_encode([
      'title' => $title,
      'description' => $description ?? '',
      'version' => $version ?? '',
      'logo' => $logo ?? '',
      'brandName' => $title ?? 'Xboard',
      'tagline' => $theme_config['tagline'] ?? '清晰、现代、稳定的连接体验',
      'lang' => $theme_config['default_i18n'] ?? 'zh-CN',
      'loginCaptchaEnabled' => isset($theme_config['login_captcha_enabled'])
        ? (string)$theme_config['login_captcha_enabled']
        : (isset($theme_config['auth_captcha_enabled']) ? (string)$theme_config['auth_captcha_enabled'] : '1'),
      'primaryColor' => $theme_config['primary_color'] ?? '#5e72e4',
      'logoUrl' => $theme_config['logo_url'] ?? '',
      'announcement' => $theme_config['announcement'] ?? '',
      'footerText' => $theme_config['footer_text'] ?? 'Powered by Argon-Xboard · Xboard'
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) !!};
  </script>
  <script defer src="/theme/{{ $theme }}/assets/qrcode.js?v={{ $assetVersionJs }}"></script>
  <script defer src="/theme/{{ $theme }}/assets/theme.js?v={{ $assetVersionJs }}"></script>
  {!! $theme_config['custom_html'] ?? '' !!}
</body>
</html>
