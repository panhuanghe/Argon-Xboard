# 支付与一键导入检查 — cedar2025/Xboard

检查日期：2026-11-10。参考仓库：`https://github.com/cedar2025/Xboard`。
使用通过 GitHub API 确认的 master 提交 `d826a3b32f73bde24acce2a3ab033c6538ce121d`（提交日期 2026-11-02），下载并固定后端源文件和自带 `theme/Xboard/assets/umi.js`。

本地参考快照保存在 `work/audit_cedar2025_20261110/`，其中 `source.json` 和 `tree.json` 记录来源。此前 v1.2.34 的参考不能代替这份具体后端；本次以用户提供的仓库为准。

## 已确认并修复

| 问题 | 对照证据 | v1.2.35 行为 |
| --- | --- | --- |
| 已取消与已完成状态对调 | `app/Models/Order.php`：0 待付、1 处理中、2 取消、3 完成、4 折抵；自带主题也使用这套值 | 修正状态标签、已完成数量和已支付统计；余额抵扣计入实际已付金额 |
| 第三方支付回跳没有对应页面 | `PaymentService::pay` 的 return_url 是 `/#/order/{trade_no}`；自带主题提供 order/:trade_no 路由 | 支持订单详情路径，从后台 detail/check 接口读取真实状态 |
| 待支付订单只有取消按钮 | 自带主题详情可重新获取支付方式并 checkout | 列表提供继续支付/详情，创建订单先进入详情；刷新或稍后付款可恢复 |
| 当面付二维码被当作支付跳转链接 | `plugins-core/AlipayF2f/Plugin.php` 返回 type 0 的二维码内容；自带主题在对话框渲染 | 本地显示二维码，使用 order/check 查询状态；状态变化后刷新详情并结束弹窗 |
| 支付接口返回 type -1/data false 也能显示成功 | 原成功条件包含独立 type -1 | 仅确认 data true 才进入余额/免费成功分支；失败和无效响应不显示成功 |
| 支付方式接口报错被吞成空数组 | 原 createOrder 使用 catch 返回 [] | 保留真实错误；还有应付金额却无渠道时禁用确认；剩余为零走余额/免费结算 |
| 重复表单提交产生并发结算请求 | 同一未完成 checkout 未检查按钮状态 | 禁用期间忽略重复提交，避免重复发送 |
| Shadowrocket 固定使用 Surge 格式 | `Shadowrocket.php` 支持 VLESS/TUIC 等，`Surge.php` 允许的协议集合不同 | 使用 flag=shadowrocket；订阅不会被错误强制转成 Surge 配置 |
| Shadowrocket Base64 未按自带主题处理 | umi.js 使用 URL safe Base64 去掉填充 | 对齐 URL safe 编码，保留中文品牌及订阅 URL 数据 |
| Surfboard URI 与自带主题不一致 | umi.js 使用 surfboard:///install-config | 采用相同的三斜杠 URI，继续保留 flag=surfboard |
| 订阅二维码依赖外部图片接口 | 原代码将订阅 URL 拼进 qrserver 图片请求 | 订阅/支付二维码均在本地生成，不向外部二维码服务发送内容 |
| 临时网络错误使订单状态查询停止 | 发布前独立检查确认第一次 502 后未安排下一次查询 | 网络、5xx 和 429 错误最多重试三次；离开页面或退出登录时停止，持续失败显示错误 |
| 延迟结算响应重开已关闭的二维码 | 发布前独立检查确认导航后仍能收到旧订单的 QR 响应 | 仅在原页面、原表单及支付窗口仍有效时处理结算结果或错误 |

## 保留与确认

- v1.2.34 的 rawResponse 修复符合本仓库的 `{type:-1,data:true}` 顶层结算响应。
- EPay、Btcpay、Mgate、Coinbase、CoinPayments 均返回 type 1 支付 URL；本次保留完整响应并按类型跳转 HTTP(S) 页面。
- Clash Meta 的 flag=clash-meta 可匹配后端 meta 标识，Verge 使用相同配置格式和独立 clash-verge 协议。
- Sing-box 的 fragment 名称编码与自带主题一致；Surge macOS 保留已核对官方支持的 surgeconfig 兼容协议。
- 安装判断仍不能靠页面在短时内隐藏来完成。点击协议导航，等待浏览器授权，不恢复原来的误报逻辑。
- 后端支付网关通知、签名校验和数据库入账未修改。订单状态只从已认证的后端接口读取，不从支付回跳 URL 判定成功。

## 验证

- `node --test tests/*.test.cjs`：48/48，包含状态查询重试、重试上限和延迟响应的回归检查。
- `tests/xboard-payment.browser.cjs`：取消/完成/折抵回跳页面、QR 等待与状态更新、支付方式接口失败、无渠道时禁止错误结算、临时错误恢复和关闭后不重开 QR，共 8 个场景通过。
- `tests/payment-balance.browser.cjs`：生产前端的余额成功与失败路径，成功关闭窗口/刷新余额与订阅；失败保留错误和重试；没有真实扣款。
- `tests/quick-subscribe.browser.cjs`：12 个客户端入口协议导航及本地订阅二维码通过，没有安装误报弹窗。
- `tests/orders-mobile.browser.cjs`：320/390/430/768/1510px 订单列表检查；窄屏触摸双向滚动，最右侧操作列可达。
- JavaScript 语法和 diff 空白检查通过。安装包具有 `Argon-Xboard/` 根目录，版本 1.2.35，包含本地二维码脚本及 MIT 许可，排除 tests/.git；ZIP CRC 和全部文件内容比较通过。

## 交付状态

发布版本为 v1.2.35，安装包为 `Argon-Xboard-1.2.35.zip`；源码、测试和此检查记录一并提交。发布页面：`https://github.com/panhuanghe/Argon-Xboard/releases/tag/v1.2.35`，附件提供安装包及 SHA-256 校验文件。此发布不自动更换线上主题。

浏览器验证使用隔离 API 数据，未验证真实网关通知/入账、当前线上后端部署版本或各客户端实机导入。
