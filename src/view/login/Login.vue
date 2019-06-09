<template>
  <div class="login">
    <van-button type="default"
                @click="onLogin">允许</van-button>
  </div>
</template>

<script>
import axios from '@/common/js/http'

export default {
  name: 'login',
  data () {
    return {

    }
  },
  methods: {
    // 允许授权登录
    onLogin () {
      // 用户同意授权，获取code
      // https://open.weixin.qq.com/connect/oauth2/authorize
      // ?appid=APPID
      // &redirect_uri=REDIRECT_URI
      // &response_type=code
      // &scope=SCOPE
      // &state=STATE
      // #wechat_redirect
      const appid = 'wx4128185b8f5d5883'
      const redirectUri = 'baidu.com/index.php'
      const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
      axios
        .get(url)
        .then(res => {
          console.log(res)
        })
    }
  }
}
</script>

<style lang="less" scoped>
</style>

