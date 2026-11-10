# v1.2.33 一键订阅修复记录

历史检查记录：v1.2.33 本地修复与验证。相关修改统一纳入 v1.2.35 发布，安装使用 `Argon-Xboard-1.2.35.zip`；此发布不自动更新线上站点。

## 原因与修改

1. 所有客户端共用 1.5 秒页面可见性探测。浏览器等待外部应用确认或页面保持可见时，原代码会错误弹出“未检测到客户端”。删除该判断，点击时同步发出协议导航，保留浏览器操作所需的用户点击上下文。
2. macOS/Windows Clash Verge 原来与 Android Clash Meta 共用 `clash://`。改用 Verge 官方注册的专属 `clash-verge://`，避免被其他 Clash 协议处理程序接管。订阅模板依旧是 `clash-meta`。
3. Surge iOS 使用 `surge:///install-config`；macOS 使用官方保留兼容性的 `surgeconfig:///install-config`。
4. Sing-box 配置名称应使用 URL fragment，原来的 `name` 查询参数不会被官方解析器用于配置名称。
5. 下载改为客户端下方的明确链接；导入时只显示请求状态和浏览器允许打开的提示。CFW 原下载仓库返回 404，移除失效下载入口，保留导入按钮；Surfboard 原第三方下载页返回 403，改用官网。

## 验证

- `node --test tests/quick-subscribe.test.cjs`：30/30 通过。覆盖四个平台的 12 个入口、立即导航、订阅模板参数和 token 保留、中文名称编码、无订阅/非法链接、无自动下载确认、下载入口修正。
- `node --check assets/theme.js`、浏览器检查脚本语法、`git diff --check`：通过。
- `node tests/quick-subscribe.browser.cjs`：Chromium 中点击完整预览页面的 12 个入口，通过 CDP 验证对应协议导航请求。每次等待超过原来的 1.5 秒，均无原生确认弹窗和未捕获页面错误。
- 桌面 1510×1016、手机 390×844 截图检查；手机页面无横向溢出。
- 安装包使用 `Argon-Xboard/` 根目录，排除 tests 和 Git 文件；ZIP CRC 与全部源文件内容比较通过。

浏览器验证使用演示订阅，不会修改真实订阅。当前机器未注册目标客户端协议，尚未实测客户端进程打开、真实订阅获取和客户端内部导入。不得将协议导航请求通过表述为所有平台实机导入已通过。

## 参考

以下官方资料和源文件于 2026-11-10 核对，未修改未验证的客户端协议：

- Clash Verge Rev：`https://github.com/clash-verge-rev/clash-verge-rev/blob/main/src-tauri/tauri.conf.json`，注册 `clash` 和 `clash-verge`。
- Clash Meta for Android：`https://github.com/MetaCubeX/ClashMetaForAndroid/blob/main/app/src/main/AndroidManifest.xml`，注册 `clash`/`clashmeta` 的 `install-config`。
- Surge：`https://manual.nssurge.com/tools/url-scheme.html`。
- Stash：`https://stash.wiki/faq/url-schema`，`stash://install-config?url=`。
- Sing-box Android：`https://github.com/SagerNet/sing-box-for-android/blob/dev/app/src/main/AndroidManifest.xml`。
- Sing-box Apple：`https://github.com/SagerNet/sing-box-for-apple/blob/main/SFM/Info.plist`。
- Sing-box Desktop：`https://github.com/SagerNet/sing-box-for-desktop/blob/main/src/main/index.ts`，注册 `sing-box`，解析 `import-remote-profile` 和 fragment 名称。
- Sing-box libbox：`experimental/libbox/remote_profile.go`，`GenerateRemoteProfileImportLink`/`ParseRemoteProfileImportLink` 使用 fragment 配置名称。

## 更新与实机检查

在 Xboard 后台上传 `Argon-Xboard-1.2.35.zip`，启用 Argon-Xboard，再刷新页面。点击各平台已安装的客户端，允许浏览器打开外部应用，确认软件打开、订阅模板正确、中文配置名称正确。浏览器权限被拒绝或客户端未注册 URI 协议时，可使用复制订阅地址和下载链接。
