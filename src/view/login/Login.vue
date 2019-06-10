<template>
  <div class="login">
    <header class="header">
      <!-- <img :src="imgSrc"
           alt=""> -->
      <h1>{{ title }}</h1>
      <h4>{{ name }}</h4>
    </header>
    <section class="content">
      <h4 @click="onLogin">该程序将获取以下授权:</h4>
      <ul></ul>
    </section>

  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      title: '掌上生活',
      name: '深圳招商银行'
    }
  },
  methods: {
    // 允许授权登录
    onLogin () {
      // this.$api.login.login()
      //   .then(res => {
      //     console.log(res)
      //   })
      location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7812484f92be0061&redirect_uri=http%3A%2F%2Fmerchants.lzdu.com%2Fapi%2Foauth_callback%3Fback_url%3Dhttp%253A%252F%252Fmerchants.lzdu.com%252Fapi%252Foauth&response_type=code&scope=snsapi_userinfo&state=3c347eb132065abf52ee4c1bf8ee0e35&connect_redirect=1&uin=MzE0MTI0MTkwNg%3D%3D&key=27afd5fe7004a19600622a2975bbeeb5ca7c62028511105f51df17110a52016de8798230dc05096453c1db532844893a&pass_ticket=tyCTmUadt/Ozx8wl7CbW7bfsrt+DoDW9FmlJ6s+H2Q9Bm9TP22HOnAO7z6Lw1RkEoYWOAtnqwD+uIdS3oXodxw=='
      // 用户同意授权，获取code
      // https://open.weixin.qq.com/connect/oauth2/authorize
      // ?appid=APPID
      // &redirect_uri=REDIRECT_URI
      // &response_type=code
      // &scope=SCOPE
      // &state=STATE
      // #wechat_redirect
      // const appid = 'wx4128185b8f5d5883'
      // const redirectUri = 'github.com/liguoyou'
      // window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`)
    }
  }
}
</script>

<style lang="less" scoped>
</style>

