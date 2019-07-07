export default {
  token: localStorage['token'] ? localStorage['token'] : '', // token
  userInfo: localStorage['user_info'] ? localStorage['user_info'] : null, // 当前 userInfo
  afterLoginGo: localStorage['after_login_go']
    ? localStorage['after_login_go']
    : '', // 登录之后要跳转的地址
  // retryCount: 0, // 登录重试次数,防止同一页面中多个ajax同时触发登录操作
  messageShow: false, // message 弹框控制
  shareShow: false, // 分享弹框控制
  reportActive: 0 // 报告当前板块
}
