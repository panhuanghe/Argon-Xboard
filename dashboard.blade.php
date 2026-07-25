<!doctype html>
<html lang="{{ $theme_config['default_i18n'] ?? 'zh-CN' }}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="{{ $theme_config['primary_color'] ?? '#5e72e4' }}">
  <meta name="description" content="{{ $description ?? '' }}">
  <title>{{ $title }}</title>
  @if (file_exists(public_path("/theme/{$theme}/favicon.ico")))
    <link rel="icon" href="/theme/{{ $theme }}/favicon.ico">
  @endif
  @php($assetVersionCss = @filemtime(public_path("/theme/{$theme}/assets/theme.css")) ?: ($version ?? '1.2.20'))
  @php($assetVersionJs = @filemtime(public_path("/theme/{$theme}/assets/theme.js")) ?: ($version ?? '1.2.20'))
  <link rel="stylesheet" href="/theme/{{ $theme }}/assets/theme.css?v={{ $assetVersionCss }}">
</head>
<body>
  <div id="app" aria-live="polite">
    <div class="boot-screen">
      <div class="brand-mark brand-mark--large"><span></span><span></span></div>
      <div class="boot-line"><i></i></div>
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
      'supportUrl' => $theme_config['support_url'] ?? '',
      'footerText' => $theme_config['footer_text'] ?? 'Powered by Argon-Xboard · Xboard'
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) !!};
  </script>
  <script defer src="/theme/{{ $theme }}/assets/theme.js?v={{ $assetVersionJs }}"></script>
  {!! $theme_config['custom_html'] ?? '' !!}
</body>
</html>
