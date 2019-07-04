<template>
  <div class="login">
    <header class="header">
      <img :src="imgSrc"
           :alt="title"
           class="logo">
      <h1>{{ title }}</h1>
      <h4>{{ name }}</h4>
    </header>
    <section class="content">
      <h5>该程序将获取以下授权:</h5>
      <ul class="list">
        <li>获得您的公开信息(昵称, 头像等)</li>
      </ul>
    </section>
    <van-button type="primary"
                class="allow"
                @click="onLogin">允许</van-button>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      title: '掌上生活',
      name: '深圳招商银行',
      imgSrc: './logo.png',
      afterLoginGo: '' // 登录前访问的地址
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // init
    init () {
      this.afterLoginGo = localStorage.getItem('after_login_go')
      let token = this.$store.state.token || localStorage.getItem('token')
      if (token) {
        let path = this.afterLoginGo || '/checkin'
        this.$router.push({ path: path })
      }
    },

    // 允许授权登录
    onLogin () {
      let path = this.afterLoginGo || '/checkin'
      let origin = location.protocol + "//" + location.hostname + (location.port ? ':' + location.port : '')
      let url = origin + path
      location.href = 'http://merchants.lzdu.com/api/oauth?back_url=' + encodeURIComponent(url)
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  padding: 0 40px;
  .header {
    margin: 0 30px;
    border-bottom: 1px solid #e5e5e5;
    padding: 120px 0 52px;
  }
  .logo {
    display: block;
    width: 124px;
    height: 128px;
    margin: 0 auto;
  }
  h1 {
    height: 45px;
    font-size: 32px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.87);
    line-height: 45px;
    text-align: center;
    margin-top: 46px;
  }
  h4 {
    height: 33px;
    font-size: 24px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(136, 136, 136, 1);
    line-height: 33px;
    letter-spacing: 2px;
    text-align: center;
    margin-top: 20px;
  }
  .content {
    padding: 46px 30px 56px;
    h5 {
      height: 28px;
      font-size: 28px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.87);
      line-height: 29px;
    }
    .list {
      padding-top: 34px;
      li {
        height: 34px;
        font-size: 22px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(155, 155, 155, 1);
        line-height: 34px;
        padding-left: 35px;
        position: relative;
        &::before {
          display: block;
          content: "";
          width: 10px;
          height: 10px;
          background-color: #66ba6c;
          position: absolute;
          top: 12px;
          left: 0;
          border-radius: 100%;
        }
      }
    }
  }
  .allow {
    display: block;
    width: 100%;
    padding: 0;
    height: 94px;
    color: #fff;
    font-size: 36px;
    background: rgba(26, 173, 25, 1);
    border-radius: 10px;
    border: 2px solid rgba(5, 5, 5, 0.08);
  }
}
</style>

