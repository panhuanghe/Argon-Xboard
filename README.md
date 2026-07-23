# Argon-Xboard

基于 [Argon Design System](https://demos.creative-tim.com/argon-dashboard) 视觉语言的 Xboard 用户端主题。在已验证可用的 NebulaX 源码基础上重新设计样式：现代渐变、圆角卡片、清晰的信息层级，不绑定固定域名，可部署在根域名或任意子域名。

## 功能

- 登录、注册、邮箱验证码及验证适配
- 用户仪表盘、流量与订阅状态
- 使用文档、节点状态和每日流量明细
- 套餐选择、创建订单与基础支付跳转
- 订单列表、取消待支付订单
- 邀请码与返佣统计、工单创建和回复
- 个人中心、客服入口、深浅色模式
- 桌面端与移动端响应式布局
- API 始终使用同源 `/api/v1`，不绑定固定域名

## 安装

1. 下载仓库中的 [`Argon-Xboard-1.0.0.zip`](Argon-Xboard-1.0.0.zip)。
2. 进入 Xboard 管理后台的「主题」页面并上传 ZIP。
3. 切换到 **Argon-Xboard**，再按需填写品牌名称、主题色和客服地址。

正式安装包已按 Xboard 的上传规则打包，内部结构为：

```text
Argon-Xboard/
├─ config.json
├─ dashboard.blade.php
└─ assets/
   ├─ theme.css
   └─ theme.js
```

## 兼容性

- Xboard 当前 V1 用户接口
- 桌面端及移动端浏览器
- Cloudflare Turnstile、reCAPTCHA v2/v3
- 明亮与深色模式

## 本地预览

仓库内含 `preview.html`，用浏览器直接打开即可查看模拟数据（无需后端）：

- 右下角调试台可切换「游客 / 已登录」登录态、默认打开的页面、主题色、品牌名称与页脚。
- 也支持 URL 参数临时覆盖，例如：

  ```text
  preview.html?state=user&route=dashboard&color=%235e72e4
  ```

主题在 `preview.html` 下会自动进入演示模式（`window.NEBULAX_PREVIEW = true`），由 `theme.js` 内置的 `mockApi` 返回模拟数据；部署到 Xboard 后将自动改为读取真实接口。

## 自定义

- 主题色、品牌名称、标语、Logo、公告、客服与页脚均在后台主题配置中填写。
- 如需进一步改造，直接修改 `assets/theme.css` 与 `assets/theme.js` 即可，构建产物无域名绑定。
