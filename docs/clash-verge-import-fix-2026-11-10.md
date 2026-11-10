# Clash Verge v2.5.10 与 Xboard 原生主题对齐

检查日期：2026-11-10。用户报告 Argon-Xboard 能唤起客户端却不导入，确认客户端版本 v2.5.10，并提供原生主题成功导入后的订阅地址截图。截图中的订阅 token 不写入代码、测试、日志或此记录。

## 依据和结论修正

此前仅依据客户端对 `url=` 后缀的截取规则，将尾部 `name` 视为失败原因，证据不足。原生主题同样将 `name` 放在后面，用户实测能导入。

重新完整核对客户端 `scheme.rs` 与 `prfitem.rs`：先提取并解码订阅 URL；若地址没有查询但路径包含 `&name=...`，`fix_dirty_url` 会把这一部分移入查询。这解释了截图中成功存下的 `/s/{token}?name=...`。`name` 是原生流程可接受的参数，不能据此判定订阅链接错误。此前测试服务器刻意拒绝 name，无法代表真实 Xboard，现已修正。

原生主题源码 `cedar2025/Xboard` 提交 `d826a3b32f73bde24acce2a3ab033c6538ce121d` 的 `theme/Xboard/assets/umi.js`：

```javascript
const o = encodeURIComponent(subscribe_url);
const n = encodeURIComponent(title);
const url = `clash://install-config?url=${o}&name=${n}`;
```

原生入口不额外添加模板 flag。此前主题与原生的确定差异是使用独立 clash-verge 协议，并额外追加 flag=clash-meta；不能在未验证实机请求前断言哪一个差异是最终失败原因。

## 最终修改

- Clash Verge 入口采用相同的 `clash://install-config?url=...&name=...`。
- 传递后台原始订阅链接，不添加或替换 flag 参数；原链接本身若已有参数则保持。
- 在按钮下显示“客户端自动识别”，替换与实际行为不符的强制模板说明。
- 保留取消误报安装检测的既有修复，其他客户端入口维持已验证的模板规则。
- 取消上一份未发布 v1.2.36 中仅调整参数顺序的方案，以此次原生格式对齐包为准。

## 来源

- 原生主题：`https://github.com/cedar2025/Xboard/blob/d826a3b32f73bde24acce2a3ab033c6538ce121d/theme/Xboard/assets/umi.js`。
- 客户端解析：`https://github.com/clash-verge-rev/clash-verge-rev/blob/v2.5.10/src-tauri/src/utils/resolve/scheme.rs`。
- 客户端 URL 规范化与导入：`https://github.com/clash-verge-rev/clash-verge-rev/blob/v2.5.10/src-tauri/src/config/prfitem.rs`，标签提交 `c83f7ad529c7c9cb3d2d54a0955ef8c1b22a411b`。
- 本地固定源文件：`work/audit_cedar2025_20261110/`、`work/audit_clash_verge_20261110/v2.5.10/`。

## 验证和状态

发布前 58 项 Node 回归通过，包含取消支付及同一订单操作互斥检查。Windows/macOS 导入 URL 与原生表达式逐字一致；包含无查询的路径 token、编码 token、已有查询及 fragment 测试。本地请求检查允许原生 name 参数，并按客户端的后缀提取和 fix_dirty_url 流程请求隔离 HTTP 测试服务器；4 个请求得到正确 YAML。浏览器检查覆盖 12 个入口及正常二维码。

v1.2.36 统一发布原生导入格式对齐和订单详情取消支付按钮，源码及测试一并提交。发布页面：`https://github.com/panhuanghe/Argon-Xboard/releases/tag/v1.2.36`，附件为 `Argon-Xboard-1.2.36.zip` 和 SHA-256 校验文件，替代前面的同版本本地包。此发布不自动更新线上主题；真实订阅请求、客户端入库及用户设备上的导入结果仍需更新后确认。
