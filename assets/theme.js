(() => {
  'use strict';

  const langKey = 'nebulax_lang';
  const initialLang = localStorage.getItem(langKey) || (window.XBOARD_THEME || {}).lang || 'zh-CN';

  const langList = [
    { code: 'zh-CN', name: '简体中文' },
    { code: 'zh-TW', name: '繁體中文' },
    { code: 'en', name: 'English' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' },
    { code: 'vi', name: 'Tiếng Việt' },
    { code: 'fa', name: 'فارسی' }
  ];
  let currentLang = initialLang;
  const i18n = {"zh-CN":{"tagline":"清晰、现代、稳定的连接体验","footer_default":"Powered by Argon-Xboard · Xboard","month_price":"月付","quarter_price":"季付","half_year_price":"半年付","year_price":"年付","two_year_price":"两年付","three_year_price":"三年付","onetime_price":"一次性","reset_price":"重置流量","status_pending":"待支付","status_processing":"开通中","status_completed":"已完成","status_cancelled":"已取消","request_failed":"请求失败，请稍后重试","nav_main":"主导航","nav_dashboard":"仪表盘","nav_docs":"使用文档","nav_subscription":"订阅","nav_nodes":"节点列表","nav_plans":"购买订阅","nav_finance":"财务","nav_orders":"我的订单","nav_invites":"我的邀请","nav_user":"用户","nav_account":"个人中心","nav_tickets":"我的工单","nav_traffic":"流量明细","help_title":"需要一点帮助？","help_text":"遇到连接或订阅问题，可以随时联系我们。","help_contact":"联系客服","logout":"退出登录","theme_toggle":"切换深浅色","notifications":"查看通知","mobile_nav":"移动端导航","mobile_home":"首页","mobile_sub":"订阅","mobile_docs":"文档","mobile_ticket":"工单","mobile_me":"我的","auth_welcome":"欢迎回来","auth_create":"创建你的账户","auth_welcome_sub":"登录后管理订阅、查看流量与选择套餐。","auth_create_sub":"几步即可开始，连接体验从这里变得更轻盈。","email":"邮箱地址","password":"登录密码","password_min":"至少 8 位字符","remember":"保持登录","forgot_password":"找回密码","register_submit":"注册并进入","login_submit":"登录控制中心","has_account":"已经有账户？","direct_login":"直接登录","no_account":"还没有账户？","free_register":"免费注册","invite_code":"邀请码","optional":"（选填）","invite_placeholder":"请输入邀请码","invite_optional_ph":"邀请码(选填)","email_code":"邮箱验证码","code_placeholder":"6 位验证码","send_code":"发送验证码","register_agree":"创建账户即代表你同意站点服务条款与隐私政策。","new_password":"新密码","confirm_password":"确认密码","confirm_password_ph":"再次输入新密码","reset_password":"重置密码","remember_password":"想起密码了？","back_login":"返回登录","captcha_human":"请验证您是真人","captcha_loading":"正在载入安全验证…","captcha_recaptcha":"本页面受 reCAPTCHA 安全验证保护。","captcha_failed":"安全验证加载失败，请刷新页面重试。","captcha_required":"请先完成人机验证","dashboard_loading":"正在加载你的连接数据…","no_subscribe":"暂无订阅","no_active_subscribe":"暂无有效订阅","user":"用户","current_subscribe":"当前订阅","remaining_traffic":"剩余流量","subscribe_expire":"订阅到期","account_balance":"账户余额","no_subscribe_url":"暂无订阅链接","device_count":"设备数量","speed_limit":"速度上限","subscribe_status":"订阅状态","effective":"有效","plans_title":"选择适合你的方案","plans_sub":"所有价格与流量都清楚列出，没有藏起来的小字。","plans_period_tip":"按需求选择周期，随时可以在账户中查看订单。","plans_none":"暂时没有可售套餐","plans_none_sub":"管理员还没有发布订阅套餐。","unlimited_speed":"不限速","devices":"台设备","plan_feature":"稳定线路与便捷订阅","select_plan":"选择该方案","period":"周期","orders_title":"查看购买记录和订单状态。","buy_plan":"购买套餐","total_orders":"累计订单","paid_amount":"已支付金额","pending_orders":"待支付订单","completed_orders":"已完成订单","order":"订单","amount":"金额","create_time":"创建时间","status":"状态","action":"操作","orders_empty":"选择一个套餐后，订单会显示在这里。","search_placeholder":"请输入关键字","docs_guide":"使用指南","docs_no_match":"没有匹配的文档","docs_none":"还没有文档","docs_try":"换个关键词试试","docs_admin_none":"管理员暂未发布使用说明。","invites_title":"查看邀请码和返佣统计。","invites_sub":"分享邀请码，清楚查看邀请人数与返佣。","generate_code":"生成邀请码","registered_users":"已注册用户","valid_commission":"有效佣金","pending_commission":"待确认佣金","commission_rate":"返佣比例","invite_code_label":"邀请码","visits":"访问量","copy_link":"复制链接","invites_empty":"还没有邀请码","invites_empty_sub":"点击右上角生成第一个邀请码。","tickets_title":"提交问题、查看回复，解决过程不会丢失。","new_ticket":"新建工单","ticket_subject":"主题","ticket_level":"优先级","ticket_level_0":"一般","ticket_level_1":"紧急","ticket_level_2":"非常紧急","ticket_detail":"问题详情","ticket_detail_ph":"请写明设备、客户端和错误现象","cancel":"取消","submit_ticket":"提交工单","ticket_open":"处理中","ticket_closed":"已关闭","ticket_new_reply":"有新回复","ticket_waiting":"等待回复","ticket_reply":"继续回复","send_reply":"发送回复","close_ticket":"关闭工单","traffic_title":"查看每日上传和下载用量。","settings":"偏好设置","settings_sub":"这些设置保存在当前浏览器","ui_theme":"界面主题","support":"客服支持","open_support":"打开客服","not_configured":"未配置","frontend_version":"前端版本","login_status":"登录状态","security":"安全设置","security_sub":"定期更换密码可以保护账户安全","current_password":"当前密码","new_password_label":"新密码","confirm_new_password":"确认新密码","change_password":"修改密码","changing":"正在修改…","copy":"复制","copied":"已复制","operation_failed":"操作失败","operation_success":"操作成功","long_term":"长期有效","loading":"正在载入…","lang":"语言","lang_zh_CN":"简体中文","lang_zh_TW":"繁體中文","lang_en":"English","lang_ja":"日本語","lang_ko":"한국어","lang_vi":"Tiếng Việt","lang_fa":"فارسی","account_center":"个人中心","logout_action":"登出","dashboard_greeting":"你好，","dashboard_subtitle":"这里是你的连接状态与订阅概览。","my_subscribe":"我的订阅","subscribe_url":"订阅链接","subscribe_url_sub":"添加到你的客户端","status_normal":"正常","used":"已用","used_traffic":"已用流量","total":"总计","reset_after_days":"天后重置流量","unlimited":"不限","traffic_title_short":"流量","expires_at":"于 {date} 到期","expires_days_remaining":"距离到期还有 {days} 天","reset_days":"{days} 天后重置流量","reset_subscribe":"重置订阅","reset_hint":"重新生成订阅链接，旧链接将失效","copy_subscribe_url":"订阅链接已复制","copy_invite_url":"邀请链接已复制","copy_failed":"复制失败，请手动复制","reset_confirm":"确定要重置订阅链接吗？旧链接将立即失效。","reset_done":"订阅链接已重置","section_service":"服务","section_user":"用户","view_plan":"查看套餐","visual_uptime":"服务可用性","visual_connect":"持续连接","visual_subscribe":"快速订阅","joined_at":"加入于","plan_id":"套餐编号","expire_time":"到期时间","account_status":"账户状态","banned":"已停用","account_subtitle_loading":"管理个人信息与安全选项。","account_subtitle":"你的账户资料与常用操作。","current_password_ph":"请输入当前密码","error_title":"页面暂时无法载入","error_subtitle":"服务器返回了一个错误。","load_failed":"加载失败","error_retry":"请检查网络或稍后再试。","reload":"重新加载","connection_error":"连接异常","forgot_desc":"通过注册邮箱接收验证码，验证后即可设置新的登录密码。","please_enter_email":"请先填写邮箱地址"},"zh-TW":{"tagline":"清晰、現代、穩定的連線體驗","footer_default":"Powered by Argon-Xboard · Xboard","month_price":"月付","quarter_price":"季付","half_year_price":"半年付","year_price":"年付","two_year_price":"兩年付","three_year_price":"三年付","onetime_price":"一次性","reset_price":"重置流量","status_pending":"待支付","status_processing":"開通中","status_completed":"已完成","status_cancelled":"已取消","request_failed":"請求失敗，請稍後再試","nav_main":"主導航","nav_dashboard":"儀表板","nav_docs":"使用文件","nav_subscription":"訂閱","nav_nodes":"節點列表","nav_plans":"購買訂閱","nav_finance":"財務","nav_orders":"我的訂單","nav_invites":"我的邀請","nav_user":"用戶","nav_account":"個人中心","nav_tickets":"我的工單","nav_traffic":"流量明細","help_title":"需要一點幫助？","help_text":"遇到連線或訂閱問題，可以隨時聯繫我們。","help_contact":"聯繫客服","logout":"登出","theme_toggle":"切換深淺色","notifications":"查看通知","mobile_nav":"移動端導航","mobile_home":"首頁","mobile_sub":"訂閱","mobile_docs":"文件","mobile_ticket":"工單","mobile_me":"我的","auth_welcome":"歡迎回來","auth_create":"創建你的帳戶","auth_welcome_sub":"登入後管理訂閱、查看流量與選擇方案。","auth_create_sub":"幾步即可開始，連線體驗從這裡變得更輕盈。","email":"郵箱地址","password":"登入密碼","password_min":"至少 8 位字符","remember":"保持登入","forgot_password":"找回密碼","register_submit":"註冊並進入","login_submit":"登入控制中心","has_account":"已經有帳戶？","direct_login":"直接登入","no_account":"還沒有帳戶？","free_register":"免費註冊","invite_code":"邀請碼","optional":"（選填）","invite_placeholder":"請輸入邀請碼","invite_optional_ph":"邀請碼(選填)","email_code":"郵箱驗證碼","code_placeholder":"6 位驗證碼","send_code":"發送驗證碼","register_agree":"創建帳戶即代表你同意站點服務條款與隱私政策。","new_password":"新密碼","confirm_password":"確認密碼","confirm_password_ph":"再次輸入新密碼","reset_password":"重置密碼","remember_password":"想起密碼了？","back_login":"返回登入","captcha_human":"請驗證您是真人","captcha_loading":"正在載入安全驗證…","captcha_recaptcha":"本頁面受 reCAPTCHA 安全驗證保護。","captcha_failed":"安全驗證載入失敗，請刷新頁面重試。","captcha_required":"請先完成人機驗證","dashboard_loading":"正在載入你的連線數據…","no_subscribe":"暫無訂閱","no_active_subscribe":"暫無有效訂閱","user":"用戶","current_subscribe":"當前訂閱","remaining_traffic":"剩餘流量","subscribe_expire":"訂閱到期","account_balance":"帳戶餘額","no_subscribe_url":"暫無訂閱鏈接","device_count":"設備數量","speed_limit":"速度上限","subscribe_status":"訂閱狀態","effective":"有效","plans_title":"選擇適合你的方案","plans_sub":"所有價格與流量都清楚列出，沒有藏起來的小字。","plans_period_tip":"按需求選擇週期，隨時可以在帳戶中查看訂單。","plans_none":"暫時沒有可售方案","plans_none_sub":"管理員還沒有發布訂閱方案。","unlimited_speed":"不限速","devices":"台設備","plan_feature":"穩定線路與便捷訂閱","select_plan":"選擇該方案","period":"週期","orders_title":"查看購買記錄和訂單狀態。","buy_plan":"購買方案","total_orders":"累計訂單","paid_amount":"已支付金額","pending_orders":"待支付訂單","completed_orders":"已完成訂單","order":"訂單","amount":"金額","create_time":"創建時間","status":"狀態","action":"操作","orders_empty":"選擇一個方案後，訂單會顯示在這裡。","search_placeholder":"請輸入關鍵字","docs_guide":"使用指南","docs_no_match":"沒有匹配的文檔","docs_none":"還沒有文檔","docs_try":"換個關鍵詞試試","docs_admin_none":"管理員暫未發布使用說明。","invites_title":"查看邀請碼和返傭統計。","invites_sub":"分享邀請碼，清楚查看邀請人數與返傭。","generate_code":"生成邀請碼","registered_users":"已註冊用戶","valid_commission":"有效傭金","pending_commission":"待確認傭金","commission_rate":"返傭比例","invite_code_label":"邀請碼","visits":"訪問量","copy_link":"複製鏈接","invites_empty":"還沒有邀請碼","invites_empty_sub":"點擊右上角生成第一個邀請碼。","tickets_title":"提交問題、查看回覆，解決過程不會丟失。","new_ticket":"新建工單","ticket_subject":"主題","ticket_level":"優先級","ticket_level_0":"一般","ticket_level_1":"緊急","ticket_level_2":"非常緊急","ticket_detail":"問題詳情","ticket_detail_ph":"請寫明設備、客戶端和錯誤現象","cancel":"取消","submit_ticket":"提交工單","ticket_open":"處理中","ticket_closed":"已關閉","ticket_new_reply":"有新回覆","ticket_waiting":"等待回覆","ticket_reply":"繼續回覆","send_reply":"發送回覆","close_ticket":"關閉工單","traffic_title":"查看每日上傳和下載用量。","settings":"偏好設置","settings_sub":"這些設置保存在當前瀏覽器","ui_theme":"界面主題","support":"客服支持","open_support":"打開客服","not_configured":"未配置","frontend_version":"前端版本","login_status":"登入狀態","security":"安全設置","security_sub":"定期更換密碼可以保護帳戶安全","current_password":"當前密碼","new_password_label":"新密碼","confirm_new_password":"確認新密碼","change_password":"修改密碼","changing":"正在修改…","copy":"複製","copied":"已複製","operation_failed":"操作失敗","operation_success":"操作成功","long_term":"長期有效","loading":"正在載入…","lang":"語言","lang_zh_CN":"简体中文","lang_zh_TW":"繁體中文","lang_en":"English","lang_ja":"日本語","lang_ko":"한국어","lang_vi":"Tiếng Việt","lang_fa":"فارسی","account_center":"個人中心","logout_action":"登出","forgot_desc":"通過註冊郵箱接收驗證碼，驗證後即可設置新的登入密碼。","please_enter_email":"請先填寫郵箱地址"},"en":{"tagline":"Clear, modern, and stable connectivity","footer_default":"Powered by Argon-Xboard · Xboard","month_price":"Monthly","quarter_price":"Quarterly","half_year_price":"Half-yearly","year_price":"Yearly","two_year_price":"2-Year","three_year_price":"3-Year","onetime_price":"One-time","reset_price":"Reset Data","status_pending":"Pending","status_processing":"Processing","status_completed":"Completed","status_cancelled":"Cancelled","request_failed":"Request failed, please try again later","nav_main":"Main","nav_dashboard":"Dashboard","nav_docs":"Docs","nav_subscription":"Subscription","nav_nodes":"Nodes","nav_plans":"Plans","nav_finance":"Finance","nav_orders":"Orders","nav_invites":"Invites","nav_user":"User","nav_account":"Account","nav_tickets":"Tickets","nav_traffic":"Traffic","help_title":"Need help?","help_text":"Contact us anytime for connection or subscription issues.","help_contact":"Contact Support","logout":"Logout","theme_toggle":"Toggle theme","notifications":"Notifications","mobile_nav":"Mobile nav","mobile_home":"Home","mobile_sub":"Plans","mobile_docs":"Docs","mobile_ticket":"Tickets","mobile_me":"Me","auth_welcome":"Welcome back","auth_create":"Create account","auth_welcome_sub":"Manage subscriptions, traffic and plans after login.","auth_create_sub":"Get started in a few steps.","email":"Email","password":"Password","password_min":"At least 8 characters","remember":"Keep me logged in","forgot_password":"Forgot password?","register_submit":"Create account","login_submit":"Login","has_account":"Already have an account?","direct_login":"Login","no_account":"No account?","free_register":"Register free","invite_code":"Invite code","optional":" (optional)","invite_placeholder":"Enter invite code","invite_optional_ph":"Invite code (optional)","email_code":"Email code","code_placeholder":"6-digit code","send_code":"Send code","register_agree":"Creating an account means you agree to the Terms of Service and Privacy Policy.","new_password":"New password","confirm_password":"Confirm password","confirm_password_ph":"Re-enter new password","reset_password":"Reset password","remember_password":"Remember your password?","back_login":"Back to login","captcha_human":"Please verify you are human","captcha_loading":"Loading security check…","captcha_recaptcha":"This page is protected by reCAPTCHA.","captcha_failed":"Security check failed, please refresh.","captcha_required":"Please complete the human verification","dashboard_loading":"Loading your connection data…","no_subscribe":"No subscription","no_active_subscribe":"No active subscription","user":"User","current_subscribe":"Current plan","remaining_traffic":"Remaining data","subscribe_expire":"Expires","account_balance":"Balance","no_subscribe_url":"No subscribe URL","device_count":"Devices","speed_limit":"Speed limit","subscribe_status":"Status","effective":"Active","plans_title":"Choose your plan","plans_sub":"All prices and data allowances are clearly listed.","plans_period_tip":"Pick a billing cycle; you can review orders in your account.","plans_none":"No plans available","plans_none_sub":"The admin has not published any plans yet.","unlimited_speed":"Unlimited speed","devices":" devices","plan_feature":"Stable routes & easy subscription","select_plan":"Select plan","period":"Period","orders_title":"Review purchase history and order status.","buy_plan":"Buy plan","total_orders":"Total orders","paid_amount":"Paid amount","pending_orders":"Pending","completed_orders":"Completed","order":"Order","amount":"Amount","create_time":"Created","status":"Status","action":"Action","orders_empty":"Orders will appear here after you choose a plan.","search_placeholder":"Search keywords","docs_guide":"Guide","docs_no_match":"No matching docs","docs_none":"No docs yet","docs_try":"Try another keyword","docs_admin_none":"No guides published yet.","invites_title":"Invite codes & commission stats.","invites_sub":"Share invite codes and track referrals.","generate_code":"Generate code","registered_users":"Registered users","valid_commission":"Valid commission","pending_commission":"Pending commission","commission_rate":"Rate","invite_code_label":"Invite code","visits":"Visits","copy_link":"Copy link","invites_empty":"No invite code yet","invites_empty_sub":"Click the button above to generate your first code.","tickets_title":"Submit issues and view replies without losing context.","new_ticket":"New ticket","ticket_subject":"Subject","ticket_level":"Priority","ticket_level_0":"Normal","ticket_level_1":"Urgent","ticket_level_2":"Critical","ticket_detail":"Details","ticket_detail_ph":"Describe device, client and error","cancel":"Cancel","submit_ticket":"Submit ticket","ticket_open":"Open","ticket_closed":"Closed","ticket_new_reply":"New reply","ticket_waiting":"Waiting","ticket_reply":"Reply","send_reply":"Send reply","close_ticket":"Close ticket","traffic_title":"View daily upload and download usage.","settings":"Preferences","settings_sub":"These settings are saved in this browser","ui_theme":"Theme","support":"Support","open_support":"Open support","not_configured":"Not configured","frontend_version":"Frontend version","login_status":"Login status","security":"Security","security_sub":"Changing your password regularly keeps your account safe","current_password":"Current password","new_password_label":"New password","confirm_new_password":"Confirm new password","change_password":"Change password","changing":"Changing…","copy":"Copy","copied":"Copied","operation_failed":"Operation failed","operation_success":"Operation successful","long_term":"Lifetime","loading":"Loading…","lang":"Language","lang_zh_CN":"简体中文","lang_zh_TW":"繁體中文","lang_en":"English","lang_ja":"日本語","lang_ko":"한국어","lang_vi":"Tiếng Việt","lang_fa":"فارسی","account_center":"Account","logout_action":"Logout","dashboard_greeting":"Hello, ","dashboard_subtitle":"Here is your connection status and subscription overview.","my_subscribe":"My Subscription","subscribe_url":"Subscription URL","subscribe_url_sub":"Add to your client","status_normal":"Normal","used":"Used","used_traffic":"Used Traffic","total":"Total","reset_after_days":" days until reset","unlimited":"Unlimited","traffic_title_short":"Traffic","expires_at":"Expires {date}","expires_days_remaining":"{days} days remaining","reset_days":"Resets in {days} days","reset_subscribe":"Reset URL","reset_hint":"Regenerate subscription URL; the old one will stop working.","copy_subscribe_url":"Subscription URL copied","copy_invite_url":"Invite link copied","copy_failed":"Copy failed, please copy manually","reset_confirm":"Are you sure you want to reset the subscription URL? The old URL will stop working immediately.","reset_done":"Subscription URL reset","section_service":"Service","section_user":"User","view_plan":"View Plan","visual_uptime":"Service Uptime","visual_connect":"Always On","visual_subscribe":"One-Click Subscribe","joined_at":"Joined ","plan_id":"Plan ID","expire_time":"Expires","account_status":"Account Status","banned":"Suspended","account_subtitle_loading":"Manage personal info and security options.","account_subtitle":"Your account details and common actions.","current_password_ph":"Enter current password","error_title":"Page temporarily unavailable","error_subtitle":"The server returned an error.","load_failed":"Failed to load","error_retry":"Please check your network or try again later.","reload":"Reload","connection_error":"Connection Error","forgot_desc":"Receive a code at your registered email, then set a new password.","please_enter_email":"Please enter your email first"},"ja":{"tagline":"クリアでモダン、そして安定した接続体験","footer_default":"Powered by Argon-Xboard · Xboard","month_price":"月払い","quarter_price":"3ヶ月払い","half_year_price":"半年払い","year_price":"年払い","two_year_price":"2年払い","three_year_price":"3年払い","onetime_price":"ワンタイム","reset_price":"データリセット","status_pending":"支払待ち","status_processing":"開通中","status_completed":"完了","status_cancelled":"キャンセル","request_failed":"リクエストに失敗しました。後でもう一度お試しください","nav_main":"メインナビ","nav_dashboard":"ダッシュボード","nav_docs":"ドキュメント","nav_subscription":"サブスクリプション","nav_nodes":"ノード","nav_plans":"プラン購入","nav_finance":"財務","nav_orders":"注文履歴","nav_invites":"招待","nav_user":"ユーザー","nav_account":"アカウント","nav_tickets":"チケット","nav_traffic":"トラフィック","help_title":"ヘルプが必要ですか？","help_text":"接続やサブスクリプションの問題があれば、いつでもお問い合わせください。","help_contact":"サポートへ","logout":"ログアウト","theme_toggle":"テーマ切替","notifications":"通知","mobile_nav":"モバイルナビ","mobile_home":"ホーム","mobile_sub":"プラン","mobile_docs":"ドキュメント","mobile_ticket":"チケット","mobile_me":"マイページ","auth_welcome":"お帰りなさい","auth_create":"アカウント作成","auth_welcome_sub":"ログイン後、サブスクリプションやトラフィック、プランを管理できます。","auth_create_sub":"数ステップで開始、接続体験が軽やかになります。","email":"メールアドレス","password":"パスワード","password_min":"8文字以上","remember":"ログイン状態を保持","forgot_password":"パスワードを忘れた","register_submit":"登録して進む","login_submit":"ログイン","has_account":"既にアカウントをお持ちですか？","direct_login":"ログイン","no_account":"アカウントをお持ちでないですか？","free_register":"無料登録","invite_code":"招待コード","optional":"（任意）","invite_placeholder":"招待コードを入力","invite_optional_ph":"招待コード（任意）","email_code":"メール認証コード","code_placeholder":"6桁のコード","send_code":"コード送信","register_agree":"アカウントを作成すると、サービス利用規約およびプライバシーポリシーに同意したものとみなされます。","new_password":"新しいパスワード","confirm_password":"パスワード確認","confirm_password_ph":"新しいパスワードを再入力","reset_password":"パスワードリセット","remember_password":"パスワードを思い出しましたか？","back_login":"ログインに戻る","captcha_human":"人間であることを確認してください","captcha_loading":"セキュリティ認証を読み込み中…","captcha_recaptcha":"このページは reCAPTCHA で保護されています。","captcha_failed":"認証の読み込みに失敗しました。ページを更新してください。","captcha_required":"人間認証を完了してください","dashboard_loading":"接続データを読み込み中…","no_subscribe":"サブスクリプションなし","no_active_subscribe":"有効なサブスクリプションなし","user":"ユーザー","current_subscribe":"現在のプラン","remaining_traffic":"残りトラフィック","subscribe_expire":"有効期限","account_balance":"残高","no_subscribe_url":"購読URLがありません","device_count":"デバイス数","speed_limit":"速度制限","subscribe_status":"状態","effective":"有効","plans_title":"プランを選択","plans_sub":"価格と通信量はすべて明確に表示されています。","plans_period_tip":"請求サイクルを選択。注文はアカウントで確認できます。","plans_none":"販売中のプランはありません","plans_none_sub":"管理者がプランを公開していません。","unlimited_speed":"速度無制限","devices":" 台のデバイス","plan_feature":"安定したルートと簡単なサブスクリプション","select_plan":"このプランを選択","period":"期間","orders_title":"購入履歴と注文状況を確認。","buy_plan":"プランを購入","total_orders":"累計注文","paid_amount":"支払済み金額","pending_orders":"支払待ち","completed_orders":"完了注文","order":"注文","amount":"金額","create_time":"作成日","status":"状態","action":"操作","orders_empty":"プランを選択すると、ここに注文が表示されます。","search_placeholder":"キーワードを入力","docs_guide":"ガイド","docs_no_match":"一致するドキュメントがありません","docs_none":"ドキュメントがありません","docs_try":"別のキーワードを試す","docs_admin_none":"ガイドがまだ公開されていません。","invites_title":"招待コードとコミッション統計を確認。","invites_sub":"招待コードを共有し、紹介状況を追跡。","generate_code":"コード生成","registered_users":"登録ユーザー","valid_commission":"有効コミッション","pending_commission":"保留中コミッション","commission_rate":"レート","invite_code_label":"招待コード","visits":"訪問数","copy_link":"リンクをコピー","invites_empty":"招待コードがありません","invites_empty_sub":"右上のボタンから最初のコードを生成してください。","tickets_title":"問題を送信し、返信を確認。","new_ticket":"新規チケット","ticket_subject":"件名","ticket_level":"優先度","ticket_level_0":"通常","ticket_level_1":"緊急","ticket_level_2":"至急","ticket_detail":"詳細","ticket_detail_ph":"デバイス、クライアント、エラー現象を記載してください","cancel":"キャンセル","submit_ticket":"チケット送信","ticket_open":"処理中","ticket_closed":"完了","ticket_new_reply":"新着返信","ticket_waiting":"待機中","ticket_reply":"返信","send_reply":"返信送信","close_ticket":"チケットを閉じる","traffic_title":"毎日のアップロード・ダウンロード量を確認。","settings":"設定","settings_sub":"これらの設定はこのブラウザに保存されます","ui_theme":"テーマ","support":"サポート","open_support":"サポートを開く","not_configured":"未設定","frontend_version":"フロントエンドバージョン","login_status":"ログイン状態","security":"セキュリティ","security_sub":"定期的なパスワード変更はアカウントを保護します","current_password":"現在のパスワード","new_password_label":"新しいパスワード","confirm_new_password":"新しいパスワード（確認）","change_password":"パスワード変更","changing":"変更中…","copy":"コピー","copied":"コピーしました","operation_failed":"操作に失敗しました","operation_success":"操作が完了しました","long_term":"無期限","loading":"読み込み中…","lang":"言語","lang_zh_CN":"简体中文","lang_zh_TW":"繁體中文","lang_en":"English","lang_ja":"日本語","lang_ko":"한국어","lang_vi":"Tiếng Việt","lang_fa":"فارسی","account_center":"アカウント","logout_action":"ログアウト","forgot_desc":"登録したメールアドレスにコードを受け取り、認証後に新しいパスワードを設定できます。","please_enter_email":"メールアドレスを入力してください"},"ko":{"tagline":"선명하고 현대적이며 안정적인 연결 경험","footer_default":"Powered by Argon-Xboard · Xboard","month_price":"월간","quarter_price":"분기","half_year_price":"반기","year_price":"연간","two_year_price":"2년","three_year_price":"3년","onetime_price":"일회성","reset_price":"데이터 초기화","status_pending":"결제 대기","status_processing":"개통 중","status_completed":"완료","status_cancelled":"취소","request_failed":"요청 실패, 잠시 후 다시 시도해주세요","nav_main":"메인","nav_dashboard":"대시보드","nav_docs":"문서","nav_subscription":"구독","nav_nodes":"노드","nav_plans":"구매","nav_finance":"결제","nav_orders":"주문","nav_invites":"초대","nav_user":"사용자","nav_account":"계정","nav_tickets":"티켓","nav_traffic":"트래픽","help_title":"도움이 필요하신가요?","help_text":"연결 또는 구독 문제가 있으면 언제든지 문의하세요.","help_contact":"고객지원","logout":"로그아웃","theme_toggle":"테마 전환","notifications":"알림","mobile_nav":"모바일 메뉴","mobile_home":"홈","mobile_sub":"구독","mobile_docs":"문서","mobile_ticket":"티켓","mobile_me":"내 정보","auth_welcome":"환영합니다","auth_create":"계정 만들기","auth_welcome_sub":"로그인 후 구독, 트래픽 및 요금제를 관리하세요.","auth_create_sub":"몇 단계만으로 시작하세요.","email":"이메일","password":"비밀번호","password_min":"8자 이상","remember":"로그인 상태 유지","forgot_password":"비밀번호 찾기","register_submit":"가입하기","login_submit":"로그인","has_account":"이미 계정이 있으신가요?","direct_login":"로그인","no_account":"계정이 없으신가요?","free_register":"무료 가입","invite_code":"초대 코드","optional":" (선택)","invite_placeholder":"초대 코드 입력","invite_optional_ph":"초대 코드 (선택)","email_code":"이메일 인증 코드","code_placeholder":"6자리 코드","send_code":"코드 발송","register_agree":"계정을 생성하면 서비스 약관 및 개인정보처리방침에 동의하게 됩니다.","new_password":"새 비밀번호","confirm_password":"비밀번호 확인","confirm_password_ph":"새 비밀번호 다시 입력","reset_password":"비밀번호 재설정","remember_password":"비밀번호를 기억하시나요?","back_login":"로그인으로 돌아가기","captcha_human":"真人임을 인증해주세요","captcha_loading":"보안 인증 로드 중…","captcha_recaptcha":"이 페이지는 reCAPTCHA로 보호됩니다.","captcha_failed":"보안 인증 로드 실패, 새로고침해주세요.","captcha_required":"먼저 인증을 완료해주세요","dashboard_loading":"연결 데이터 로드 중…","no_subscribe":"구독 없음","no_active_subscribe":"활성 구독 없음","user":"사용자","current_subscribe":"현재 구독","remaining_traffic":"남은 트래픽","subscribe_expire":"만료일","account_balance":"잔액","no_subscribe_url":"구독 URL 없음","device_count":"기기 수","speed_limit":"속도 제한","subscribe_status":"상태","effective":"유효","plans_title":"요금제 선택","plans_sub":"모든 가격과 데이터가 명확하게 표시됩니다.","plans_period_tip":"원하는 결제 주기를 선택하고 주문은 계정에서 확인하세요.","plans_none":"판매 중인 요금제 없음","plans_none_sub":"관리자가 요금제를 게시하지 않았습니다.","unlimited_speed":"속도 무제한","devices":"대 기기","plan_feature":"안정적인 경로와 간편한 구독","select_plan":"요금제 선택","period":"기간","orders_title":"구매 내역과 주문 상태를 확인하세요.","buy_plan":"요금제 구매","total_orders":"총 주문","paid_amount":"결제 금액","pending_orders":"결제 대기","completed_orders":"완료 주문","order":"주문","amount":"금액","create_time":"생성일","status":"상태","action":"작업","orders_empty":"요금제를 선택하면 여기에 주문이 표시됩니다.","search_placeholder":"키워드 입력","docs_guide":"가이드","docs_no_match":"일치하는 문서 없음","docs_none":"문서 없음","docs_try":"다른 키워드로 검색","docs_admin_none":"아직 가이드가 게시되지 않았습니다.","invites_title":"초대 코드 및 커미션 통계를 확인하세요.","invites_sub":"초대 코드를 공유하고 추천 현황을 추적하세요.","generate_code":"코드 생성","registered_users":"등록 사용자","valid_commission":"유효 커미션","pending_commission":"대기 중 커미션","commission_rate":"비율","invite_code_label":"초대 코드","visits":"방문","copy_link":"링크 복사","invites_empty":"초대 코드 없음","invites_empty_sub":"오른쪽 위 버튼을 클릭하여 첫 코드를 생성하세요.","tickets_title":"문제를 제출하고 답변을 확인하세요.","new_ticket":"새 티켓","ticket_subject":"제목","ticket_level":"우선순위","ticket_level_0":"일반","ticket_level_1":"긴급","ticket_level_2":"매우 긴급","ticket_detail":"상세 내용","ticket_detail_ph":"기기, 클라이언트 및 오류 현상을 설명해주세요","cancel":"취소","submit_ticket":"티켓 제출","ticket_open":"처리 중","ticket_closed":"종료","ticket_new_reply":"새 답변","ticket_waiting":"대기 중","ticket_reply":"답변","send_reply":"답변 전송","close_ticket":"티켓 종료","traffic_title":"일일 업로드 및 다운로드 사용량을 확인하세요.","settings":"설정","settings_sub":"이 설정은 현재 브라우저에 저장됩니다","ui_theme":"테마","support":"고객지원","open_support":"고객지원 열기","not_configured":"설정되지 않음","frontend_version":"프론트엔드 버전","login_status":"로그인 상태","security":"보안","security_sub":"정기적으로 비밀번호를 변경하면 계정을 보호할 수 있습니다","current_password":"현재 비밀번호","new_password_label":"새 비밀번호","confirm_new_password":"새 비밀번호 확인","change_password":"비밀번호 변경","changing":"변경 중…","copy":"복사","copied":"복사됨","operation_failed":"작업 실패","operation_success":"작업 성공","long_term":"무기한","loading":"로드 중…","lang":"언어","lang_zh_CN":"简体中文","lang_zh_TW":"繁體中文","lang_en":"English","lang_ja":"日本語","lang_ko":"한국어","lang_vi":"Tiếng Việt","lang_fa":"فارسی","account_center":"계정","logout_action":"로그아웃","forgot_desc":"가입한 이메일로 코드를 받은 후 새 비밀번호를 설정하세요.","please_enter_email":"먼저 이메일을 입력해주세요"},"vi":{"tagline":"Kết nối rõ ràng, hiện đại và ổn định","footer_default":"Powered by Argon-Xboard · Xboard","month_price":"Hàng tháng","quarter_price":"Hàng quý","half_year_price":"Nửa năm","year_price":"Hàng năm","two_year_price":"2 năm","three_year_price":"3 năm","onetime_price":"Một lần","reset_price":"Đặt lại dữ liệu","status_pending":"Chờ thanh toán","status_processing":"Đang kích hoạt","status_completed":"Hoàn tất","status_cancelled":"Đã hủy","request_failed":"Yêu cầu thất bại, vui lòng thử lại sau","nav_main":"Chính","nav_dashboard":"Bảng điều khiển","nav_docs":"Tài liệu","nav_subscription":"Đăng ký","nav_nodes":"Máy chủ","nav_plans":"Gói dịch vụ","nav_finance":"Tài chính","nav_orders":"Đơn hàng","nav_invites":"Mời bạn","nav_user":"Người dùng","nav_account":"Tài khoản","nav_tickets":"Hỗ trợ","nav_traffic":"Lưu lượng","help_title":"Cần trợ giúp?","help_text":"Liên hệ với chúng tôi nếu gặp vấn đề kết nối hoặc đăng ký.","help_contact":"Liên hệ hỗ trợ","logout":"Đăng xuất","theme_toggle":"Chuyển chủ đề","notifications":"Thông báo","mobile_nav":"Menu mobile","mobile_home":"Trang chủ","mobile_sub":"Gói","mobile_docs":"Tài liệu","mobile_ticket":"Hỗ trợ","mobile_me":"Tôi","auth_welcome":"Chào mừng trở lại","auth_create":"Tạo tài khoản","auth_welcome_sub":"Quản lý đăng ký, lưu lượng và gói dịch vụ sau khi đăng nhập.","auth_create_sub":"Bắt đầu chỉ trong vài bước.","email":"Email","password":"Mật khẩu","password_min":"Ít nhất 8 ký tự","remember":"Giữ đăng nhập","forgot_password":"Quên mật khẩu","register_submit":"Đăng ký","login_submit":"Đăng nhập","has_account":"Đã có tài khoản?","direct_login":"Đăng nhập","no_account":"Chưa có tài khoản?","free_register":"Đăng ký miễn phí","invite_code":"Mã mời","optional":" (tùy chọn)","invite_placeholder":"Nhập mã mời","invite_optional_ph":"Mã mời (tùy chọn)","email_code":"Mã xác minh email","code_placeholder":"Mã 6 chữ số","send_code":"Gửi mã","register_agree":"Tạo tài khoản đồng nghĩa với việc đồng ý với Điều khoản và Chính sách bảo mật.","new_password":"Mật khẩu mới","confirm_password":"Xác nhận mật khẩu","confirm_password_ph":"Nhập lại mật khẩu mới","reset_password":"Đặt lại mật khẩu","remember_password":"Nhớ mật khẩu?","back_login":"Quay lại đăng nhập","captcha_human":"Vui lòng xác minh bạn là người thật","captcha_loading":"Đang tải xác minh…","captcha_recaptcha":"Trang này được bảo vệ bởi reCAPTCHA.","captcha_failed":"Tải xác minh thất bại, vui lòng làm mới.","captcha_required":"Vui lòng hoàn tất xác minh","dashboard_loading":"Đang tải dữ liệu kết nối…","no_subscribe":"Chưa có gói","no_active_subscribe":"Chưa có gói hoạt động","user":"Người dùng","current_subscribe":"Gói hiện tại","remaining_traffic":"Dữ liệu còn lại","subscribe_expire":"Hết hạn","account_balance":"Số dư","no_subscribe_url":"Chưa có URL đăng ký","device_count":"Thiết bị","speed_limit":"Giới hạn tốc độ","subscribe_status":"Trạng thái","effective":"Hoạt động","plans_title":"Chọn gói phù hợp","plans_sub":"Mọi giá cả và dung lượng đều được liệt kê rõ ràng.","plans_period_tip":"Chọn chu kỳ thanh toán; bạn có thể xem đơn hàng trong tài khoản.","plans_none":"Chưa có gói bán","plans_none_sub":"Quản trị viên chưa đăng gói dịch vụ.","unlimited_speed":"Không giới hạn tốc độ","devices":" thiết bị","plan_feature":"Đường truyền ổn định và đăng ký dễ dàng","select_plan":"Chọn gói","period":"Chu kỳ","orders_title":"Xem lịch sử mua và trạng thái đơn hàng.","buy_plan":"Mua gói","total_orders":"Tổng đơn","paid_amount":"Đã thanh toán","pending_orders":"Chờ thanh toán","completed_orders":"Hoàn tất","order":"Đơn hàng","amount":"Số tiền","create_time":"Ngày tạo","status":"Trạng thái","action":"Thao tác","orders_empty":"Đơn hàng sẽ hiển thị tại đây sau khi bạn chọn gói.","search_placeholder":"Nhập từ khóa","docs_guide":"Hướng dẫn","docs_no_match":"Không có tài liệu phù hợp","docs_none":"Chưa có tài liệu","docs_try":"Thử từ khóa khác","docs_admin_none":"Quản trị viên chưa đăng hướng dẫn.","invites_title":"Xem mã mời và thống kê hoa hồng.","invites_sub":"Chia sẻ mã mời và theo dõi giới thiệu.","generate_code":"Tạo mã","registered_users":"Người dùng đã đăng ký","valid_commission":"Hoa hồng hợp lệ","pending_commission":"Hoa hồng chờ","commission_rate":"Tỷ lệ","invite_code_label":"Mã mời","visits":"Lượt truy cập","copy_link":"Sao chép liên kết","invites_empty":"Chưa có mã mời","invites_empty_sub":"Nhấn nút ở góc trên bên phải để tạo mã đầu tiên.","tickets_title":"Gửi vấn đề và xem phản hồi.","new_ticket":"Tạo yêu cầu","ticket_subject":"Chủ đề","ticket_level":"Mức độ","ticket_level_0":"Bình thường","ticket_level_1":"Khẩn","ticket_level_2":"Rất khẩn","ticket_detail":"Chi tiết","ticket_detail_ph":"Mô tả thiết bị, ứng dụng và hiện tượng lỗi","cancel":"Hủy","submit_ticket":"Gửi yêu cầu","ticket_open":"Đang xử lý","ticket_closed":"Đã đóng","ticket_new_reply":"Có phản hồi mới","ticket_waiting":"Đang chờ","ticket_reply":"Phản hồi","send_reply":"Gửi phản hồi","close_ticket":"Đóng yêu cầu","traffic_title":"Xem lưu lượng upload và download hàng ngày.","settings":"Tùy chọn","settings_sub":"Các cài đặt này được lưu trong trình duyệt","ui_theme":"Chủ đề","support":"Hỗ trợ","open_support":"Mở hỗ trợ","not_configured":"Chưa cấu hình","frontend_version":"Phiên bản giao diện","login_status":"Trạng thái đăng nhập","security":"Bảo mật","security_sub":"Đổi mật khẩu định kỳ giúp bảo vệ tài khoản","current_password":"Mật khẩu hiện tại","new_password_label":"Mật khẩu mới","confirm_new_password":"Xác nhận mật khẩu mới","change_password":"Đổi mật khẩu","changing":"Đang đổi…","copy":"Sao chép","copied":"Đã sao chép","operation_failed":"Thao tác thất bại","operation_success":"Thao tác thành công","long_term":"Vĩnh viễn","loading":"Đang tải…","lang":"Ngôn ngữ","lang_zh_CN":"简体中文","lang_zh_TW":"繁體中文","lang_en":"English","lang_ja":"日本語","lang_ko":"한국어","lang_vi":"Tiếng Việt","lang_fa":"فارسی","account_center":"Tài khoản","logout_action":"Đăng xuất","forgot_desc":"Nhận mã qua email đăng ký, sau đó đặt mật khẩu mới.","please_enter_email":"Vui lòng nhập email trước"},"fa":{"tagline":"اتصال روشن، مدرن و پایدار","footer_default":"Powered by Argon-Xboard · Xboard","month_price":"ماهانه","quarter_price":"سه ماهه","half_year_price":"شش ماهه","year_price":"سالانه","two_year_price":"دو ساله","three_year_price":"سه ساله","onetime_price":"یکباره","reset_price":"بازنشانی داده","status_pending":"در انتظار پرداخت","status_processing":"در حال راه‌اندازی","status_completed":"تکمیل","status_cancelled":"لغو","request_failed":"درخواست ناموفق، لطفاً بعداً دوباره امتحان کنید","nav_main":"اصلی","nav_dashboard":"داشبورد","nav_docs":"مستندات","nav_subscription":"اشتراک","nav_nodes":"گره‌ها","nav_plans":"خرید طرح","nav_finance":"مالی","nav_orders":"سفارش‌ها","nav_invites":"دعوت‌ها","nav_user":"کاربر","nav_account":"حساب کاربری","nav_tickets":"تیکت‌ها","nav_traffic":"ترافیک","help_title":"نیاز به کمک دارید؟","help_text":"در صورت بروز مشکل در اتصال یا اشتراک، با ما تماس بگیرید.","help_contact":"تماس با پشتیبانی","logout":"خروج","theme_toggle":"تغییر تم","notifications":"اعلان‌ها","mobile_nav":"منوی موبایل","mobile_home":"خانه","mobile_sub":"اشتراک","mobile_docs":"مستندات","mobile_ticket":"تیکت","mobile_me":"من","auth_welcome":"خوش آمدید","auth_create":"ایجاد حساب","auth_welcome_sub":"پس از ورود، اشتراک، ترافیک و طرح‌ها را مدیریت کنید.","auth_create_sub":"در چند مرحله شروع کنید.","email":"ایمیل","password":"رمز عبور","password_min":"حداقل ۸ کاراکتر","remember":"مرا به خاطر بسپار","forgot_password":"فراموشی رمز عبور","register_submit":"ثبت‌نام","login_submit":"ورود","has_account":"حساب دارید؟","direct_login":"ورود","no_account":"حساب ندارید؟","free_register":"ثبت‌نام رایگان","invite_code":"کد دعوت","optional":" (اختیاری)","invite_placeholder":"کد دعوت را وارد کنید","invite_optional_ph":"کد دعوت (اختیاری)","email_code":"کد ایمیل","code_placeholder":"کد ۶ رقمی","send_code":"ارسال کد","register_agree":"ایجاد حساب به معنی پذیرش شرایط خدمات و سیاست حریم خصوصی است.","new_password":"رمز عبور جدید","confirm_password":"تأیید رمز عبور","confirm_password_ph":"رمز عبور جدید را دوباره وارد کنید","reset_password":"بازنشانی رمز عبور","remember_password":"رمز عبور را به خاطر دارید؟","back_login":"بازگشت به ورود","captcha_human":"لطفاً تأیید کنید انسان هستید","captcha_loading":"در حال بارگذاری بررسی امنیتی…","captcha_recaptcha":"این صفحه توسط reCAPTCHA محافظت می‌شود.","captcha_failed":"بارگذاری بررسی امنیتی ناموفق بود، لطفاً صفحه را تازه کنید.","captcha_required":"لطفاً ابتدا تأیید انسانی را کامل کنید","dashboard_loading":"در حال بارگذاری داده‌های اتصال…","no_subscribe":"بدون اشتراک","no_active_subscribe":"بدون اشتراک فعال","user":"کاربر","current_subscribe":"اشتراک فعلی","remaining_traffic":"ترافیک باقیمانده","subscribe_expire":"انقضا","account_balance":"موجودی","no_subscribe_url":"بدون URL اشتراک","device_count":"تعداد دستگاه","speed_limit":"محدودیت سرعت","subscribe_status":"وضعیت","effective":"فعال","plans_title":"طرح مناسب را انتخاب کنید","plans_sub":"همه قیمت‌ها و حجم‌ها به وضوح ذکر شده‌اند.","plans_period_tip":"دوره پرداخت را انتخاب کنید؛ سفارش‌ها را در حساب خود ببینید.","plans_none":"هیچ طرحی برای فروش نیست","plans_none_sub":"مدیر هنوز طرحی منتشر نکرده است.","unlimited_speed":"سرعت نامحدود","devices":" دستگاه","plan_feature":"مسیر پایدار و اشتراک آسان","select_plan":"انتخاب طرح","period":"دوره","orders_title":"تاریخچه خرید و وضعیت سفارش‌ها را بررسی کنید.","buy_plan":"خرید طرح","total_orders":"کل سفارش‌ها","paid_amount":"مبلغ پرداخت‌شده","pending_orders":"در انتظار پرداخت","completed_orders":"تکمیل‌شده","order":"سفارش","amount":"مبلغ","create_time":"زمان ایجاد","status":"وضعیت","action":"عملیات","orders_empty":"پس از انتخاب طرح، سفارش‌ها اینجا نمایش داده می‌شوند.","search_placeholder":"کلیدواژه را وارد کنید","docs_guide":"راهنما","docs_no_match":"مستندی یافت نشد","docs_none":"مستندی نیست","docs_try":"کلیدواژه دیگری امتحان کنید","docs_admin_none":"مدیر هنوز راهنمایی منتشر نکرده است.","invites_title":"کدهای دعوت و آمار کمیسیون را ببینید.","invites_sub":"کدهای دعوت را به اشتراک بگذارید و معرفی‌ها را پیگیری کنید.","generate_code":"ایجاد کد","registered_users":"کاربران ثبت‌شده","valid_commission":"کمیسیون معتبر","pending_commission":"کمیسیون در انتظار","commission_rate":"نرخ","invite_code_label":"کد دعوت","visits":"بازدید","copy_link":"کپی لینک","invites_empty":"هنوز کد دعوتی ندارید","invites_empty_sub":"برای ایجاد اولین کد روی دکمه بالا کلیک کنید.","tickets_title":"مشکل را ارسال کنید و پاسخ‌ها را ببینید.","new_ticket":"تیکت جدید","ticket_subject":"موضوع","ticket_level":"اولویت","ticket_level_0":"عادی","ticket_level_1":"فوری","ticket_level_2":"بسیار فوری","ticket_detail":"جزئیات","ticket_detail_ph":"دستگاه، کلاینت و پدیده خطا را شرح دهید","cancel":"لغو","submit_ticket":"ارسال تیکت","ticket_open":"در حال بررسی","ticket_closed":"بسته‌شده","ticket_new_reply":"پاسخ جدید","ticket_waiting":"در انتظار","ticket_reply":"پاسخ","send_reply":"ارسال پاسخ","close_ticket":"بستن تیکت","traffic_title":"مصرف روزانه آپلود و دانلود را بررسی کنید.","settings":"تنظیمات","settings_sub":"این تنظیمات در این مرورگر ذخیره می‌شوند","ui_theme":"تم","support":"پشتیبانی","open_support":"باز کردن پشتیبانی","not_configured":"پیکربندی نشده","frontend_version":"نسخه رابط کاربری","login_status":"وضعیت ورود","security":"امنیت","security_sub":"تغییر منظم رمز عبور از حساب شما محافظت می‌کند","current_password":"رمز عبور فعلی","new_password_label":"رمز عبور جدید","confirm_new_password":"تأیید رمز عبور جدید","change_password":"تغییر رمز عبور","changing":"در حال تغییر…","copy":"کپی","copied":"کپی شد","operation_failed":"عملیات ناموفق","operation_success":"عملیات موفق","long_term":"دائمی","loading":"در حال بارگذاری…","lang":"زبان","lang_zh_CN":"简体中文","lang_zh_TW":"繁體中文","lang_en":"English","lang_ja":"日本語","lang_ko":"한국어","lang_vi":"Tiếng Việt","lang_fa":"فارسی","account_center":"حساب کاربری","logout_action":"خروج","forgot_desc":"کد را به ایمیل ثبت‌شده دریافت کنید، سپس رمز عبور جدید را تنظیم کنید.","please_enter_email":"لطفاً ابتدا ایمیل را وارد کنید"}};
  function t(key, fallback = '') {
    const dict = i18n[currentLang] || i18n['zh-CN'];
    return dict[key] || i18n['en'][key] || i18n['zh-CN'][key] || fallback;
  }
  const extraI18n = {
    'zh-CN': {
      docs_subtitle: '安装、连接和常见问题说明',
      docs_articles: '篇文档',
      docs_updated: '更新时间',
      view_detail: '查看详情',
      orders_subtitle: '购买记录、支付状态和套餐信息都在这里。',
      nodes_subtitle: '实时查看线路可用状态。',
      nodes_online_summary: '{online} / {total} 个节点在线，状态会随服务端检测更新。',
      nodes_empty_title: '暂无可用节点',
      nodes_empty_sub: '当前套餐没有可展示的节点。',
      node_online: '在线',
      node_maintain: '维护中',
      node_rate: '流量倍率',
      node_tags: '节点标签',
      node_last_check: '最近检测',
      node_standard: '标准线路',
      tickets_subtitle: '查看与客服的沟通记录。',
      tickets_all: '全部工单',
      tickets_none_title: '还没有工单',
      tickets_none_sub: '遇到问题时，可以创建一张新工单。',
      traffic_subtitle: '统计记录由服务端生成，倍率已经单独标注。',
      traffic_total: '记录总用量',
      traffic_down: '下载流量',
      traffic_up: '上传流量',
      traffic_none_title: '暂无流量记录',
      traffic_none_sub: '开始使用节点后，明细会显示在这里。',
      no_content: '暂无内容',
      doc_loading: '正在载入文档…',
      ticket_loading: '正在载入工单…',
      ticket_created: '工单已提交',
      ticket_replied: '回复已发送',
      invite_created: '邀请码已生成',
      ticket_closed_done: '工单已关闭',
      order_cancelled: '订单已取消',
      logout_done: '已安全退出',
      password_mismatch: '两次输入的新密码不一致',
      password_changed_relogin: '密码已修改，请使用新密码重新登录',
      site_config_read_failed: '无法读取站点配置',
      select_period_for: '选择 {name} 的周期',
      coupon_optional: '优惠码（可选）',
      coupon_placeholder: '输入优惠码',
      create_order: '创建订单',
      creating_order: '正在创建…',
      payment_complete: '完成支付',
      payment_intro: '订单 {trade} 已创建，请选择支付方式。免费订单可直接确认。',
      online_payment: '在线支付',
      no_online_payment: '当前没有在线支付方式，将尝试使用余额或免费开通。',
      pay_later: '稍后支付',
      confirm_payment: '确认支付',
      processing: '处理中…',
      plan_activated: '套餐已成功开通',
      payment_waiting_title: '等待支付',
      payment_waiting_desc: '支付请求已创建，请按支付页面提示完成',
      account_created: '账户创建成功',
      creating_account: '正在创建账户…',
      logging_in: '正在登录…',
      resetting: '正在重置…',
      password_reset_done: '密码已重置，请使用新密码登录',
      status_unknown: '未知',
      subscription_plan: '订阅套餐',
      orders_none_title: '还没有订单',
      plan_traffic: '套餐流量',
      plan_network: '网络',
      plan_devices: '{count} 台设备',
      plan_unlimited_devices: '不限设备',
      traffic_up_short: '上',
      traffic_down_short: '下',
      send_code_success: '验证码已发送，请检查邮箱',
      resend: '重新发送',
      notice_center_title: '站内提醒',
      notice_center_sub: '这里会展示最新通知与公告。',
      notice_popup_title: '消息提醒',
      notice_empty: '暂无新的提醒',
      notification_settings_title: '通知',
      notification_settings_sub: '你可以在这里管理邮件提醒偏好。',
      expiry_email_reminder: '到期邮件提醒',
      expiry_email_reminder_desc: '订阅即将到期时将收到邮件提醒',
      traffic_email_reminder: '流量邮件提醒',
      traffic_email_reminder_desc: '当订阅流量即将耗尽时将收到邮件提醒',
      notification_saved: '提醒设置已更新'
    },
    en: {
      docs_subtitle: 'Install, connect, and common troubleshooting notes',
      docs_articles: 'articles',
      docs_updated: 'Updated',
      view_detail: 'View details',
      orders_subtitle: 'Purchase history, payment status and plan details are shown here.',
      nodes_subtitle: 'Monitor route availability in real time.',
      nodes_online_summary: '{online} / {total} nodes online. Status updates from server checks.',
      nodes_empty_title: 'No nodes available',
      nodes_empty_sub: 'No nodes are available for this plan yet.',
      node_online: 'Online',
      node_maintain: 'Maintenance',
      node_rate: 'Rate',
      node_tags: 'Tags',
      node_last_check: 'Last check',
      node_standard: 'Standard route',
      tickets_subtitle: 'Review communication history with support.',
      tickets_all: 'All tickets',
      tickets_none_title: 'No tickets yet',
      tickets_none_sub: 'Create a support ticket when you need help.',
      traffic_subtitle: 'Statistics are generated by server-side records.',
      traffic_total: 'Total usage',
      traffic_down: 'Download',
      traffic_up: 'Upload',
      traffic_none_title: 'No traffic records',
      traffic_none_sub: 'Traffic details will appear after using nodes.',
      no_content: 'No content',
      doc_loading: 'Loading document…',
      ticket_loading: 'Loading ticket…',
      ticket_created: 'Ticket submitted',
      ticket_replied: 'Reply sent',
      invite_created: 'Invite code created',
      ticket_closed_done: 'Ticket closed',
      order_cancelled: 'Order canceled',
      logout_done: 'Logged out safely',
      password_mismatch: 'The two new passwords do not match',
      password_changed_relogin: 'Password updated. Please sign in again.',
      site_config_read_failed: 'Failed to load site configuration',
      select_period_for: 'Choose billing period for {name}',
      coupon_optional: 'Coupon code (optional)',
      coupon_placeholder: 'Enter coupon code',
      create_order: 'Create order',
      creating_order: 'Creating…',
      payment_complete: 'Complete payment',
      payment_intro: 'Order {trade} has been created. Please choose a payment method.',
      online_payment: 'Online payment',
      no_online_payment: 'No online payment methods available. Balance/free checkout will be attempted.',
      pay_later: 'Pay later',
      confirm_payment: 'Confirm payment',
      processing: 'Processing…',
      plan_activated: 'Plan activated successfully',
      payment_waiting_title: 'Pending payment',
      payment_waiting_desc: 'Payment request created. Please complete it on the payment page.',
      account_created: 'Account created successfully',
      creating_account: 'Creating account…',
      logging_in: 'Logging in…',
      resetting: 'Resetting…',
      password_reset_done: 'Password reset complete. Please sign in with your new password.',
      status_unknown: 'Unknown',
      subscription_plan: 'Subscription plan',
      orders_none_title: 'No orders yet',
      plan_traffic: 'data',
      plan_network: 'network',
      plan_devices: '{count} devices',
      plan_unlimited_devices: 'Unlimited devices',
      traffic_up_short: 'Up',
      traffic_down_short: 'Down',
      send_code_success: 'Verification code sent. Please check your inbox.',
      resend: 'Resend',
      notice_center_title: 'Notifications',
      notice_center_sub: 'Latest announcements and messages are shown here.',
      notice_popup_title: 'Message',
      notice_empty: 'No new notifications',
      notification_settings_title: 'Notifications',
      notification_settings_sub: 'Manage your email reminder preferences here.',
      expiry_email_reminder: 'Expiry email reminder',
      expiry_email_reminder_desc: 'Get an email reminder before your subscription expires.',
      traffic_email_reminder: 'Traffic email reminder',
      traffic_email_reminder_desc: 'Get an email reminder before your traffic is exhausted.',
      notification_saved: 'Notification preferences updated'
    }
  };
  function tx(key, fallback = '') {
    const dict = extraI18n[currentLang] || extraI18n['en'] || {};
    return t(key) || dict[key] || (extraI18n['en'] || {})[key] || fallback;
  }
  function fmt(text, params = {}) {
    return String(text || '').replace(/\{(\w+)\}/g, (_, key) => Object.prototype.hasOwnProperty.call(params, key) ? params[key] : '{' + key + '}');
  }
  function setLang(code) {
    if (currentLang !== code) {
      state.docs = [];
      state.docSearch = '';
    }
    currentLang = code;
    state.lang = code;
    localStorage.setItem(langKey, code);
    document.documentElement.lang = code;
    render();
  }

  function periodLabel(key) {
    const map = {
      month_price: t('month_price'),
      quarter_price: t('quarter_price'),
      half_year_price: t('half_year_price'),
      year_price: t('year_price'),
      two_year_price: t('two_year_price'),
      three_year_price: t('three_year_price'),
      onetime_price: t('onetime_price'),
      reset_price: t('reset_price')
    };
    return map[key] || key || '—';
  }

  function orderStatusLabel(code) {
    const map = {
      0: [t('status_pending'), 'warning'],
      1: [t('status_processing'), 'warning'],
      2: [t('status_completed'), 'success'],
      3: [t('status_cancelled'), 'danger']
    };
    return map[code] || [tx('status_unknown'), 'warning'];
  }

  const app = document.getElementById('app');
  const config = Object.assign({
    title: 'Xboard', brandName: 'Argon-Xboard', tagline: t('tagline'),
    primaryColor: '#5e72e4', logoUrl: '', announcement: '', supportUrl: '', footerText: t('footer_default'),
    loginCaptchaEnabled: '1', authCaptchaEnabled: '1'
  }, window.XBOARD_THEME || {});
  const isPreview = Boolean(window.NEBULAX_PREVIEW);
  const ASSETS_BASE = (window.XBOARD_ASSETS || './assets').replace(/\/$/, '');
  const storageKey = 'nebulax_auth_data';
  const themeKey = 'nebulax_color_mode';
  const noticeSeenKey = 'argon_notice_seen';
  const ticketReadMapKey = 'argon_ticket_read_map';
  const notifyPrefKey = 'argon_notification_prefs';
  const notifyFieldMap = { expiryEmail: 'remind_expire', trafficEmail: 'remind_traffic' };
  const defaultNotifyPrefs = { expiryEmail: false, trafficEmail: false };
  const state = {
    auth: localStorage.getItem(storageKey) || '',
    lang: initialLang,
    notificationPrefs: readNotificationPrefs(),
    guest: {}, user: null, subscribe: null, plans: [], orders: [], notices: [],
    docs: [], docSearch: '', invite: null, nodes: [], tickets: [], traffic: [],
    loading: false, captchaToken: '', quickSubscribeOS: 'ios', renderId: 0
  };
  let ticketPollTimer = 0;

  applyBrandColor(config.primaryColor);
  setColorMode(localStorage.getItem(themeKey) || 'light');
  ensureGlobals();

  function applyBrandColor(color) {
    if (!/^#[0-9a-f]{6}$/i.test(color || '')) return;
    const rgb = [1, 3, 5].map(i => parseInt(color.slice(i, i + 2), 16));
    document.documentElement.style.setProperty('--primary', color);
    document.documentElement.style.setProperty('--primary-rgb', rgb.join(', '));
    document.documentElement.style.setProperty('--primary-strong', shade(color, -14));
  }

  function shade(hex, amount) {
    const value = parseInt(hex.slice(1), 16);
    const calc = shift => Math.max(0, Math.min(255, (value >> shift & 255) + amount));
    return `#${[16, 8, 0].map(s => calc(s).toString(16).padStart(2, '0')).join('')}`;
  }

  function setColorMode(mode) {
    document.documentElement.dataset.theme = mode === 'dark' ? 'dark' : 'light';
    localStorage.setItem(themeKey, mode);
  }

  function setMobileMenuOpen(open) {
    document.body.classList.toggle('mobile-menu-open', Boolean(open));
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  function isToggleEnabled(value, fallback = '1') {
    const normalized = String(value ?? fallback).trim().toLowerCase();
    return normalized !== '' && normalized !== '0' && normalized !== 'false' && normalized !== 'off' && normalized !== 'no';
  }

  function isBackendCaptchaEnabled(guest = state.guest || {}) {
    return Number(guest?.is_captcha) === 1;
  }

  function isCaptchaEnabledForMode(mode = 'register', guest = state.guest || {}) {
    if (mode === 'register') {
      return isBackendCaptchaEnabled(guest);
    }
    if (mode === 'login') {
      return isBackendCaptchaEnabled(guest) && isToggleEnabled(config.loginCaptchaEnabled, config.authCaptchaEnabled ?? '1');
    }
    return false;
  }

  function readNotificationPrefs() {
    try {
      const raw = localStorage.getItem(notifyPrefKey);
      const parsed = raw ? JSON.parse(raw) : {};
      return {
        expiryEmail: Boolean(parsed?.expiryEmail),
        trafficEmail: Boolean(parsed?.trafficEmail)
      };
    } catch (_) {
      return Object.assign({}, defaultNotifyPrefs);
    }
  }

  function saveNotificationPrefs(prefs) {
    const next = {
      expiryEmail: Boolean(prefs?.expiryEmail),
      trafficEmail: Boolean(prefs?.trafficEmail)
    };
    state.notificationPrefs = next;
    localStorage.setItem(notifyPrefKey, JSON.stringify(next));
    return next;
  }

  function toggleNotificationPref(key) {
    if (!Object.prototype.hasOwnProperty.call(defaultNotifyPrefs, key)) return state.notificationPrefs;
    const next = Object.assign({}, state.notificationPrefs || readNotificationPrefs());
    next[key] = !Boolean(next[key]);
    return saveNotificationPrefs(next);
  }

  function applyServerNotificationPrefs(user) {
    if (!user || typeof user !== 'object') return state.notificationPrefs;
    const hasExpire = Object.prototype.hasOwnProperty.call(user, 'remind_expire');
    const hasTraffic = Object.prototype.hasOwnProperty.call(user, 'remind_traffic');
    if (!hasExpire && !hasTraffic) return state.notificationPrefs;
    return saveNotificationPrefs({
      expiryEmail: Number(user.remind_expire) === 1,
      trafficEmail: Number(user.remind_traffic) === 1
    });
  }

  function ensureGlobals() {
    if (!document.querySelector('.toast-stack')) {
      document.body.insertAdjacentHTML('beforeend', '<div class="toast-stack" aria-live="assertive"></div><dialog class="dialog" id="global-dialog"></dialog>');
    }
  }

  function e(value) {
    return String(value ?? '').replace(/[&<>'"]/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    })[char]);
  }

  function safeHtml(value) {
    const template = document.createElement('template');
    template.innerHTML = String(value || '');
    template.content.querySelectorAll('script,style,iframe,object,embed,form').forEach(node => node.remove());
    template.content.querySelectorAll('*').forEach(node => [...node.attributes].forEach(attr => {
      if (/^on/i.test(attr.name) || ((attr.name === 'href' || attr.name === 'src') && /^\s*javascript:/i.test(attr.value))) node.removeAttribute(attr.name);
    }));
    return template.innerHTML;
  }

  function safeHttpUrl(value) {
    try {
      const raw = String(value || '').trim();
      if (!raw) return '';
      const url = new URL(raw, location.origin);
      return /^https?:$/i.test(url.protocol) ? url.href : '';
    } catch (_) {
      return '';
    }
  }

  function renderLink(href, label) {
    const safe = safeHttpUrl(href);
    if (!safe) return e(label || href || '');
    return `<a class="announcement-link" href="${e(safe)}" target="_blank" rel="noopener">${e(label || safe)}</a>`;
  }

  function linkifyPlainText(text) {
    const source = String(text || '');
    const urlRegex = /https?:\/\/[^\s]+/gi;
    let html = '';
    let last = 0;
    let match;
    while ((match = urlRegex.exec(source))) {
      const raw = match[0];
      const start = match.index;
      html += e(source.slice(last, start));
      let trimmed = raw;
      let tail = '';
      while (/[),.;!?\]]$/.test(trimmed)) {
        tail = trimmed.slice(-1) + tail;
        trimmed = trimmed.slice(0, -1);
      }
      const linked = renderLink(trimmed, trimmed);
      html += linked + e(tail);
      last = start + raw.length;
    }
    html += e(source.slice(last));
    return html;
  }

  function renderAnnouncementContent(value) {
    const raw = String(value || '').trim();
    if (!raw) return '';
    if (/<[^>]+>/.test(raw)) return safeHtml(raw);

    const normalized = raw.replace(/\r\n/g, '\n');
    const markdownLink = /\[([^\]]+)\]\(([^)]*)\)/g;
    let html = '';
    let last = 0;
    let match;
    while ((match = markdownLink.exec(normalized))) {
      html += linkifyPlainText(normalized.slice(last, match.index));
      const label = String(match[1] || '').trim();
      const hrefRaw = String(match[2] || '').trim();
      const fallback = /^https?:\/\//i.test(label) ? label : '';
      const href = safeHttpUrl(hrefRaw) || safeHttpUrl(fallback);
      html += href ? renderLink(href, label || href) : e(match[0]);
      last = markdownLink.lastIndex;
    }
    html += linkifyPlainText(normalized.slice(last));
    return html.replace(/\n/g, '<br>');
  }

  function normalizeTemplateFlag(flag) {
    return String(flag || '').trim().toLowerCase().replace(/_/g, '-');
  }

  function templateLabel(flag) {
    const map = {
      'sing-box': 'Sing-box',
      'singbox': 'Sing-box',
      'clash': 'Clash',
      'clash-meta': 'Clash Meta',
      'stash': 'Stash',
      'surge': 'Surge',
      'surfboard': 'Surfboard'
    };
    return map[normalizeTemplateFlag(flag)] || String(flag || '');
  }

  function buildTemplateSubscribeUrl(subscribeUrl, flag) {
    const safe = safeHttpUrl(subscribeUrl);
    if (!safe) return '';
    try {
      const parsed = new URL(safe);
      const normalized = normalizeTemplateFlag(flag);
      if (normalized) parsed.searchParams.set('flag', normalized);
      return parsed.toString();
    } catch (_) {
      return safe;
    }
  }

  function encodeBase64Utf8(value) {
    try {
      return btoa(unescape(encodeURIComponent(String(value || ''))));
    } catch (_) {
      return btoa(String(value || ''));
    }
  }

  function buildQuickImportUrl(client, templateUrl) {
    const encoded = encodeURIComponent(templateUrl);
    const appName = encodeURIComponent(String(config.brandName || config.title || 'Argon-Xboard'));
    switch (String(client || '').toLowerCase()) {
      case 'shadowrocket':
        return `shadowrocket://add/sub://${encodeBase64Utf8(templateUrl)}?remark=${appName}`;
      case 'surge':
        return `surge://install-config?url=${encoded}&name=${appName}`;
      case 'stash':
        return `stash://install-config?url=${encoded}&name=${appName}`;
      case 'clash':
      case 'clash-meta':
        return `clash://install-config?url=${encoded}&name=${appName}`;
      case 'sing-box':
      case 'singbox':
        return `sing-box://import-remote-profile?url=${encoded}&name=${appName}`;
      case 'surfboard':
        return `surfboard://install-config?url=${encoded}&name=${appName}`;
      default:
        return '';
    }
  }

  function quickClientItemsByOS(os) {
    const current = String(os || 'ios').toLowerCase();
    const groups = {
      ios: [
        { client: 'shadowrocket', label: '导入到 Shadowrocket', flag: 'surge' },
        { client: 'surge', label: '导入到 Surge', flag: 'surge' },
        { client: 'stash', label: '导入到 Stash', flag: 'stash' }
      ],
      android: [
        { client: 'clash-meta', label: '导入到 Clash Meta', flag: 'clash-meta' },
        { client: 'surfboard', label: '导入到 Surfboard', flag: 'surfboard' },
        { client: 'sing-box', label: '导入到 Sing-box', flag: 'sing-box' }
      ],
      macos: [
        { client: 'clash-meta', label: '导入到 Clash Verge', flag: 'clash-meta' },
        { client: 'surge', label: '导入到 Surge', flag: 'surge' },
        { client: 'sing-box', label: '导入到 Sing-box', flag: 'sing-box' }
      ],
      windows: [
        { client: 'clash-meta', label: '导入到 Clash Verge', flag: 'clash-meta' },
        { client: 'clash', label: '导入到 Clash for Windows', flag: 'clash' },
        { client: 'sing-box', label: '导入到 Sing-box', flag: 'sing-box' }
      ]
    };
    return groups[current] || groups.ios;
  }

  function renderQuickSubscribeModule(subscribe) {
    const subscribeUrl = safeHttpUrl(subscribe?.subscribe_url || '');
    if (!subscribeUrl) return '';
    const osList = ['ios', 'android', 'macos', 'windows'];
    const currentOS = osList.includes(String(state.quickSubscribeOS || '').toLowerCase()) ? String(state.quickSubscribeOS).toLowerCase() : 'ios';
    const clients = quickClientItemsByOS(currentOS);
    return `<section class="quick-subscribe-card">
      <div class="quick-subscribe-head">
        <h3>一键订阅</h3>
        <small>与后台订阅模板联动</small>
      </div>
      <div class="quick-subscribe-actions">
        <button class="quick-action-btn" type="button" data-action="copy-sub">${icon('copy')}<span>复制订阅地址</span></button>
        <button class="quick-action-btn" type="button" data-action="show-sub-qr">${icon('dashboard')}<span>扫描二维码订阅</span></button>
      </div>
      <div class="quick-subscribe-tabs">${osList.map(os => `<button type="button" class="quick-tab ${currentOS === os ? 'active' : ''}" data-action="set-quick-os" data-os="${os}">${os.toUpperCase()}</button>`).join('')}</div>
      <div class="quick-client-list">${clients.map(item => `<button type="button" class="quick-client-item" data-action="open-quick-client" data-client="${e(item.client)}" data-flag="${e(item.flag)}"><span>${e(item.label)}</span><small>${e(templateLabel(item.flag))} 模板</small></button>`).join('')}</div>
    </section>`;
  }

  function getQuickClientDownloadLink(client, os) {
    const currentOS = String(os || 'ios').toLowerCase();
    const name = String(client || '').toLowerCase();
    const links = {
      shadowrocket: 'https://apps.apple.com/app/shadowrocket/id932747118',
      surge: currentOS === 'ios' ? 'https://apps.apple.com/app/surge-5/id1442620678' : 'https://nssurge.com/',
      stash: 'https://stash.wiki/',
      'clash-meta': currentOS === 'android'
        ? 'https://github.com/MetaCubeX/ClashMetaForAndroid/releases'
        : 'https://github.com/clash-verge-rev/clash-verge-rev/releases',
      clash: 'https://github.com/Fndroid/clash_for_windows_pkg/releases',
      'sing-box': 'https://sing-box.sagernet.org/clients/',
      singbox: 'https://sing-box.sagernet.org/clients/',
      surfboard: 'https://apkpure.com/surfboard/com.getsurfboard'
    };
    return links[name] || '';
  }

  function waitClientLaunch(timeoutMs = 1500) {
    return new Promise(resolve => {
      let finished = false;
      const cleanup = () => {
        clearTimeout(timer);
        document.removeEventListener('visibilitychange', onVisibilityChange, true);
        window.removeEventListener('pagehide', onHidden, true);
        window.removeEventListener('blur', onBlur, true);
      };
      const done = launched => {
        if (finished) return;
        finished = true;
        cleanup();
        resolve(Boolean(launched));
      };
      const onHidden = () => done(true);
      const onVisibilityChange = () => {
        if (document.visibilityState === 'hidden' || document.hidden) done(true);
      };
      const onBlur = () => setTimeout(() => {
        if (document.visibilityState === 'hidden' || document.hidden) done(true);
      }, 80);
      const timer = setTimeout(() => done(document.visibilityState === 'hidden' || document.hidden), timeoutMs);
      if (document.visibilityState === 'hidden' || document.hidden) {
        done(true);
        return;
      }
      document.addEventListener('visibilitychange', onVisibilityChange, true);
      window.addEventListener('pagehide', onHidden, true);
      window.addEventListener('blur', onBlur, true);
    });
  }

  function openSubscribeQr(subscribeUrl) {
    const safe = safeHttpUrl(subscribeUrl);
    if (!safe) {
      toast(t('no_subscribe_url'), 'error');
      return;
    }
    const dialog = document.getElementById('global-dialog');
    const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(safe)}`;
    dialog.innerHTML = `<div class="dialog-head"><div><h3>扫码订阅</h3><small>使用客户端扫码导入订阅</small></div><button class="icon-btn" data-action="close-dialog">${icon('close')}</button></div><div class="dialog-body quick-qr-body"><img class="quick-qr-image" src="${e(qrSrc)}" alt="QR"><p class="quick-qr-link">${renderLink(safe, safe)}</p></div>`;
    dialog.showModal();
  }

  async function openQuickClientImport(client, flag) {
    const subscribeUrl = safeHttpUrl(state.subscribe?.subscribe_url || '');
    if (!subscribeUrl) {
      toast(t('no_subscribe_url'), 'error');
      return;
    }
    const templateUrl = buildTemplateSubscribeUrl(subscribeUrl, flag);
    const importUrl = buildQuickImportUrl(client, templateUrl);
    if (importUrl) {
      const launchProbe = waitClientLaunch();
      window.location.href = importUrl;
      const launched = await launchProbe;
      if (launched) return;
      const download = getQuickClientDownloadLink(client, state.quickSubscribeOS);
      if (download) {
        const goInstall = window.confirm('未检测到对应客户端，是否前往下载页面安装？');
        if (goInstall) window.open(download, '_blank', 'noopener');
      } else {
        toast('未检测到客户端，请先安装对应客户端。', 'warning');
      }
    } else {
      window.open(templateUrl, '_blank', 'noopener');
    }
  }

  function icon(name) {
    const paths = {
      dashboard: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
      plans: '<path d="M4 7h16M4 12h16M4 17h10"/><circle cx="18" cy="17" r="2"/>',
      orders: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3z"/><path d="M9 8h6M9 12h6"/>',
      docs: '<path d="M4 5a3 3 0 0 1 3-3h12v17H7a3 3 0 0 0-3 3V5z"/><path d="M7 2v17M9 7h7M9 11h6"/>',
      invite: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0M17 7v6M14 10h6"/>',
      nodes: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
      ticket: '<path d="M4 4h16v13H8l-4 4V4z"/><path d="M8 9h8M8 13h5"/>',
      user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
      moon: '<path d="M20.5 14.3A8.5 8.5 0 0 1 9.7 3.5 8.5 8.5 0 1 0 20.5 14.3z"/>',
      globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
      sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"/>',
      logout: '<path d="M10 17l5-5-5-5M15 12H3"/><path d="M14 4h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5"/>',
      mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
      lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
      copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
      bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
      menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
      check: '<path d="m5 12 4 4L19 6"/>',
      arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
      close: '<path d="M18 6 6 18M6 6l12 12"/>',
      wifi: '<path d="M5 12.55a11 11 0 0 1 14 0M8.5 16a6 6 0 0 1 7 0M12 20h.01"/><path d="M2 9a16 16 0 0 1 20 0"/>',
      chart: '<path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/>',
      calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
      wallet: '<path d="M4 6h15a2 2 0 0 1 2 2v10H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12"/><path d="M16 11h5"/>',
      info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
      refresh: '<path d="M20 7v5h-5M4 17v-5h5"/><path d="M18.5 9A7 7 0 0 0 6 6.5L4 12M5.5 15A7 7 0 0 0 18 17.5l2-5.5"/>',
      support: '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><path d="M18 19c0 1-1 2-2 2h-3M4 14h3v5H5a2 2 0 0 1-2-2v-1a2 2 0 0 1 1-2zM20 14h-3v5h2a2 2 0 0 0 2-2v-1a2 2 0 0 0-1-2z"/>',
      empty: '<path d="M3 7h18M5 7l1 13h12l1-13M9 11v5M15 11v5"/><path d="M9 7V4h6v3"/>'
    };
    return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.info}</svg>`;
  }

  function brand() {
    const visual = config.logoUrl
      ? `<img class="brand-logo" src="${e(config.logoUrl)}" alt="">`
      : '<span class="brand-mark"><span></span><span></span></span>';
    return `<div class="brand">${visual}<div><strong>${e(config.brandName || config.title)}</strong><small>dashboard</small></div></div>`;
  }

  function statCard(iconName, value, label, color = 'bg-gradient-primary') {
    return `<div class="card stat-card">
      <div class="stat-icon ${color}">${icon(iconName)}</div>
      <div class="meta"><strong>${e(value)}</strong><span>${e(label)}</span></div>
    </div>`;
  }

  async function api(path, options = {}) {
    if (isPreview) return mockApi(path, options);
    const headers = Object.assign({ Accept: 'application/json' }, options.headers || {});
    if (state.auth) headers.Authorization = state.auth;
    if (options.body && !(options.body instanceof FormData)) headers['Content-Type'] = 'application/json';
    const response = await fetch(`/api/v1${path}`, {
      method: options.method || 'GET', headers,
      body: options.body && !(options.body instanceof FormData) ? JSON.stringify(options.body) : options.body
    });
    let result;
    try { result = await response.json(); } catch { result = { message: `${t('request_failed')} (${response.status})` }; }
    if (response.status === 401) {
      clearAuth();
      if (!location.hash.startsWith('#/login')) location.hash = '#/login';
    }
    if (!response.ok || result.status === 'fail') {
      const message = result.message || result.error || t('request_failed');
      throw new Error(Array.isArray(message) ? message.join('，') : message);
    }
    return Object.prototype.hasOwnProperty.call(result, 'data') ? result.data : result;
  }

  function mockApi(path, options) {
    const now = Math.floor(Date.now() / 1000);
    const plans = [
      { id: 1, name: '轻量探索', transfer_enable: 120, speed_limit: 300, device_limit: 3, month_price: 1200, quarter_price: 3200, year_price: 9800, tags: ['入门', '稳定'], content: '适合轻量使用与日常浏览', show: true, sell: true },
      { id: 2, name: '星云畅享', transfer_enable: 500, speed_limit: null, device_limit: 8, month_price: 2600, quarter_price: 7200, year_price: 23800, tags: ['热门', '高速'], content: '全速线路与充足流量', show: true, sell: true },
      { id: 3, name: '无限引力', transfer_enable: 1200, speed_limit: null, device_limit: null, month_price: 4800, half_year_price: 25800, year_price: 44800, tags: ['大流量'], content: '为多设备与重度使用准备', show: true, sell: true }
    ];
    const docs = [
      { id: 1, category: '快速开始', title: '如何开始使用', body: '<h2>三步完成连接</h2><p>购买订阅后复制订阅链接，导入客户端并选择节点即可。</p><ol><li>购买适合的套餐</li><li>复制仪表盘中的订阅链接</li><li>导入客户端并更新订阅</li></ol>', updated_at: now },
      { id: 2, category: '常见问题', title: '订阅无法更新怎么办', body: '<p>请先确认套餐未到期，再尝试切换网络并重新更新订阅。</p>', updated_at: now - 86400 },
      { id: 3, category: '客户端', title: '设备与客户端说明', body: '<p>请使用服务商推荐的客户端，并避免公开分享订阅链接。</p>', updated_at: now - 86400 * 3 }
    ];
    const tickets = [{ id: 12, level: 1, reply_status: 1, status: 0, subject: '客户端连接问题', created_at: now - 7200, updated_at: now - 1800 }];
    const queryId = new URLSearchParams(path.split('?')[1] || '').get('id');
    const data = path.includes('/guest/comm/config') ? { app_description: '一个清爽、快速的网络服务中心', is_invite_force: 0, is_email_verify: 0, is_captcha: 1, captcha_type: 'turnstile' }
      : path.includes('/auth/forget') ? true
      : path.includes('/comm/sendEmailVerify') ? true
      : path.includes('/auth/login') || path.includes('/auth/register') ? { auth_data: 'Bearer preview-token', token: 'preview' }
      : path.includes('/user/info') ? { email: 'demo@argon-xboard.dev', balance: 2680, commission_balance: 0, expired_at: now + 86400 * 126, created_at: now - 86400 * 93, plan_id: 2, remind_expire: 1, remind_traffic: 0 }
      : path.includes('/getSubscribe') ? { plan_id: 2, u: 23 * 1024 ** 3, d: 172 * 1024 ** 3, transfer_enable: 500 * 1024 ** 3, expired_at: now + 86400 * 126, subscribe_url: 'https://example.com/s/nebula-preview', plan: plans[1], device_limit: 8, speed_limit: null, reset_day: 12 }
      : path.includes('/plan/fetch') ? plans
      : path.includes('/notice/fetch') ? [{ id: 1, title: '欢迎使用 Argon-Xboard', content: '全新用户中心已经准备就绪。你可以在订阅中心复制链接，或前往套餐页面续费。', created_at: now }]
      : path.includes('/order/fetch') ? [{ trade_no: '202606210001', status: 2, total_amount: 2600, period: 'month_price', created_at: now - 86400 * 4, plan: plans[1] }]
      : path.includes('/order/save') ? 'PREVIEW-ORDER-001'
      : path.includes('/getPaymentMethod') ? [{ id: 1, name: '演示支付', payment: 'demo' }]
      : path.includes('/order/checkout') ? { type: -1, data: true }
      : path.includes('/knowledge/fetch') ? (queryId ? docs.find(item => String(item.id) === queryId) : Object.values(docs.reduce((groups, item) => { (groups[item.category] ||= []).push(item); return groups; }, {})))
      : path.includes('/invite/fetch') ? { codes: [{ code: 'ARGON8X', pv: 4, status: 0, created_at: now - 86400 * 12 }], stat: [8, 3680, 1200, 10, 2480] }
      : path.includes('/invite/details') ? { data: [{ id: 1, commission_amount: 1280, created_at: now - 86400 * 2 }], total: 1 }
      : path.includes('/invite/save') ? true
      : path.includes('/server/fetch') ? [{ id: 1, type: 'shadowsocks', name: '香港 · 星港', rate: 1, tags: ['低延迟'], is_online: true, last_check_at: now }, { id: 2, type: 'vless', name: '日本 · 东京', rate: 1.2, tags: ['流媒体'], is_online: true, last_check_at: now }, { id: 3, type: 'trojan', name: '美国 · 洛杉矶', rate: 1.5, tags: ['大带宽'], is_online: false, last_check_at: now - 600 }]
      : path.includes('/ticket/fetch') ? (queryId ? Object.assign({}, tickets[0], { message: [{ id: 1, is_me: true, message: '导入订阅后无法连接，请协助检查。', created_at: now - 7200 }, { id: 2, is_me: false, message: '您好，请更新订阅后重新测试。', created_at: now - 1800 }] }) : tickets)
      : path.includes('/ticket/save') || path.includes('/ticket/reply') || path.includes('/ticket/close') ? true
      : path.includes('/stat/getTrafficLog') ? [{ d: 3.4 * 1024 ** 3, u: .8 * 1024 ** 3, record_at: now - 86400 * 2, server_rate: 1 }, { d: 6.2 * 1024 ** 3, u: 1.1 * 1024 ** 3, record_at: now - 86400, server_rate: 1.2 }, { d: 2.8 * 1024 ** 3, u: .5 * 1024 ** 3, record_at: now, server_rate: 1 }]
      : path.includes('/resetSecurity') ? true
      : path.includes('/changePassword') ? true
      : true;
    return new Promise(resolve => setTimeout(() => resolve(data), 180));
  }

  function saveAuth(auth) {
    state.auth = auth || '';
    localStorage.setItem(storageKey, state.auth);
  }
  function clearAuth() {
    state.auth = ''; state.user = null; state.subscribe = null;
    stopTicketPolling();
    localStorage.removeItem(storageKey);
  }
  function routeName() {
    return (location.hash.replace(/^#\/?/, '').split(/[?\/]/)[0] || (state.auth ? 'dashboard' : 'login')).toLowerCase();
  }
  function go(route) { location.hash = `#/${route}`; }
  function initials(email) { return (email || config.brandName || 'NX').slice(0, 2).toUpperCase(); }
  function bytes(value) {
    const size = Number(value || 0);
    if (size <= 0) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.min(Math.floor(Math.log(size) / Math.log(1024)), units.length - 1);
    return `${(size / 1024 ** i).toFixed(i > 2 ? 2 : 1)} ${units[i]}`;
  }
  function money(cents) { return `¥${(Number(cents || 0) / 100).toFixed(Number(cents || 0) % 100 ? 2 : 0)}`; }
  function date(value) {
    if (!value) return t('long_term');
    const stamp = Number(value) < 1e12 ? Number(value) * 1000 : Number(value);
    return new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(stamp));
  }
  function daysUntil(value) {
    if (!value) return null;
    const stamp = Number(value) < 1e12 ? Number(value) * 1000 : Number(value);
    const diff = Math.ceil((stamp - Date.now()) / 86400000);
    return diff > 0 ? diff : 0;
  }
  function daysUntilReset(resetDay) {
    if (!resetDay) return null;
    const now = new Date();
    const currentDay = now.getDate();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    let target = new Date(currentYear, currentMonth, Number(resetDay));
    if (currentDay > Number(resetDay)) target = new Date(currentYear, currentMonth + 1, Number(resetDay));
    return Math.ceil((target - now) / 86400000);
  }
  function toast(message, type = 'success', title = type === 'error' ? t('operation_failed') : t('operation_success')) {
    const node = document.createElement('div');
    node.className = `toast ${type}`;
    node.innerHTML = `${icon(type === 'error' ? 'info' : 'check')}<div><b>${e(title)}</b><p>${e(message)}</p></div>`;
    document.querySelector('.toast-stack').appendChild(node);
    setTimeout(() => node.remove(), 3600);
  }

  function nav(route, label, iconName) {
    const active = routeName() === route ? ' active' : '';
    return `<a class="nav-link${active}" href="#/${route}" data-nav="${route}">${icon(iconName)}<span>${label}</span></a>`;
  }

  function readTicketReadMap() {
    try {
      const raw = localStorage.getItem(ticketReadMapKey);
      const parsed = raw ? JSON.parse(raw) : {};
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (_) {
      return {};
    }
  }

  function writeTicketReadMap(map) {
    localStorage.setItem(ticketReadMapKey, JSON.stringify(map || {}));
  }

  function ticketId(ticket) {
    return String(ticket?.id ?? ticket?.ticket_id ?? '').trim();
  }

  function ticketTimeValue(value) {
    if (value === null || value === undefined || value === '') return 0;
    const asNum = Number(value);
    if (Number.isFinite(asNum) && asNum > 0) return asNum < 1e12 ? asNum * 1000 : asNum;
    const asDate = Date.parse(String(value));
    return Number.isFinite(asDate) ? asDate : 0;
  }

  function ticketMarker(ticket) {
    const parts = [
      ticket?.updated_at, ticket?.update_at,
      ticket?.reply_updated_at, ticket?.reply_at, ticket?.reply_time, ticket?.last_reply_at,
      ticket?.reply_last_id, ticket?.last_reply_id,
      ticket?.reply_status, ticket?.replyStatus,
      ticket?.reply_count, ticket?.replyCount,
      ticket?.created_at
    ].map(value => String(value ?? '').trim()).filter(Boolean);
    return parts.join('|') || ticketId(ticket);
  }

  function ticketReplyStatusLabel() {
    return /^zh/i.test(String(currentLang || '')) ? '回复状态' : 'Reply status';
  }

  function ticketRepliedText() {
    return /^zh/i.test(String(currentLang || '')) ? '已回复' : 'Replied';
  }

  function parseIsMeFlag(raw) {
    if (typeof raw === 'boolean') return raw;
    if (typeof raw === 'number') {
      if (raw === 1) return true;
      if (raw === 0) return false;
    }
    if (typeof raw === 'string') {
      const value = raw.trim().toLowerCase();
      if (['1', 'true', 'yes', 'y', 'user', 'me', 'client'].includes(value)) return true;
      if (['0', 'false', 'no', 'n', 'admin', 'support', 'staff', 'system'].includes(value)) return false;
    }
    return null;
  }

  function messageIsFromUser(message) {
    if (!message || typeof message !== 'object') return false;

    const currentUserId = Number(state?.user?.id ?? state?.user?.user_id ?? state?.user?.uid ?? 0);

    const adminId = Number(message?.admin_id ?? message?.adminId ?? message?.staff_id ?? message?.staffId ?? 0);
    if (Number.isFinite(adminId) && adminId > 0) return false;

    const userId = Number(message?.user_id ?? message?.userId ?? message?.uid ?? 0);
    if (Number.isFinite(userId) && userId > 0 && Number.isFinite(currentUserId) && currentUserId > 0 && userId !== currentUserId) return false;

    const adminBoolCandidates = [message?.is_admin, message?.isAdmin, message?.from_admin, message?.fromAdmin];
    for (const raw of adminBoolCandidates) {
      const parsed = parseIsMeFlag(raw);
      if (parsed !== null) return !parsed;
    }

    const senderRaw = String(message?.sender ?? message?.from ?? message?.sender_type_name ?? message?.senderTypeName ?? '').trim().toLowerCase();
    if (['admin', 'support', 'staff', 'system', 'service', '客服', '管理员'].includes(senderRaw)) return false;
    if (['user', 'client', 'member', 'customer', 'self', 'me', '用户'].includes(senderRaw)) return true;

    const directCandidates = [
      message?.is_me, message?.isMe,
      message?.from_me, message?.fromMe,
      message?.user_message, message?.userMessage,
      message?.is_user, message?.isUser,
      message?.from_user, message?.fromUser
    ];
    for (const raw of directCandidates) {
      const parsed = parseIsMeFlag(raw);
      if (parsed !== null) return parsed;
    }

    const roleRaw = String(message?.role ?? message?.sender_role ?? message?.senderRole ?? '').trim().toLowerCase();
    if (['user', 'client', 'member', 'customer', 'self', 'me'].includes(roleRaw)) return true;
    if (['admin', 'support', 'staff', 'system', 'service'].includes(roleRaw)) return false;

    const typeNum = Number(message?.type ?? message?.sender_type ?? message?.senderType);
    if (Number.isFinite(typeNum)) {
      if (typeNum === 0) return false;
      if (Number.isFinite(currentUserId) && currentUserId > 0 && typeNum === currentUserId) return true;
    }

    return false;
  }

  function ticketLastSpeaker(ticket) {
    if (!ticket || typeof ticket !== 'object') return null;

    const messages = Array.isArray(ticket?.message) ? ticket.message : [];
    if (messages.length) {
      const last = messages[messages.length - 1];
      return messageIsFromUser(last) ? 'user' : 'admin';
    }

    const speakerFlagCandidates = [
      ticket?.last_is_me, ticket?.lastIsMe,
      ticket?.reply_last_is_me, ticket?.replyLastIsMe,
      ticket?.last_reply_is_me, ticket?.lastReplyIsMe,
      ticket?.last_message_is_me, ticket?.lastMessageIsMe,
      ticket?.is_me, ticket?.isMe
    ];
    for (const raw of speakerFlagCandidates) {
      const parsed = parseIsMeFlag(raw);
      if (parsed !== null) return parsed ? 'user' : 'admin';
    }

    const statusRaw = ticket?.reply_status ?? ticket?.replyStatus;
    const statusNum = Number(statusRaw);
    if (Number.isFinite(statusNum)) {
      if (statusNum === 2) return 'user';
      if (statusNum > 0) return 'admin';
    }

    return null;
  }

  function ticketReplyState(ticket) {
    const speaker = ticketLastSpeaker(ticket);
    if (speaker === 'admin') return 'waiting';
    if (speaker === 'user') return 'replied';
    return hasTicketReply(ticket) ? 'waiting' : 'waiting';
  }

  function serverUnreadState(ticket) {
    const raw = ticket?.reply_status ?? ticket?.replyStatus ?? ticket?.is_reply ?? ticket?.isReply ?? ticket?.is_unread ?? ticket?.unread ?? ticket?.has_reply ?? ticket?.hasReply;
    if (typeof raw === 'boolean') return raw;
    if (typeof raw === 'number') return raw > 0;
    if (typeof raw === 'string') {
      const value = raw.trim();
      if (/^(1|true|yes|y)$/i.test(value)) return true;
      if (/^(0|false|no|n)$/i.test(value)) return false;
      const asNum = Number(value);
      if (Number.isFinite(asNum)) return asNum > 0;
      if (/^(new|reply|replied|unread)$/i.test(value)) return true;
    }
    return null;
  }

  function hasTicketReply(ticket) {
    const direct = serverUnreadState(ticket);
    if (direct !== null) return direct;
    const replyCount = Number(ticket?.reply_count ?? ticket?.replyCount ?? 0);
    if (Number.isFinite(replyCount) && replyCount > 0) return true;
    const messages = Array.isArray(ticket?.message) ? ticket.message : [];
    if (messages.some(message => !messageIsFromUser(message))) return true;
    const updated = ticketTimeValue(ticket?.updated_at ?? ticket?.update_at);
    const created = ticketTimeValue(ticket?.created_at);
    return updated > 0 && created > 0 && updated > created;
  }

  function isTicketUnread(ticket, readMap) {
    if (!hasTicketReply(ticket)) return false;
    if (ticketReplyState(ticket) !== 'waiting') return false;
    const id = ticketId(ticket);
    if (!id) return true;
    const map = readMap || readTicketReadMap();
    const marker = ticketMarker(ticket);
    return map[id] !== marker;
  }

  function markTicketReadById(idValue) {
    const id = String(idValue || '').trim();
    if (!id || !Array.isArray(state.tickets)) return;
    const ticket = state.tickets.find(item => ticketId(item) === id);
    if (!ticket) return;
    const map = readTicketReadMap();
    map[id] = ticketMarker(ticket);
    writeTicketReadMap(map);
  }

  function hasTicketNotify() {
    return unreadTicketCount() > 0;
  }

  function unreadTicketCount() {
    if (!Array.isArray(state.tickets)) return 0;
    const map = readTicketReadMap();
    return state.tickets.filter(item => isTicketUnread(item, map)).length;
  }

  function unreadTicketList(limit = 6) {
    if (!Array.isArray(state.tickets)) return [];
    const map = readTicketReadMap();
    return state.tickets
      .filter(item => isTicketUnread(item, map))
      .sort((a, b) => ticketTimeValue(b?.updated_at ?? b?.created_at) - ticketTimeValue(a?.updated_at ?? a?.created_at))
      .slice(0, Math.max(1, Number(limit) || 6));
  }

  function renderTicketNoticeDropdown(name) {
    const unread = unreadTicketList(8);
    const count = unreadTicketCount();
    const badge = count > 0 ? `<span class="notify-badge">${count > 99 ? '99+' : count}</span>` : '';
    const list = unread.length
      ? unread.map(item => {
        const id = ticketId(item);
        const subject = item?.subject || item?.title || (t('new_ticket') + ' #' + id);
        return `<button type="button" class="dropdown-item ticket-notice-item" data-action="open-ticket" data-id="${e(id)}"><b>${e(subject)}</b><small>#${e(id)} · ${date(item.updated_at || item.created_at)}</small></button>`;
      }).join('')
      : `<div class="ticket-notice-empty">${tx('tickets_none_sub')}</div>`;
    return `<div class="dropdown" data-dropdown="${e(name)}">
      <button class="icon-btn" type="button" data-dropdown-toggle="${e(name)}" aria-haspopup="true" aria-expanded="false" aria-label="${t('notifications')}">${icon('bell')}${badge}</button>
      <div class="dropdown-menu dropdown-menu-right ticket-notice-menu" data-dropdown-menu="${e(name)}">
        <div class="ticket-notice-head"><strong>${t('ticket_new_reply')}</strong><span>${count}</span></div>
        <div class="ticket-notice-list">${list}</div>
        <a class="dropdown-item ticket-notice-all" href="#/tickets">${icon('ticket')} ${t('nav_tickets')}</a>
      </div>
    </div>`;
  }

  function updateTicketNoticeDropdowns() {
    ['ticket-notice-mobile', 'ticket-notice-desktop'].forEach(name => {
      const root = document.querySelector(`[data-dropdown="${name}"]`);
      if (!root) return;
      const menu = root.querySelector(`[data-dropdown-menu="${name}"]`);
      const opened = Boolean(menu?.classList.contains('open'));
      root.outerHTML = renderTicketNoticeDropdown(name);
      if (opened) {
        const next = document.querySelector(`[data-dropdown-menu="${name}"]`);
        if (next) next.classList.add('open');
      }
    });
  }

  async function refreshTicketSnapshot(options = {}) {
    if (!state.auth) return;
    try {
      const list = await api('/user/ticket/fetch');
      state.tickets = Array.isArray(list) ? list : [];
      updateTicketNoticeDropdowns();
      if (options.refreshTicketsPage && routeName() === 'tickets' && !document.getElementById('global-dialog')?.open) {
        render();
      } else {
        refreshTicketsPageUnreadUi();
      }
    } catch (_) {}
  }

  function stopTicketPolling() {
    if (ticketPollTimer) {
      clearInterval(ticketPollTimer);
      ticketPollTimer = 0;
    }
  }

  async function startTicketPolling() {
    if (!state.auth) {
      stopTicketPolling();
      return;
    }
    await refreshTicketSnapshot();
    stopTicketPolling();
    ticketPollTimer = setInterval(() => { refreshTicketSnapshot({ refreshTicketsPage: true }); }, 30000);
  }

  function normalizeNoticeTags(tags) {
    if (Array.isArray(tags)) return tags.map(tag => String(tag || '').trim()).filter(Boolean);
    if (typeof tags === 'string') {
      const raw = tags.trim();
      if (!raw) return [];
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed.map(tag => String(tag || '').trim()).filter(Boolean);
      } catch (_) {}
      return raw.split(/[，,|/\s]+/).map(tag => String(tag || '').trim()).filter(Boolean);
    }
    return [];
  }

  function noticeId(notice) {
    return String(notice?.id ?? notice?.notice_id ?? notice?.created_at ?? notice?.title ?? '').trim();
  }

  function noticeBody(notice) {
    return notice?.content || notice?.body || notice?.message || '';
  }

  function noticeTitle(notice) {
    return notice?.title || tx('notice_popup_title');
  }

  function readSeenNotices() {
    try {
      const raw = localStorage.getItem(noticeSeenKey);
      const parsed = raw ? JSON.parse(raw) : {};
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (_) {
      return {};
    }
  }

  function writeSeenNotices(map) {
    localStorage.setItem(noticeSeenKey, JSON.stringify(map || {}));
  }

  function isNoticeSeen(notice) {
    const id = noticeId(notice);
    if (!id) return false;
    const map = readSeenNotices();
    return Boolean(map[id]);
  }

  function markNoticeSeen(notice) {
    const id = noticeId(notice);
    if (!id) return;
    const map = readSeenNotices();
    map[id] = Date.now();
    writeSeenNotices(map);
  }

  function hasUnreadNotice() {
    return Array.isArray(state.notices) && state.notices.some(item => !isNoticeSeen(item));
  }

  function isPopupNotice(notice) {
    const tags = normalizeNoticeTags(notice?.tags);
    return tags.some(tag => /^(弹窗|popup|modal)$/i.test(tag));
  }

  function openNoticeDialog(notice) {
    if (!notice) return;
    markNoticeSeen(notice);
    const dialog = document.getElementById('global-dialog');
    const title = noticeTitle(notice);
    const body = noticeBody(notice);
    dialog.innerHTML = '<div class="dialog-head"><div><h3>' + e(title) + '</h3><small>' + date(notice?.created_at) + '</small></div><button class="icon-btn" data-action="close-dialog">' + icon('close') + '</button></div><article class="dialog-body rich-text">' + renderAnnouncementContent(body || ('<p>' + tx('no_content') + '</p>')) + '</article>';
    dialog.showModal();
  }

  async function openNoticeCenter() {
    if (!Array.isArray(state.notices) || !state.notices.length) {
      try {
        const list = await api('/user/notice/fetch');
        state.notices = Array.isArray(list) ? list : [];
      } catch (_) {}
    }
    if (!state.notices.length) {
      toast(tx('notice_empty'));
      return;
    }
    state.notices.forEach(markNoticeSeen);
    const dialog = document.getElementById('global-dialog');
    const cards = state.notices.map(item => '<article class="notice-card"><div class="notice-card-head"><strong>' + e(noticeTitle(item)) + '</strong><small>' + date(item?.created_at) + '</small></div><div class="notice-card-body rich-text">' + renderAnnouncementContent(noticeBody(item) || ('<p>' + tx('no_content') + '</p>')) + '</div></article>').join('');
    dialog.innerHTML = '<div class="dialog-head"><div><h3>' + tx('notice_center_title') + '</h3><small>' + tx('notice_center_sub') + '</small></div><button class="icon-btn" data-action="close-dialog">' + icon('close') + '</button></div><div class="dialog-body notice-list">' + cards + '</div>';
    dialog.showModal();
    if (!hasTicketNotify()) {
      document.querySelectorAll('.icon-btn.has-notify').forEach(btn => btn.classList.remove('has-notify'));
    }
  }

  function maybeOpenPopupNotice() {
    if (!Array.isArray(state.notices) || !state.notices.length) return;
    const next = state.notices.find(item => isPopupNotice(item) && !isNoticeSeen(item));
    if (next) openNoticeDialog(next);
  }

  function shell(content, title, subtitle = '') {
    const user = state.user || {};
    return `<div class="app-shell">
      <aside class="sidebar">
        ${brand()}
        <nav class="nav" aria-label="${t('nav_main')}">
          ${nav('dashboard', t('nav_dashboard'), 'dashboard')}
          ${nav('docs', t('nav_docs'), 'docs')}
          <p class="nav-label">${t('nav_subscription')}</p>
          ${nav('nodes', t('nav_nodes'), 'nodes')}
          ${nav('plans', t('nav_plans'), 'plans')}
          <p class="nav-label">${t('nav_finance')}</p>
          ${nav('orders', t('nav_orders'), 'orders')}
          ${nav('invites', t('nav_invites'), 'invite')}
          <p class="nav-label">${t('nav_user')}</p>
          ${nav('account', t('nav_account'), 'user')}
          ${nav('tickets', t('nav_tickets'), 'ticket')}
          ${nav('traffic', t('nav_traffic'), 'chart')}
        </nav>
        <div class="sidebar-bottom">
          ${config.supportUrl ? `<div class="support-card"><b>${t('help_title')}</b><p>${t('help_text')}</p><a class="btn btn-secondary btn-sm" href="${e(config.supportUrl)}" target="_blank" rel="noopener">${icon('support')} ${t('help_contact')}</a></div>` : ''}
          <button class="nav-link" type="button" data-action="logout">${icon('logout')}<span>${t('logout')}</span></button>
        </div>
      </aside>
      <main class="main">
        <div class="mobile-brand">
          <button class="icon-btn mobile-menu-trigger" type="button" data-action="open-mobile-menu" aria-label="${t('nav_main')}">${icon('menu')}</button>
          ${brand()}
          <div class="topbar-actions mobile-topbar-actions">
            <div class="dropdown" data-dropdown="lang-mobile">
              <button class="topbar-btn" type="button" data-dropdown-toggle="lang-mobile" aria-haspopup="true" aria-expanded="false">${icon('globe')}<span>${e((langList.find(l => l.code === state.lang) || {}).name || t('lang_zh_CN'))}</span></button>
              <div class="dropdown-menu dropdown-menu-right" data-dropdown-menu="lang-mobile">${langList.map(l => `<button type="button" class="dropdown-item ${l.code === state.lang ? 'active' : ''}" data-action="set-lang" data-lang="${e(l.code)}">${e(l.name)}</button>`).join('')}</div>
            </div>
            <button class="icon-btn" data-action="theme" aria-label="${t('theme_toggle')}">${icon(document.documentElement.dataset.theme === 'dark' ? 'sun' : 'moon')}</button>
            ${renderTicketNoticeDropdown('ticket-notice-mobile')}
            <div class="dropdown" data-dropdown="user-mobile">
              <button class="avatar" type="button" data-dropdown-toggle="user-mobile" aria-haspopup="true" aria-expanded="false" title="${e(user.email || '')}">${e(initials(user.email))}</button>
              <div class="dropdown-menu dropdown-menu-right" data-dropdown-menu="user-mobile">
                <a class="dropdown-item" href="#/account">${icon('user')} ${t('account_center')}</a>
                <button type="button" class="dropdown-item" data-action="logout">${icon('logout')} ${t('logout_action')}</button>
              </div>
            </div>
          </div>
        </div>
        <div class="mobile-menu-backdrop" data-action="close-mobile-menu"></div>
        <aside class="mobile-menu-drawer" aria-label="${t('nav_main')}">
          <div class="mobile-menu-head">
            ${brand()}
            <button class="icon-btn" type="button" data-action="close-mobile-menu" aria-label="${tx('close')}">${icon('close')}</button>
          </div>
          <nav class="nav" aria-label="${t('nav_main')}">
            ${nav('dashboard', t('nav_dashboard'), 'dashboard')}
            ${nav('docs', t('nav_docs'), 'docs')}
            <p class="nav-label">${t('nav_subscription')}</p>
            ${nav('nodes', t('nav_nodes'), 'nodes')}
            ${nav('plans', t('nav_plans'), 'plans')}
            <p class="nav-label">${t('nav_finance')}</p>
            ${nav('orders', t('nav_orders'), 'orders')}
            ${nav('invites', t('nav_invites'), 'invite')}
            <p class="nav-label">${t('nav_user')}</p>
            ${nav('account', t('nav_account'), 'user')}
            ${nav('tickets', t('nav_tickets'), 'ticket')}
            ${nav('traffic', t('nav_traffic'), 'chart')}
          </nav>
          <div class="sidebar-bottom">
            ${config.supportUrl ? `<div class="support-card"><b>${t('help_title')}</b><p>${t('help_text')}</p><a class="btn btn-secondary btn-sm" href="${e(config.supportUrl)}" target="_blank" rel="noopener">${icon('support')} ${t('help_contact')}</a></div>` : ''}
            <button class="nav-link" type="button" data-action="logout">${icon('logout')}<span>${t('logout')}</span></button>
          </div>
        </aside>
        <header class="topbar">
          <div class="topbar-title"><strong>${e(title)}</strong><span>${e(subtitle || config.tagline)}</span></div>
          <div class="topbar-actions">
            <div class="dropdown" data-dropdown="lang-desktop">
              <button class="topbar-btn" type="button" data-dropdown-toggle="lang-desktop" aria-haspopup="true" aria-expanded="false">${icon('globe')}<span>${e((langList.find(l => l.code === state.lang) || {}).name || t('lang_zh_CN'))}</span></button>
              <div class="dropdown-menu" data-dropdown-menu="lang-desktop">${langList.map(l => `<button type="button" class="dropdown-item ${l.code === state.lang ? 'active' : ''}" data-action="set-lang" data-lang="${e(l.code)}">${e(l.name)}</button>`).join('')}</div>
            </div>
            <button class="icon-btn" data-action="theme" aria-label="${t('theme_toggle')}">${icon(document.documentElement.dataset.theme === 'dark' ? 'sun' : 'moon')}</button>
            ${renderTicketNoticeDropdown('ticket-notice-desktop')}
            <div class="dropdown" data-dropdown="user-desktop">
              <button class="avatar" type="button" data-dropdown-toggle="user-desktop" aria-haspopup="true" aria-expanded="false" title="${e(user.email || '')}">${e(initials(user.email))}</button>
              <div class="dropdown-menu dropdown-menu-right" data-dropdown-menu="user-desktop">
                <a class="dropdown-item" href="#/account">${icon('user')} ${t('account_center')}</a>
                <button type="button" class="dropdown-item" data-action="logout">${icon('logout')} ${t('logout_action')}</button>
              </div>
            </div>
          </div>
        </header>
        <div class="content">${content}</div>
      </main>
      <nav class="mobile-nav" aria-label="${t('mobile_nav')}">
        ${nav('dashboard', t('mobile_home'), 'dashboard')}${nav('plans', t('nav_subscription'), 'plans')}${nav('docs', t('mobile_docs'), 'docs')}${nav('tickets', t('mobile_ticket'), 'ticket')}${nav('account', t('mobile_me'), 'user')}
      </nav>
    </div>`;
  }

  function authVisual() {
    return `<aside class="auth-visual" aria-hidden="true">
      <div class="orbit"></div>
      <div class="visual-copy"><span class="visual-kicker">● LIVE NETWORK</span><h2>${e(config.tagline)}</h2><p>${e(state.guest.app_description || config.description || t('app_desc_default'))}</p><div class="visual-stats"><div><b>99.9%</b><span>${t('visual_uptime')}</span></div><div><b>24/7</b><span>${t('visual_connect')}</span></div><div><b>1-Click</b><span>${t('visual_subscribe')}</span></div></div></div>
    </aside>`;
  }

  function authPage(mode) {
    const register = mode === 'register';
    const guest = state.guest || {};
    const captchaEnabled = isCaptchaEnabledForMode(mode, guest);
    const emailVerify = register && Number(guest.is_email_verify) === 1;
    const inviteForce = register && Number(guest.is_invite_force) === 1;
    const urlCode = register ? (new URLSearchParams((location.hash.split('?')[1] || '')).get('code') || '') : '';
    const authFields = register ? `
      <div class="field"><label for="invite_code">${t('invite_code')}${inviteForce ? '' : t('optional')}</label><input class="input" id="invite_code" name="invite_code" autocomplete="off" ${inviteForce ? 'required' : ''} value="${e(urlCode)}" placeholder="${inviteForce ? t('invite_placeholder') : t('invite_optional_ph')}"></div>
      ${emailVerify ? `<div class="field"><label for="email_code">${t('email_code')}</label><div class="verify-row"><input class="input" id="email_code" name="email_code" inputmode="numeric" maxlength="6" required placeholder="${t('code_placeholder')}"><button class="btn btn-secondary" type="button" data-action="send-code">${t('send_code')}</button></div></div>` : ''}` : '';
    app.innerHTML = `<div class="auth-shell">
      <section class="auth-panel">
        ${brand()}
        <div class="auth-main">
          <p class="eyebrow">${register ? 'Create account' : 'Welcome back'}</p>
          <h1>${register ? t('auth_create') : t('auth_welcome')}</h1>
          <p>${register ? t('auth_create_sub') : e(guest.app_description || config.description || t('auth_welcome_sub'))}</p>
          <form class="form" id="auth-form" data-mode="${mode}">
            <div class="field"><label for="email">${t('email')}</label><div class="input-wrap">${icon('mail')}<input class="input" id="email" name="email" type="email" autocomplete="email" required placeholder="name@example.com"></div></div>
            <div class="field"><label for="password">${t('password')}</label><div class="input-wrap">${icon('lock')}<input class="input" id="password" name="password" type="password" minlength="8" autocomplete="${register ? 'new-password' : 'current-password'}" required placeholder="${t('password_min')}"></div></div>
            ${authFields}
            ${captchaEnabled ? '<div id="captcha-box"></div>' : ''}
            ${!register ? `<div class="form-meta"><label class="check"><input type="checkbox" checked> ${t('remember')}</label><a class="text-link" href="#/forgot">${t('forgot_password')}</a></div>` : `<p class="field-hint">${t('register_agree')}</p>`}
            <button class="btn btn-primary btn-block" type="submit">${register ? t('register_submit') : t('login_submit')} ${icon('arrow')}</button>
          </form>
          <p class="field-hint" style="margin-top:20px;text-align:center">${register ? `${t('has_account')} <a class="text-link" href="#/login">${t('direct_login')}</a>` : `${t('no_account')} <a class="text-link" href="#/register">${t('free_register')}</a>`}</p>
        </div>
        <div class="auth-footer">${e(config.footerText)}</div>
      </section>
      ${authVisual()}
    </div>`;
    mountCaptcha(mode);
  }

  function forgotPage() {
    app.innerHTML = `<div class="auth-shell">
      <section class="auth-panel">
        ${brand()}
        <div class="auth-main">
          <p class="eyebrow">Reset password</p>
          <h1>${t('reset_password')}</h1>
          <p>${t('forgot_desc')}</p>
          <form class="form" id="forgot-form">
            <div class="field"><label for="email">${t('email')}</label><div class="input-wrap">${icon('mail')}<input class="input" id="email" name="email" type="email" autocomplete="email" required placeholder="name@example.com"></div></div>
            <div class="field"><label for="email_code">${t('email_code')}</label><div class="verify-row"><input class="input" id="email_code" name="email_code" inputmode="numeric" maxlength="6" required placeholder="${t('code_placeholder')}"><button class="btn btn-secondary" type="button" data-action="send-code">${t('send_code')}</button></div></div>
            <div class="field"><label for="password">${t('new_password')}</label><div class="input-wrap">${icon('lock')}<input class="input" id="password" name="password" type="password" minlength="8" autocomplete="new-password" required placeholder="${t('password_min')}"></div></div>
            <div class="field"><label for="password_confirmation">${t('confirm_password')}</label><div class="input-wrap">${icon('lock')}<input class="input" id="password_confirmation" name="password_confirmation" type="password" minlength="8" autocomplete="new-password" required placeholder="${t('confirm_password_ph')}"></div></div>
            <button class="btn btn-primary btn-block" type="submit">${t('reset_password')} ${icon('arrow')}</button>
          </form>
          <p class="field-hint" style="margin-top:20px;text-align:center">${t('remember_password')} <a class="text-link" href="#/login">${t('back_login')}</a></p>
        </div>
        <div class="auth-footer">${e(config.footerText)}</div>
      </section>
      ${authVisual()}
    </div>`;
  }

  async function mountCaptcha(mode = 'register') {
    const guest = state.guest || {};
    if (!isCaptchaEnabledForMode(mode, guest)) return;
    const box = document.getElementById('captcha-box');
    if (!box) return;
    if (isPreview) {
      box.innerHTML = `<label class="mock-turnstile"><span class="mock-turnstile-main"><input type="checkbox" id="mock-captcha-cb"> ${t('captcha_human')}</span><span class="mock-turnstile-logo"><b>CLOUDFLARE</b><small>Privacy · Help</small></span></label>`;
      const cb = box.querySelector('#mock-captcha-cb');
      if (cb) cb.addEventListener('change', () => { state.captchaToken = cb.checked ? 'preview-captcha' : ''; });
      return;
    }
    box.innerHTML = `<p class="field-hint">${t('captcha_loading')}</p>`;
    try {
      if (guest.captcha_type === 'turnstile') {
        await loadScript('https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit');
        box.innerHTML = '';
        window.turnstile.render(box, { sitekey: guest.turnstile_site_key, callback: token => { state.captchaToken = token; }, 'expired-callback': () => { state.captchaToken = ''; } });
      } else if (guest.captcha_type === 'recaptcha-v3') {
        await loadScript(`https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(guest.recaptcha_v3_site_key)}`);
        box.innerHTML = `<p class="field-hint">${t('captcha_recaptcha')}</p>`;
      } else {
        await loadScript('https://www.google.com/recaptcha/api.js?render=explicit');
        box.innerHTML = '';
        window.grecaptcha.render(box, { sitekey: guest.recaptcha_site_key, callback: token => { state.captchaToken = token; } });
      }
    } catch { box.innerHTML = `<p class="field-hint" style="color:var(--danger)">${t('captcha_failed')}</p>`; }
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const existing = [...document.scripts].find(s => s.src === src);
      if (existing) return resolve();
      const script = document.createElement('script'); script.src = src; script.async = true;
      script.onload = resolve; script.onerror = reject; document.head.appendChild(script);
    });
  }

  async function captchaPayload(action = 'register') {
    const guest = state.guest || {};
    if (!isCaptchaEnabledForMode(action, guest)) return {};
    if (!document.getElementById('captcha-box')) return {};
    if (guest.captcha_type === 'recaptcha-v3') {
      const token = await window.grecaptcha.execute(guest.recaptcha_v3_site_key, { action });
      return { recaptcha_v3_token: token };
    }
    if (!state.captchaToken) throw new Error(t('captcha_required'));
    return guest.captcha_type === 'turnstile' ? { turnstile_token: state.captchaToken } : { recaptcha_data: state.captchaToken };
  }

  function pageHead(kicker, title, desc, action = '') {
    return `<div class="dashboard-header"><div class="dashboard-header-body"><div><p class="eyebrow">${e(kicker)}</p><h1>${e(title)}</h1><p>${e(desc)}</p></div>${action || ''}</div></div>`;
  }

  async function renderDashboard(id) {
    app.innerHTML = shell(`<div class="dashboard-header"><div class="dashboard-header-body"><div><p class="eyebrow">${e(t('nav_dashboard'))}</p><h1>${e(t('nav_dashboard'))}</h1><p>${e(t('dashboard_loading'))}</p></div></div></div><div class="grid grid-4"><div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div></div>`, t('nav_dashboard'));
    try {
      const [user, subscribe, notices] = await Promise.all([
        api('/user/info'), api('/user/getSubscribe'), api('/user/notice/fetch').catch(() => [])
      ]);
      if (id !== state.renderId) return;
      state.user = user; state.subscribe = subscribe; state.notices = Array.isArray(notices) ? notices : [];
      maybeOpenPopupNotice();
      const used = Number(subscribe.u || 0) + Number(subscribe.d || 0);
      const total = Number(subscribe.transfer_enable || 0);
      const percent = total ? Math.min(100, Math.round(used / total * 100)) : 0;
      const remaining = Math.max(0, total - used);
      const planName = subscribe.plan?.name || t('no_subscribe');
      const expireDays = daysUntil(subscribe.expired_at);
      const resetDays = daysUntilReset(subscribe.reset_day);
      const expireMeta = subscribe.expired_at
        ? `${t('expires_at').replace('{date}', date(subscribe.expired_at))}，${t('expires_days_remaining').replace('{days}', expireDays)}${resetDays !== null ? `，${t('reset_days').replace('{days}', resetDays)}` : ''}`
        : t('no_active_subscribe');
      const firstName = (user.email || t('nav_user')).split('@')[0];
      const announcement = config.announcement || state.notices[0]?.content || '';
      const content = `<div class="dashboard-header">
        <div class="dashboard-header-body">
          <div>
            <p class="eyebrow">${t('nav_dashboard')}</p>
            <h1>${t('dashboard_greeting')}${e(firstName)}</h1>
            <p>${t('dashboard_subtitle')}</p>
          </div>
          <a class="btn btn-light" href="#/plans">${t('view_plan')}</a>
        </div>
      </div>
      ${announcement ? `<div class="announcement">${icon('bell')}<p class="announcement-content">${renderAnnouncementContent(announcement)}</p></div>` : ''}
      <div class="grid grid-4">
        ${statCard('wifi', planName, t('current_subscribe'), 'bg-gradient-primary')}
        ${statCard('chart', bytes(remaining), t('remaining_traffic'), 'bg-gradient-success')}
        ${statCard('calendar', date(subscribe.expired_at), t('subscribe_expire'), 'bg-gradient-info')}
        ${statCard('wallet', money(user.balance), t('account_balance'), 'bg-gradient-warning')}
      </div>
      <div class="grid dashboard-main-grid" style="margin-top:24px">
        <section class="card subscription-card">
          <div class="card-body">
            <h2 class="subscription-title">${t('my_subscribe')}</h2>
            <h3 class="subscription-plan-name">${e(planName)}</h3>
            <p class="subscription-meta">${e(expireMeta)}</p>
            <div class="subscription-progress-row">
              <span class="subscription-tag">${t('used_traffic')}</span>
              <span class="subscription-percent">${percent}%</span>
            </div>
            <div class="progress subscription-progress"><span style="width:${percent}%"></span></div>
            <p class="subscription-usage">${t('used')} ${bytes(used)} / ${t('total')} ${bytes(total)}</p>
            ${renderQuickSubscribeModule(subscribe)}
          </div>
        </section>
        <section class="card subscribe-card">
          <div class="card-header"><div><h2>${t('subscribe_url')}</h2><p>${t('subscribe_url_sub')}</p></div></div>
          <div class="card-body">
            <div class="subscribe-box">
              <span class="subscribe-url">${e(subscribe.subscribe_url || t('no_subscribe_url'))}</span>
              <button class="btn btn-primary btn-sm" data-action="copy-sub" ${subscribe.subscribe_url ? '' : 'disabled'}>${icon('copy')} ${t('copy')}</button>
            </div>
            <div class="info-list">
              <div class="info-item"><span>${t('device_count')}</span><b>${subscribe.device_limit || t('unlimited')}</b></div>
              <div class="info-item"><span>${t('speed_limit')}</span><b>${subscribe.speed_limit ? `${e(subscribe.speed_limit)} Mbps` : t('unlimited_speed')}</b></div>
              <div class="info-item"><span>${t('subscribe_status')}</span><b><span class="status success">${t('status_normal')}</span></b></div>
            </div>
            <div class="subscribe-reset-card">
              <div class="subscribe-reset-copy">
                <b>${t('reset_subscribe')}</b>
                <p>${t('reset_hint')}</p>
              </div>
              <button class="btn btn-secondary btn-sm" data-action="reset-subscribe" ${subscribe.subscribe_url ? '' : 'disabled'}>${icon('refresh')} ${t('reset_subscribe')}</button>
            </div>
          </div>
        </section>
      </div>`;
      app.innerHTML = shell(content, t('nav_dashboard'), config.tagline);
    } catch (error) { renderError(error); }
  }

  async function renderPlans(id) {
    app.innerHTML = shell(`${pageHead(t('nav_plans'), t('plans_title'), t('plans_sub'))}<div class="plan-grid"><div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div></div>`, t('nav_plans'));
    try {
      const plans = await api(state.auth ? '/user/plan/fetch' : '/guest/plan/fetch');
      if (id !== state.renderId) return;
      state.plans = (Array.isArray(plans) ? plans : []).filter(plan => plan.show !== false);
      const cards = state.plans.map((plan, index) => planCard(plan, index === 1)).join('');
      const content = `${pageHead(t('nav_plans'), t('plans_title'), t('plans_period_tip'))}<div class="plan-grid">${cards || empty(t('plans_none'), t('plans_none_sub'))}</div>`;
      app.innerHTML = shell(content, t('nav_plans'));
    } catch (error) { renderError(error); }
  }

  function planCard(plan, featured) {
    const prices = ['month_price', 'quarter_price', 'half_year_price', 'year_price', 'two_year_price', 'three_year_price', 'onetime_price', 'reset_price'].filter(key => Number(plan[key]) > 0);
    const first = prices[0];
    const tags = Array.isArray(plan.tags) ? plan.tags : [];
    return `<article class="card plan-card ${featured ? 'featured' : ''}">
      <div class="plan-card-top"></div>
      <div class="plan-card-body">
        <h2 class="plan-name">${e(plan.name)}</h2><div class="plan-tags">${tags.map(tag => `<span class="tag">${e(tag)}</span>`).join('')}</div>
        <div class="plan-price">${first ? `<b>${money(plan[first])}</b><span> / ${e(periodLabel(first))}</span>` : '<b>—</b>'}</div>
        <ul class="plan-features"><li>${icon('check')} ${e(plan.transfer_enable || 0)} GB ${tx('plan_traffic')}</li><li>${icon('check')} ${plan.speed_limit ? `${e(plan.speed_limit)} Mbps` : t('unlimited_speed')} ${tx('plan_network')}</li><li>${icon('check')} ${plan.device_limit ? tx('plan_devices').replace('{count}', e(plan.device_limit)) : tx('plan_unlimited_devices')}</li><li>${icon('check')} ${e(plan.content || t('plan_feature'))}</li></ul>
        <button class="btn ${featured ? 'btn-primary' : 'btn-secondary'}" data-action="purchase" data-plan="${e(plan.id)}" ${plan.sell === false || !prices.length ? 'disabled' : ''}>${t('select_plan')} ${icon('arrow')}</button>
      </div>
    </article>`;
  }

  async function renderOrders(id) {
    app.innerHTML = shell(`${pageHead(t('nav_orders'), t('nav_orders'), t('orders_title'))}<div class="card skeleton"></div>`, t('nav_orders'));
    try {
      const orders = await api('/user/order/fetch');
      if (id !== state.renderId) return;
      state.orders = Array.isArray(orders) ? orders : [];
      const totalPaid = state.orders.filter(o => Number(o.status) === 2).reduce((s, o) => s + Number(o.total_amount || 0), 0);
      const pendingCount = state.orders.filter(o => Number(o.status) === 0).length;
      const rows = state.orders.map(order => {
        const status = orderStatusLabel(order.status);
        return `<tr><td><strong>${e(order.plan?.name || tx('subscription_plan'))}</strong><br><small>${e(order.trade_no || '')}</small></td><td>${e(periodLabel(order.period))}</td><td>${money(order.total_amount)}</td><td>${date(order.created_at)}</td><td><span class="status ${status[1]}">${status[0]}</span></td><td>${Number(order.status) === 0 ? `<button class="btn btn-ghost btn-sm" data-action="cancel-order" data-trade="${e(order.trade_no)}">${t('cancel')}</button>` : '—'}</td></tr>`;
      }).join('');
      const content = `${pageHead(t('nav_orders'), t('nav_orders'), tx('orders_subtitle'), `<a class="btn btn-ticket-cta" href="#/plans">${icon('plans')}<span>${t('buy_plan')}</span></a>`)}
        <div class="grid grid-4" style="margin-bottom:24px">
          ${statCard('orders', state.orders.length, t('total_orders'), 'bg-gradient-info')}
          ${statCard('wallet', money(totalPaid), t('paid_amount'), 'bg-gradient-success')}
          ${statCard('calendar', pendingCount, t('pending_orders'), 'bg-gradient-warning')}
          ${statCard('chart', state.orders.filter(o => Number(o.status) === 2).length, t('completed_orders'), 'bg-gradient-primary')}
        </div>
        <section class="card">${rows ? `<div class="table-wrap"><table class="table"><thead><tr><th>${t('order')}</th><th>${t('period')}</th><th>${t('amount')}</th><th>${t('create_time')}</th><th>${t('status')}</th><th>${t('action')}</th></tr></thead><tbody>${rows}</tbody></table></div>` : empty(tx('orders_none_title'), t('orders_empty'))}</section>`;
      app.innerHTML = shell(content, t('nav_orders'));
    } catch (error) { renderError(error); }
  }

  function docsHeader() {
    const value = e(state.docSearch || '');
    return pageHead(t('nav_docs'), t('nav_docs'), tx('docs_subtitle'), `<div class="docs-search"><input type="text" class="input" placeholder="${t('search_placeholder')}" data-action="search-docs" value="${value}"></div>`);
  }

  function renderDocList(id) {
    const term = (state.docSearch || '').toLowerCase();
    const filtered = state.docs.filter(article => !term || (article.title || '').toLowerCase().includes(term) || (article.category || '').toLowerCase().includes(term));
    const byCategory = filtered.reduce((all, article) => { (all[article.category || t('docs_guide')] ||= []).push(article); return all; }, {});
    const sections = Object.entries(byCategory).map(([category, articles]) => `<section class="card doc-category">
      <div class="card-header"><h2>${e(category)}</h2><span>${articles.length} ${tx('docs_articles')}</span></div>
      <div class="card-body doc-list">
        ${articles.map(article => `<div class="doc-item">
          <div class="doc-icon">${icon('docs')}</div>
          <div class="doc-info"><b>${e(article.title)}</b><small>${tx('docs_updated')}：${date(article.updated_at)}</small></div>
          <button class="btn btn-primary btn-sm" data-action="open-doc" data-id="${e(article.id)}">${tx('view_detail')}</button>
        </div>`).join('')}
      </div>
    </section>`).join('');
    const content = `${docsHeader()}<div class="docs-content">${sections || empty(term ? t('docs_no_match') : t('docs_none'), term ? t('docs_try') : t('docs_admin_none'))}</div>`;
    app.innerHTML = shell(content, t('nav_docs'));
    const input = app.querySelector('[data-action="search-docs"]');
    if (input) {
      input.focus();
      const len = input.value.length;
      input.setSelectionRange(len, len);
    }
  }

  async function renderDocs(id) {
    app.innerHTML = shell(`${docsHeader()}<div class="docs-content"><div class="skeleton" style="min-height:300px"></div></div>`, t('nav_docs'));
    try {
      if (!state.docs.length) {
        const result = await api(`/user/knowledge/fetch?language=${encodeURIComponent(state.lang || 'zh-CN')}`);
        if (id !== state.renderId) return;
        const groups = Array.isArray(result) ? result : Object.values(result || {});
        state.docs = groups.flatMap(group => Array.isArray(group) ? group : [group]).filter(Boolean);
      }
      if (id !== state.renderId) return;
      renderDocList(id);
    } catch (error) { renderError(error); }
  }

  async function renderInvites(id) {
    app.innerHTML = shell(`${pageHead(t('nav_invites'), t('nav_invites'), t('invites_title'))}<div class="grid grid-4"><div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div></div>`, t('nav_invites'));
    try {
      const invite = await api('/user/invite/fetch');
      if (id !== state.renderId) return;
      state.invite = invite || { codes: [], stat: [] };
      const stat = state.invite.stat || [];
      const codes = Array.isArray(state.invite.codes) ? state.invite.codes : [];
      const rows = codes.map(item => { const link = `${location.origin}/#/register?code=${encodeURIComponent(item.code)}`; return `<tr><td><strong>${e(item.code)}</strong></td><td>${e(item.pv || 0)}</td><td>${date(item.created_at)}</td><td><button class="btn btn-secondary btn-sm" data-action="copy-invite" data-link="${e(link)}">${icon('copy')} ${t('copy_link')}</button></td></tr>`; }).join('');
      const content = `${pageHead(t('nav_invites'), t('nav_invites'), t('invites_sub'), `<button class="btn btn-ticket-cta" data-action="generate-invite">${icon('invite')}<span>${t('generate_code')}</span></button>`)}
        <div class="grid grid-4">
          ${statCard('invite', e(stat[0] || 0), t('registered_users'), 'bg-gradient-primary')}
          ${statCard('wallet', money(stat[1]), t('valid_commission'), 'bg-gradient-success')}
          ${statCard('calendar', money(stat[2]), t('pending_commission'), 'bg-gradient-info')}
          ${statCard('chart', `${e(stat[3] || 0)}%`, t('commission_rate'), 'bg-gradient-warning')}
        </div>
        <section class="card" style="margin-top:24px">${rows ? `<div class="table-wrap"><table class="table"><thead><tr><th>${t('invite_code_label')}</th><th>${t('visits')}</th><th>${t('create_time')}</th><th>${t('action')}</th></tr></thead><tbody>${rows}</tbody></table></div>` : empty(t('invites_empty'), t('invites_empty_sub'))}</section>`;
      app.innerHTML = shell(content, t('nav_invites'));
    } catch (error) { renderError(error); }
  }

  // Region flag resolver (based on Bob-Theme-Argon node naming habits).
  // Returns ASCII file codes to avoid non-ASCII filename compatibility issues on some servers.
  function regionFlag(node) {
    const raw = String((node && (node.name || node.server_name || node.region || '')) || '');
    const name = raw.toLowerCase();
    const map = [
      ['hk', /(香港|hong\s*kong|\bhk\b)/i],
      ['us', /(美国|美國|united\s*states|\busa\b|\bus\b)/i],
      ['jp', /(日本|japan|\bjp\b)/i],
      ['cn', /(中国|中國|china|\bcn\b)/i],
      ['ru', /(俄罗斯|俄羅斯|russia|\bru\b)/i],
      ['kr', /(韩国|韓國|korea|\bkr\b)/i],
      ['gb', /(英国|英國|uk|united\s*kingdom|great\s*britain|\bgb\b)/i],
      ['sg', /(新加坡|singapore|\bsg\b)/i],
      ['my', /(马来西亚|馬來西亞|malaysia|\bmy\b)/i],
      ['tw', /(台湾|台灣|taiwan|\btw\b)/i],
      ['ca', /(加拿大|canada|\bca\b)/i],
      ['ph', /(菲律宾|菲律賓|philippines|\bph\b)/i],
      ['de', /(德国|德國|germany|\bde\b)/i],
      ['in', /(印度|india|\bin\b)/i],
      ['za', /(南非|south\s*africa|\bza\b)/i],
      ['lu', /(卢森堡|盧森堡|luxembourg|\blu\b)/i],
      ['br', /(巴西|brazil|\bbr\b)/i],
      ['it', /(意大利|italy|\bit\b)/i],
      ['fr', /(法国|法國|france|\bfr\b)/i],
      ['th', /(泰国|泰國|thailand|\bth\b)/i],
      ['ie', /(爱尔兰|愛爾蘭|ireland|\bie\b)/i]
    ];
    for (const [code, matcher] of map) {
      if (matcher.test(name)) return code;
    }
    return 'un';
  }

  async function renderNodes(id) {
    app.innerHTML = shell(`${pageHead(t('nav_nodes'), t('nav_nodes'), tx('nodes_subtitle'))}<div class="node-grid"><div class="skeleton"></div><div class="skeleton"></div></div>`, t('nav_nodes'));
    try {
      const result = await api('/user/server/fetch');
      if (id !== state.renderId) return;
      state.nodes = Array.isArray(result) ? result : (result?.data || []);
      const online = state.nodes.filter(node => Boolean(node.is_online)).length;
      const cards = state.nodes.map(node => { const kw = regionFlag(node); return `<article class="card node-card ${node.is_online ? '' : 'offline'}"><div class="node-card-top"></div><div class="node-card-body"><div class="node-head"><img class="node-flag" src="${ASSETS_BASE}/flags/1x1_zh_cn/${e(kw)}.svg" alt="${e(kw)}" title="${e(kw)}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${ASSETS_BASE}/flags/1x1_zh_cn/un.svg';"><span class="node-dot ${node.is_online ? 'online' : ''}"></span><div><h2>${e(node.name)}</h2><p>${e(String(node.type || '').toUpperCase())}</p></div><span class="status ${node.is_online ? 'success' : 'danger'}">${node.is_online ? tx('node_online') : tx('node_maintain')}</span></div><div class="info-list"><div class="info-item"><span>${tx('node_rate')}</span><b>${e(node.rate || 1)}×</b></div><div class="info-item"><span>${tx('node_tags')}</span><b>${(node.tags || []).map(tag => e(tag)).join(' · ') || tx('node_standard')}</b></div><div class="info-item"><span>${tx('node_last_check')}</span><b>${date(node.last_check_at)}</b></div></div></div></article>`; }).join('');
      app.innerHTML = shell(`${pageHead(t('nav_nodes'), t('nav_nodes'), fmt(tx('nodes_online_summary'), { online, total: state.nodes.length }))}<div class="node-grid">${cards || empty(tx('nodes_empty_title'), tx('nodes_empty_sub'))}</div>`, t('nav_nodes'));
    } catch (error) { renderError(error); }
  }

  async function renderTickets(id) {
    app.innerHTML = shell(`${pageHead(t('nav_tickets'), t('nav_tickets'), tx('tickets_subtitle'))}<div class="card skeleton"></div>`, t('nav_tickets'));
    try {
      const tickets = await api('/user/ticket/fetch');
      if (id !== state.renderId) return;
      state.tickets = Array.isArray(tickets) ? tickets : [];
      const readMap = readTicketReadMap();
      const openCount = state.tickets.filter(t => Number(t.status) === 0).length;
      const repliedCount = state.tickets.filter(t => isTicketUnread(t, readMap)).length;
      const rows = state.tickets.map(item => {
        const tid = ticketId(item);
        const subject = item?.subject || item?.title || (t('new_ticket') + ' #' + tid);
        const unread = isTicketUnread(item, readMap);
        const replyState = ticketReplyState(item);
        const replyCell = `<span class="status ${replyState === 'replied' ? 'success' : (unread ? 'info' : 'warning')}">${replyState === 'replied' ? ticketRepliedText() : t('ticket_waiting')}</span>`;
        return `<tr class="${unread ? 'ticket-row-unread' : ''}" data-ticket-id="${e(tid)}"><td><button class="table-link" data-action="open-ticket" data-id="${e(tid)}"><strong>${e(subject)}</strong><br><small>#${e(tid)}</small></button></td><td><span class="status ${Number(item.status) === 0 ? 'success' : 'warning'}">${Number(item.status) === 0 ? t('ticket_open') : t('ticket_closed')}</span></td><td class="ticket-reply-cell">${replyCell}</td><td>${date(item.updated_at || item.created_at)}</td></tr>`;
      }).join('');
      app.innerHTML = shell(`${pageHead(t('nav_tickets'), t('nav_tickets'), t('tickets_title'), `<button class="btn btn-ticket-cta" data-action="new-ticket">${icon('ticket')}<span>${t('new_ticket')}</span></button>`)}
        <div class="grid grid-3" style="margin-bottom:24px">
          ${statCard('ticket', state.tickets.length, tx('tickets_all'), 'bg-gradient-primary')}
          ${statCard('info', openCount, t('ticket_open'), 'bg-gradient-success')}
          <div data-ticket-stat="replied">${statCard('bell', repliedCount, t('ticket_new_reply'), 'bg-gradient-warning')}</div>
        </div>
        <section class="card">${rows ? `<div class="table-wrap"><table class="table"><thead><tr><th>${t('ticket_subject')}</th><th>${t('status')}</th><th>${ticketReplyStatusLabel()}</th><th>${t('create_time')}</th></tr></thead><tbody>${rows}</tbody></table></div>` : empty(tx('tickets_none_title'), tx('tickets_none_sub'))}</section>`, t('nav_tickets'));
    } catch (error) { renderError(error); }
  }

  function refreshTicketsPageUnreadUi() {
    if (routeName() !== 'tickets') return;
    const table = app.querySelector('.table tbody');
    if (!table || !Array.isArray(state.tickets)) return;
    const readMap = readTicketReadMap();
    const byId = new Map(state.tickets.map(item => [ticketId(item), item]));
    let replied = 0;
    table.querySelectorAll('tr[data-ticket-id]').forEach(row => {
      const item = byId.get(String(row.dataset.ticketId || ''));
      const unread = item ? isTicketUnread(item, readMap) : false;
      const replyState = item ? ticketReplyState(item) : 'waiting';
      row.classList.toggle('ticket-row-unread', unread);
      const cell = row.querySelector('.ticket-reply-cell');
      if (cell) {
        cell.innerHTML = `<span class="status ${replyState === 'replied' ? 'success' : (unread ? 'info' : 'warning')}">${replyState === 'replied' ? ticketRepliedText() : t('ticket_waiting')}</span>`;
      }
      if (unread) replied += 1;
    });
    const repliedNode = app.querySelector('[data-ticket-stat="replied"] .meta strong');
    if (repliedNode) repliedNode.textContent = String(replied);
  }

  async function renderTraffic(id) {
    app.innerHTML = shell(`${pageHead(t('nav_traffic'), t('nav_traffic'), t('traffic_title'))}<div class="card skeleton"></div>`, t('nav_traffic'));
    try {
      const traffic = await api('/user/stat/getTrafficLog');
      if (id !== state.renderId) return;
      state.traffic = Array.isArray(traffic) ? traffic : (traffic?.data || []);
      const max = Math.max(1, ...state.traffic.map(item => Number(item.u || 0) + Number(item.d || 0)));
      const totalUp = state.traffic.reduce((sum, item) => sum + Number(item.u || 0), 0);
      const totalDown = state.traffic.reduce((sum, item) => sum + Number(item.d || 0), 0);
      const bars = state.traffic.map(item => { const total = Number(item.u || 0) + Number(item.d || 0); return `<div class="traffic-row"><span>${date(item.record_at)}</span><div class="traffic-track"><i style="width:${Math.max(3, total / max * 100)}%"></i></div><b>${bytes(total)}</b><small>${tx('traffic_up_short')} ${bytes(item.u)} · ${tx('traffic_down_short')} ${bytes(item.d)} · ${e(item.server_rate || 1)}×</small></div>`; }).join('');
      const content = `${pageHead(t('nav_traffic'), t('nav_traffic'), tx('traffic_subtitle'))}
        <div class="grid grid-3">
          ${statCard('chart', bytes(totalUp + totalDown), tx('traffic_total'), 'bg-gradient-primary')}
          ${statCard('arrow', bytes(totalDown), tx('traffic_down'), 'bg-gradient-success')}
          ${statCard('refresh', bytes(totalUp), tx('traffic_up'), 'bg-gradient-info')}
        </div>
        <section class="card card-pad traffic-history" style="margin-top:24px">${bars || empty(tx('traffic_none_title'), tx('traffic_none_sub'))}</section>`;
      app.innerHTML = shell(content, t('nav_traffic'));
    } catch (error) { renderError(error); }
  }

  async function renderAccount(id) {
    app.innerHTML = shell(`${pageHead(t('nav_account'), t('nav_account'), t('account_subtitle_loading'))}<div class="grid grid-2"><div class="skeleton"></div><div class="skeleton"></div></div>`, t('nav_account'));
    try {
      const user = state.user || await api('/user/info');
      if (id !== state.renderId) return;
      state.user = user;
      const notifyPrefs = applyServerNotificationPrefs(user) || state.notificationPrefs || readNotificationPrefs();
      const content = `${pageHead(t('nav_account'), t('nav_account'), t('account_subtitle'))}
        <div class="grid grid-2">
          <section class="card card-pad">
            <div class="profile-card"><div class="profile-avatar">${e(initials(user.email))}</div><div><h2>${e(user.email)}</h2><p>${t('joined_at')}${date(user.created_at)}</p></div></div>
            <div class="info-list" style="margin-top:22px">
              <div class="info-item"><span>${t('account_balance')}</span><b>${money(user.balance)}</b></div>
              <div class="info-item"><span>${t('plan_id')}</span><b>${e(user.plan_id || tx('no_content'))}</b></div>
              <div class="info-item"><span>${t('expire_time')}</span><b>${date(user.expired_at)}</b></div>
              <div class="info-item"><span>${t('account_status')}</span><b><span class="status ${user.banned ? 'danger' : 'success'}">${user.banned ? t('banned') : t('status_normal')}</span></b></div>
            </div>
          </section>
          <section class="card card-pad">
            <div class="card-title"><div><h2>${t('settings')}</h2><p>${t('settings_sub')}</p></div></div>
            <div class="info-list">
              <div class="info-item"><span>${t('ui_theme')}</span><button class="btn btn-secondary btn-sm" data-action="theme">${t('theme_toggle')}</button></div>
              <div class="info-item"><span>${t('support')}</span>${config.supportUrl ? `<a class="text-link" href="${e(config.supportUrl)}" target="_blank" rel="noopener">${t('open_support')}</a>` : `<b>${t('not_configured')}</b>`}</div>
              <div class="info-item"><span>${t('frontend_version')}</span><b>Argon-Xboard ${e(config.version || '1.2.22')}</b></div>
              <div class="info-item"><span>${t('login_status')}</span><button class="btn btn-danger btn-sm" data-action="logout">${t('logout')}</button></div>
            </div>
          </section>
        </div>
        <div class="grid grid-2" style="margin-top:24px">
          <section class="card card-pad">
            <div class="card-title"><div><h2>${tx('notification_settings_title')}</h2><p>${tx('notification_settings_sub')}</p></div></div>
            <div class="notify-list">
              <div class="notify-item">
                <div class="notify-copy"><b>${tx('expiry_email_reminder')}</b><p>${tx('expiry_email_reminder_desc')}</p></div>
                <button class="switch-toggle ${notifyPrefs.expiryEmail ? 'on' : ''}" type="button" role="switch" aria-checked="${notifyPrefs.expiryEmail ? 'true' : 'false'}" data-action="toggle-notify" data-notify-key="expiryEmail"><span></span></button>
              </div>
              <div class="notify-item">
                <div class="notify-copy"><b>${tx('traffic_email_reminder')}</b><p>${tx('traffic_email_reminder_desc')}</p></div>
                <button class="switch-toggle ${notifyPrefs.trafficEmail ? 'on' : ''}" type="button" role="switch" aria-checked="${notifyPrefs.trafficEmail ? 'true' : 'false'}" data-action="toggle-notify" data-notify-key="trafficEmail"><span></span></button>
              </div>
            </div>
          </section>
          <section class="card card-pad">
            <div class="card-title"><div><h2>${t('security')}</h2><p>${t('security_sub')}</p></div>${icon('lock')}</div>
            <form class="form" id="password-change-form">
              <div class="field"><label for="old_password">${t('current_password')}</label><input class="input" id="old_password" name="old_password" type="password" required placeholder="${t('current_password_ph')}"></div>
              <div class="form-row">
                <div class="field"><label for="new_password">${t('new_password_label')}</label><input class="input" id="new_password" name="new_password" type="password" minlength="8" required placeholder="${t('password_min')}"></div>
                <div class="field"><label for="new_password_confirmation">${t('confirm_new_password')}</label><input class="input" id="new_password_confirmation" name="new_password_confirmation" type="password" required placeholder="${t('confirm_password_ph')}"></div>
              </div>
              <button class="btn btn-primary" type="submit">${t('change_password')}</button>
            </form>
          </section>
        </div>`;
      app.innerHTML = shell(content, t('nav_account'));
    } catch (error) { renderError(error); }
  }

  function empty(title, message) { return `<div class="empty">${icon('empty')}<h3>${e(title)}</h3><p>${e(message)}</p></div>`; }
  function renderError(error) {
    const content = `${pageHead(t('connection_error'), t('error_title'), t('error_subtitle'))}<section class="card empty">${icon('info')}<h3>${e(error.message || t('load_failed'))}</h3><p>${t('error_retry')}</p><button class="btn btn-primary" data-action="reload" style="margin-top:16px">${icon('refresh')} ${t('reload')}</button></section>`;
    app.innerHTML = state.auth ? shell(content, t('connection_error')) : app.innerHTML;
  }

  async function openDoc(articleId) {
    const dialog = document.getElementById('global-dialog');
    dialog.innerHTML = `<div class="dialog-head"><h3>${tx('doc_loading')}</h3><button class="icon-btn" data-action="close-dialog">${icon('close')}</button></div>`;
    if (!dialog.open) dialog.showModal();
    try {
      const article = state.docs.find(item => String(item.id) === String(articleId)) || await api(`/user/knowledge/fetch?id=${encodeURIComponent(articleId)}&language=${encodeURIComponent(state.lang || 'zh-CN')}`);
      dialog.innerHTML = `<div class="dialog-head"><div><h3>${e(article.title)}</h3><small>${e(article.category || t('nav_docs'))}</small></div><button class="icon-btn" data-action="close-dialog">${icon('close')}</button></div><article class="dialog-body rich-text">${renderAnnouncementContent(article.body || `<p>${tx('no_content')}</p>`)}</article>`;
    } catch (error) { dialog.close(); toast(error.message, 'error'); }
  }

  function openTicketCreate() {
    const dialog = document.getElementById('global-dialog');
    dialog.innerHTML = `<div class="dialog-head"><h3>${t('new_ticket')}</h3><button class="icon-btn" data-action="close-dialog">${icon('close')}</button></div><form class="dialog-body form" id="ticket-create-form"><div class="field"><label for="ticket_subject">${t('ticket_subject')}</label><input class="input" id="ticket_subject" name="subject" required maxlength="120" placeholder="${t('ticket_subject')}"></div><div class="field"><label for="ticket_level">${t('ticket_level')}</label><select class="input" id="ticket_level" name="level"><option value="0">${t('ticket_level_0')}</option><option value="1">${t('ticket_level_1')}</option><option value="2">${t('ticket_level_2')}</option></select></div><div class="field"><label for="ticket_message">${t('ticket_detail')}</label><textarea class="input textarea" id="ticket_message" name="message" required rows="6" placeholder="${t('ticket_detail_ph')}"></textarea></div><div class="dialog-actions"><button class="btn btn-secondary" type="button" data-action="close-dialog">${t('cancel')}</button><button class="btn btn-primary" type="submit">${t('submit_ticket')}</button></div></form>`;
    if (!dialog.open) dialog.showModal();
  }

  async function openTicket(ticketRefId) {
    const dialog = document.getElementById('global-dialog');
    dialog.innerHTML = `<div class="dialog-head"><h3>${tx('ticket_loading')}</h3><button class="icon-btn" data-action="close-dialog">${icon('close')}</button></div>`;
    if (!dialog.open) dialog.showModal();
    try {
      const ticket = await api(`/user/ticket/fetch?id=${encodeURIComponent(ticketRefId)}`);
      const messages = Array.isArray(ticket.message) ? ticket.message : [];
      const tid = ticketId(ticket) || String(ticketRefId || "").trim();
      if (tid && Array.isArray(state.tickets)) {
        const index = state.tickets.findIndex(item => ticketId(item) === tid);
        if (index >= 0) {
          state.tickets[index] = Object.assign({}, state.tickets[index], {
            id: state.tickets[index]?.id ?? ticket?.id,
            ticket_id: state.tickets[index]?.ticket_id ?? ticket?.ticket_id,
            reply_status: ticket?.reply_status ?? state.tickets[index]?.reply_status,
            replyStatus: ticket?.replyStatus ?? state.tickets[index]?.replyStatus,
            updated_at: ticket?.updated_at ?? ticket?.update_at ?? state.tickets[index]?.updated_at,
            message: messages
          });
          updateTicketNoticeDropdowns();
          refreshTicketsPageUnreadUi();
        }
      }
      dialog.innerHTML = `<div class="dialog-head"><div><h3>${e(ticket.subject)}</h3><small>${t('new_ticket')} #${e(ticket.id)}</small></div><button class="icon-btn" data-action="close-dialog">${icon('close')}</button></div><div class="dialog-body"><div class="ticket-thread">${messages.map(message => {
        const isMine = messageIsFromUser(message);
        return `<div class="ticket-message ${isMine ? 'me' : ''}"><b>${isMine ? t('mobile_me') : t('support')}</b><p>${e(message.message)}</p><small>${date(message.created_at)}</small></div>`;
      }).join('') || `<p class="field-hint">${t('ticket_waiting')}</p>`}</div>${Number(ticket.status) === 0 ? `<form class="form" id="ticket-reply-form" data-id="${e(ticket.id)}"><div class="field"><label for="ticket_reply">${t('ticket_reply')}</label><textarea class="input textarea" id="ticket_reply" name="message" required rows="4" placeholder="${t('ticket_reply')}"></textarea></div><div class="dialog-actions"><button class="btn btn-danger" type="button" data-action="close-ticket" data-id="${e(ticket.id)}">${t('close_ticket')}</button><button class="btn btn-primary" type="submit">${t('send_reply')}</button></div></form>` : `<p class="field-hint">${t('ticket_closed')}</p>`}</div>`;
    } catch (error) { dialog.close(); toast(error.message, 'error'); }
  }

  async function submitTicket(form) {
    const button = form.querySelector('[type="submit"]'); button.disabled = true;
    try {
      const data = Object.fromEntries(new FormData(form).entries()); data.level = Number(data.level || 0);
      await api('/user/ticket/save', { method: 'POST', body: data });
      document.getElementById('global-dialog').close(); toast(tx('ticket_created'));
      state.tickets = await api('/user/ticket/fetch'); render();
    } catch (error) { toast(error.message, 'error'); button.disabled = false; }
  }

  async function replyTicket(form) {
    const button = form.querySelector('[type="submit"]'); button.disabled = true;
    try {
      await api('/user/ticket/reply', { method: 'POST', body: { id: form.dataset.id, message: new FormData(form).get('message') } });
      toast(tx('ticket_replied'));
      state.tickets = await api('/user/ticket/fetch'); openTicket(form.dataset.id);
    } catch (error) { toast(error.message, 'error'); button.disabled = false; }
  }

  function openPurchase(planId) {
    if (!state.auth) return go('login');
    const plan = state.plans.find(item => String(item.id) === String(planId));
    if (!plan) return;
    const periods = ['month_price', 'quarter_price', 'half_year_price', 'year_price', 'two_year_price', 'three_year_price', 'onetime_price', 'reset_price'].filter(key => Number(plan[key]) > 0);
    const dialog = document.getElementById('global-dialog');
    dialog.innerHTML = `<div class="dialog-head"><h3>${fmt(tx('select_period_for'), { name: e(plan.name) })}</h3><button class="icon-btn" data-action="close-dialog" aria-label="${t('cancel')}">${icon('close')}</button></div><form class="dialog-body" id="purchase-form" data-plan="${e(plan.id)}"><div class="period-list">${periods.map((key, i) => `<label class="choice"><input type="radio" name="period" value="${key}" ${i === 0 ? 'checked' : ''}><span><b>${e(periodLabel(key))}</b><small>${money(plan[key])}</small></span></label>`).join('')}</div><div class="field" style="margin-top:18px"><label for="coupon_code">${tx('coupon_optional')}</label><input class="input" id="coupon_code" name="coupon_code" placeholder="${tx('coupon_placeholder')}"></div><div class="dialog-actions"><button class="btn btn-secondary" type="button" data-action="close-dialog">${t('cancel')}</button><button class="btn btn-primary" type="submit">${tx('create_order')} ${icon('arrow')}</button></div></form>`;
    dialog.showModal();
  }

  async function createOrder(form) {
    const button = form.querySelector('[type="submit"]');
    button.disabled = true; button.textContent = tx('creating_order');
    try {
      const data = new FormData(form);
      const tradeNo = await api('/user/order/save', { method: 'POST', body: { plan_id: form.dataset.plan, period: data.get('period'), coupon_code: data.get('coupon_code') || undefined } });
      const methods = await api('/user/order/getPaymentMethod').catch(() => []);
      renderPayments(tradeNo, methods || []);
    } catch (error) { toast(error.message, 'error'); button.disabled = false; button.textContent = tx('create_order'); }
  }

  function renderPayments(tradeNo, methods) {
    const dialog = document.getElementById('global-dialog');
    dialog.innerHTML = `<div class="dialog-head"><h3>${tx('payment_complete')}</h3><button class="icon-btn" data-action="close-dialog">${icon('close')}</button></div><form class="dialog-body" id="payment-form" data-trade="${e(tradeNo)}"><p class="field-hint" style="margin-top:0">${fmt(tx('payment_intro'), { trade: e(tradeNo) })}</p><div class="payment-list">${methods.length ? methods.map((method, i) => `<label class="choice"><input type="radio" name="method" value="${e(method.id)}" ${i === 0 ? 'checked' : ''}><span><b>${e(method.name)}</b><small>${e(method.payment || tx('online_payment'))}</small></span></label>`).join('') : `<p class="field-hint">${tx('no_online_payment')}</p>`}</div><div class="dialog-actions"><button class="btn btn-secondary" type="button" data-action="close-dialog">${tx('pay_later')}</button><button class="btn btn-primary" type="submit">${tx('confirm_payment')}</button></div></form>`;
  }

  async function checkout(form) {
    const button = form.querySelector('[type="submit"]'); button.disabled = true; button.textContent = tx('processing');
    try {
      const data = new FormData(form);
      const result = await api('/user/order/checkout', { method: 'POST', body: { trade_no: form.dataset.trade, method: data.get('method') || 0 } });
      if (result.type === -1 || result.data === true) {
        document.getElementById('global-dialog').close(); toast(tx('plan_activated')); go('dashboard');
      } else if (typeof result.data === 'string' && /^https?:\/\//i.test(result.data)) {
        location.href = result.data;
      } else {
        button.disabled = false; button.textContent = tx('confirm_payment');
        toast(tx('payment_waiting_desc'), 'success', tx('payment_waiting_title'));
        if (typeof result.data === 'string') window.open(result.data, '_blank', 'noopener');
      }
    } catch (error) { toast(error.message, 'error'); button.disabled = false; button.textContent = tx('confirm_payment'); }
  }

  async function handleAuth(form) {
    const mode = form.dataset.mode;
    const button = form.querySelector('[type="submit"]'); button.disabled = true; button.textContent = mode === 'register' ? tx('creating_account') : tx('logging_in');
    try {
      const data = Object.fromEntries(new FormData(form).entries());
      Object.assign(data, await captchaPayload(mode));
      const result = await api(`/passport/auth/${mode}`, { method: 'POST', body: data });
      saveAuth(result.auth_data);
      await startTicketPolling();
      toast(mode === 'register' ? tx('account_created') : t('auth_welcome'));
      go('dashboard');
    } catch (error) { toast(error.message, 'error'); button.disabled = false; button.textContent = mode === 'register' ? t('register_submit') : t('login_submit'); }
  }

  async function handleForgot(form) {
    const button = form.querySelector('[type="submit"]'); button.disabled = true; button.textContent = tx('resetting');
    try {
      const data = Object.fromEntries(new FormData(form).entries());
      if (data.password !== data.password_confirmation) throw new Error(tx('password_mismatch'));
      await api('/passport/auth/forget', { method: 'POST', body: { email: data.email, email_code: data.email_code, password: data.password } });
      toast(tx('password_reset_done'), 'success');
      go('login');
    } catch (error) { toast(error.message, 'error'); button.disabled = false; button.textContent = t('reset_password'); }
  }

  async function sendEmailCode(button) {
    const email = document.getElementById('email')?.value;
    if (!email) return toast(t('please_enter_email'), 'error');
    button.disabled = true;
    try {
      const captcha = await captchaPayload(routeName() === 'register' ? 'register' : 'forgot');
      await api('/passport/comm/sendEmailVerify', { method: 'POST', body: Object.assign({ email }, captcha) });
      let count = 60; button.textContent = `${count}s`;
      const timer = setInterval(() => { count -= 1; button.textContent = count > 0 ? `${count}s` : tx('resend'); if (count <= 0) { clearInterval(timer); button.disabled = false; } }, 1000);
      toast(tx('send_code_success'));
    } catch (error) { toast(error.message, 'error'); button.disabled = false; button.textContent = t('send_code'); }
  }

  async function render() {
    const id = ++state.renderId;
    closeMobileMenu();
    const dialog = document.getElementById('global-dialog');
    if (dialog?.open) dialog.close();
    let route = routeName();
    if (!state.auth && !['login', 'register', 'forgot'].includes(route)) route = 'login';
    if (state.auth && ['login', 'register', 'forgot'].includes(route)) route = 'dashboard';
    if (route !== routeName()) { go(route); return; }
    if (route === 'login' || route === 'register') return authPage(route);
    if (route === 'forgot') return forgotPage();
    if (route === 'docs') return renderDocs(id);
    if (route === 'plans') return renderPlans(id);
    if (route === 'orders') return renderOrders(id);
    if (route === 'invites') return renderInvites(id);
    if (route === 'nodes') return renderNodes(id);
    if (route === 'tickets') return renderTickets(id);
    if (route === 'traffic') return renderTraffic(id);
    if (route === 'account') return renderAccount(id);
    return renderDashboard(id);
  }

  document.addEventListener('click', async event => {
    const target = event.target.closest('[data-action], [data-nav], [data-dropdown-toggle]');
    if (!target) {
      if (!event.target.closest('[data-dropdown]')) document.querySelectorAll('[data-dropdown-menu]').forEach(m => m.classList.remove('open'));
      return;
    }
    if (target.dataset.dropdownToggle) {
      const name = target.dataset.dropdownToggle;
      const menu = document.querySelector(`[data-dropdown-menu="${name}"]`);
      const isOpen = menu?.classList.contains('open');
      document.querySelectorAll('[data-dropdown-menu]').forEach(m => m.classList.remove('open'));
      if (menu && !isOpen) menu.classList.add('open');
      return;
    }
    if (target.dataset.nav) { closeMobileMenu(); go(target.dataset.nav); return; }
    const action = target.dataset.action;
    if (action === 'open-mobile-menu') {
      setMobileMenuOpen(true);
    } else if (action === 'close-mobile-menu') {
      closeMobileMenu();
    } else if (action === 'theme') {
      setColorMode(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'); render();
    } else if (action === 'logout') {
      clearAuth(); toast(tx('logout_done')); go('login');
    } else if (action === 'copy-sub') {
      const subscribeUrl = safeHttpUrl(state.subscribe?.subscribe_url || '');
      if (!subscribeUrl) {
        toast(t('no_subscribe_url'), 'error');
      } else {
        try { await navigator.clipboard.writeText(subscribeUrl); toast(t('copy_subscribe_url')); } catch { toast(t('copy_failed'), 'error'); }
      }
    } else if (action === 'show-sub-qr') {
      openSubscribeQr(state.subscribe?.subscribe_url || '');
    } else if (action === 'set-quick-os') {
      const nextOS = String(target.dataset.os || '').toLowerCase();
      if (nextOS && nextOS !== state.quickSubscribeOS) {
        state.quickSubscribeOS = nextOS;
        const card = target.closest('.quick-subscribe-card');
        if (card) {
          card.outerHTML = renderQuickSubscribeModule(state.subscribe || {});
        } else {
          render();
        }
      }
    } else if (action === 'open-quick-client') {
      await openQuickClientImport(target.dataset.client, target.dataset.flag);
    } else if (action === 'reset-subscribe') {
      if (!confirm(t('reset_confirm'))) return;
      try { await api('/user/resetSecurity', { method: 'POST' }); toast(t('reset_done')); render(); } catch (error) { toast(error.message, 'error'); }
    } else if (action === 'copy-invite') {
      try { await navigator.clipboard.writeText(target.dataset.link || ''); toast(t('copy_invite_url')); } catch { toast(t('copy_failed'), 'error'); }
    } else if (action === 'open-doc') openDoc(target.dataset.id);
    else if (action === 'new-ticket') openTicketCreate();
    else if (action === 'open-ticket') {
      const openId = String(target.dataset.id || '').trim();
      if (!openId) {
        toast(t('request_failed'), 'error');
        return;
      }
      document.querySelectorAll('[data-dropdown-menu]').forEach(m => m.classList.remove('open'));
      markTicketReadById(openId);
      updateTicketNoticeDropdowns();
      refreshTicketsPageUnreadUi();
      openTicket(openId);
    }
    else if (action === 'generate-invite') {
      try { await api('/user/invite/save'); toast(tx('invite_created')); render(); } catch (error) { toast(error.message, 'error'); }
    } else if (action === 'close-ticket') {
      try { await api('/user/ticket/close', { method: 'POST', body: { id: target.dataset.id } }); document.getElementById('global-dialog').close(); toast(tx('ticket_closed_done')); render(); } catch (error) { toast(error.message, 'error'); }
    } else if (action === 'purchase') openPurchase(target.dataset.plan);
    else if (action === 'close-dialog') document.getElementById('global-dialog').close();
    else if (action === 'reload') render();
    else if (action === 'send-code') sendEmailCode(target);
    else if (action === 'cancel-order') {
      try { await api('/user/order/cancel', { method: 'POST', body: { trade_no: target.dataset.trade } }); toast(tx('order_cancelled')); render(); } catch (error) { toast(error.message, 'error'); }
    } else if (action === 'go-notices') {
      openNoticeCenter();
    } else if (action === 'toggle-notify') {
      const key = target.dataset.notifyKey;
      const field = notifyFieldMap[key];
      if (!field) return;
      const nextOn = !target.classList.contains('on');
      target.disabled = true;
      try {
        await api('/user/update', { method: 'POST', body: { [field]: nextOn ? 1 : 0 } });
        const nextPrefs = Object.assign({}, state.notificationPrefs || readNotificationPrefs(), { [key]: nextOn });
        saveNotificationPrefs(nextPrefs);
        target.classList.toggle('on', nextOn);
        target.setAttribute('aria-checked', nextOn ? 'true' : 'false');
        toast(tx('notification_saved'));
      } catch (error) {
        toast(error.message, 'error');
      } finally {
        target.disabled = false;
      }
    } else if (action === 'set-lang') {
      setLang(target.dataset.lang);
    }
  });

  document.addEventListener('submit', event => {
    const form = event.target;
    if (!['auth-form', 'forgot-form', 'purchase-form', 'payment-form', 'ticket-create-form', 'ticket-reply-form', 'password-change-form'].includes(form.id)) return;
    event.preventDefault();
    if (form.id === 'auth-form') handleAuth(form);
    if (form.id === 'forgot-form') handleForgot(form);
    if (form.id === 'purchase-form') createOrder(form);
    if (form.id === 'payment-form') checkout(form);
    if (form.id === 'ticket-create-form') submitTicket(form);
    if (form.id === 'ticket-reply-form') replyTicket(form);
    if (form.id === 'password-change-form') changePassword(form);
  });

  async function changePassword(form) {
    const button = form.querySelector('[type="submit"]'); button.disabled = true; button.textContent = t('changing');
    try {
      const data = Object.fromEntries(new FormData(form).entries());
      if (data.new_password !== data.new_password_confirmation) throw new Error(tx('password_mismatch'));
      await api('/user/changePassword', { method: 'POST', body: { old_password: data.old_password, new_password: data.new_password } });
      form.reset(); toast(tx('password_changed_relogin'));
    } catch (error) { toast(error.message, 'error'); }
    finally { button.disabled = false; button.textContent = t('change_password'); }
  }

  document.addEventListener('input', event => {
    if (event.target.dataset.action === 'search-docs') {
      state.docSearch = event.target.value;
      renderDocList(state.renderId);
    }
  });

  window.addEventListener('hashchange', render);

  (async function boot() {
    try { state.guest = await api('/guest/comm/config'); }
    catch (error) { state.guest = {}; toast(error.message, 'error', tx('site_config_read_failed')); }
    if (state.auth) {
      await startTicketPolling();
    }
    if (!location.hash) go(state.auth ? 'dashboard' : 'login');
    else render();
  })();
})();
