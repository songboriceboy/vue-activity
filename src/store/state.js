export default {
  token: localStorage['token'] ? localStorage['token'] : '', // token
  openid: localStorage['openid'] ? localStorage['openid'] : '', // 当前 openid
  afterLoginGo: localStorage['afterLoginGo'] ? localStorage['afterLoginGo'] : ''
  // retryCount: 0, // 登录重试次数,防止同一页面中多个ajax同时触发登录操作
}
