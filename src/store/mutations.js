export default {
  // 用户名
  setUsernameMutation(ctx, name) {
    this.state.username = name
    try {
      if (localStorage.username) {
        localStorage.username = name
      }
    } catch (e) {
      console.log(e)
    }
  },

  // token
  setTokenMutation(ctx, token) {
    this.state.token = token
    try {
      if (localStorage.token) {
        localStorage.token = token
      }
    } catch (e) {
      console.log(e)
    }
  }
}
