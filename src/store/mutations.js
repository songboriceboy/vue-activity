export default {
  // 设置 token
  setToken(state, token) {
    state.token = token
    localStorage['token'] = token
  },

  // 设置 账号信息
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
    localStorage['user_info'] = userInfo
  },

  // 重试次数计数
  // retryCountAdd(state) {
  //   state.retryCount++
  // },

  // 设置登录跳转地址
  setLoginGo(state, path) {
    state.afterLoginGo = path
    localStorage['after_login_go'] = path
  },

  // 设置 message 弹框控制的状态
  setMessageShow(state, show) {
    state.messageShow = show
  }
}
