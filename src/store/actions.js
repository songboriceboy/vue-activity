export default {
  setUsernameAction(ctx, username) {
    ctx.commit('setUsernameMutation', username)
  },

  setTokenAction(ctx, token) {
    ctx.commit('setTokenMutation', token)
  }
}
