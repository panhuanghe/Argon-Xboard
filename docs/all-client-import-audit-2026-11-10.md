# v1.2.37 全客户端导入格式检查

用户报告 Clash for Windows 入口格式仍不正确，要求检查其他客户端。此前 v1.2.36 只修正 Clash Verge 的原始链接传递，其他入口仍通过 buildTemplateSubscribeUrl 添加或替换 flag，因此与用户实测可用的原生主题不一致。

## 参考与修改

参考 cedar2025/Xboard 提交 `d826a3b32f73bde24acce2a3ab033c6538ce121d` 的 `theme/Xboard/assets/umi.js`，重新在线读取固定文件并确认与本地快照一致。执行原生主题实际导入 registry 的独立计算函数，生成 `tests/fixtures/xboard-native-import-links.json`。参考测试数据全部为 example.com 和虚构 token，不包含用户订阅链接。

原生主题所有入口都传递后台给出的 subscribe_url，不加模板 flag。后端 ClientController::getClientInfo 在请求没有 flag 时使用客户端 User-Agent 选择输出协议。

最终所有入口直接传递后台原始订阅链接，不添加、替换或移除原链接自带的查询参数。保留安装权限提示，不恢复短时可见性安装探测。删除仅用于导入地址改写的 normalizeTemplateFlag/templateLabel/buildTemplateSubscribeUrl，不创建新的模板开关。

| 入口 | 协议格式 | 订阅地址 |
| --- | --- | --- |
| Clash for Windows / Clash Meta / Clash Verge | `clash://install-config?url=ENCODED_URL&name=ENCODED_NAME` | 原始链接，百分号编码 |
| Surge iOS/macOS | `surge:///install-config?url=ENCODED_URL&name=ENCODED_NAME` | 原始链接，百分号编码 |
| Stash | `stash://install-config?url=ENCODED_URL&name=ENCODED_NAME` | 原始链接，百分号编码 |
| Surfboard | `surfboard:///install-config?url=ENCODED_URL&name=ENCODED_NAME` | 原始链接，百分号编码 |
| Sing-box | `sing-box://import-remote-profile?url=ENCODED_URL#ENCODED_NAME` | 原始链接，名称用 fragment |
| Shadowrocket | `shadowrocket://add/sub://BASE64URL?remark=ENCODED_NAME` | 原始链接，URL safe Base64 |

macOS Surge 不再采用与原生主题不同的 surgeconfig 协议，改为原生的 surge 协议。Surge 官方 `https://manual.nssurge.com/tools/url-scheme.html` 同时说明当前 macOS 支持 surge，surgeconfig 保留兼容用途。

## 验证

- 修改前新的原始链接回归检查在 10 个入口失败；修复后所有入口通过。
- 59 项 Node 检查通过。12 个入口与官方 registry 生成的链接逐字比较，每个入口覆盖 3 种链接，合计 36 个组合。
- 测试保留路径 token、编码 token、既有 flag、其他查询参数及 fragment；中文品牌名称正确编码，Shadowrocket 数据完整还原。
- 浏览器实际点击全部 12 个按钮，验证协议导航发出的原始订阅 URL、无 data-flag 改写、显示自动识别；二维码和桌面/手机布局检查通过。
- JavaScript 语法、diff 空白、安装包 ZIP 完整性、版本和全部源文件内容比较通过。

## 交付状态

v1.2.37 包含此次全客户端检查修复，以及已发布 v1.2.36 的取消支付功能。源码、测试和原生参考链接一并提交。发布页面：`https://github.com/panhuanghe/Argon-Xboard/releases/tag/v1.2.37`；附件为 `Argon-Xboard-1.2.37.zip` 和 SHA-256 校验文件。此发布不自动更新线上主题。

参考链接和浏览器导航通过不能代替真实客户端的配置下载、解析和入库。本次没有安装其他客户端、获取用户真实订阅或运行真实迁移/支付；用户更新主题后需要在对应设备上复测。
