export default {
  token: localStorage['token'] ? localStorage['token'] : '', // token
  openid: localStorage['openid'] ? localStorage['openid'] : '', // 当前 openid
  afterLoginGo: localStorage['afterLoginGo']
    ? localStorage['afterLoginGo']
    : '', // 登录之后要跳转的地址
  // retryCount: 0, // 登录重试次数,防止同一页面中多个ajax同时触发登录操作
  messageShow: false // message 弹框控制
}
