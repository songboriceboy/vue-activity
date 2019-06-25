<template>
  <div class="mine">
    <section class="mine-content">
      <div class="avatar">
        <span class="img"
              :style="{backgroundImage: 'url('+userInfo.avatar+')'}"></span>
      </div>
      <div class="info">
        <h1>{{ userInfo.name | nameFilter }}</h1>
        <router-link tag="div"
                     class="edit"
                     to="/editInfo">
          <i class="edit-icon"></i>
          <span>编辑个人资料</span>
        </router-link>
      </div>
    </section>
    <nav class="nav">
      <van-cell title="我的活动"
                is-link
                class="my-activity"
                to="/myActivity" />
      <van-cell title="我的试用"
                is-link
                class="my-trial"
                to="/myTrial" />
      <van-cell title="体验报告"
                is-link
                class="my-report"
                to="/myReport" />
    </nav>
    <div class="nav-line"></div>
    <nav class="nav">
      <van-cell title="意见反馈"
                is-link
                class="my-suggest"
                to="/suggest" />
      <van-cell title="联系我们"
                is-link
                class="my-about"
                to="/about" />
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Mine',
  data () {
    return {
      userInfo: {}
    }
  },

  created () {
    this.init()
  },

  methods: {
    // 初始化
    init () {
      const userInfo = this.$store.state.userInfo || localStorage.getItem('user_info')
      this.userInfo = JSON.parse(userInfo)
    }
  },

  filters: {
    nameFilter (val) {
      return val.length > 8 ? val.slice(0, 8) + '...' : val
    }
  }
};
</script>

<style lang="less">
.mine {
  width: 100%;
  background-color: #fff;
}
.mine-content {
  height: 292px;
  padding: 54px 48px 0;
  display: flex;
  .bg-img("~@images/pic_mine_background");
  .avatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 8px solid #fff;
    overflow: hidden;
    background-color: #fff;
    .img {
      display: block;
      width: 150px;
      height: 150px;
      overflow: hidden;
      border-radius: 50%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }
  .info {
    flex: 1;
    padding-top: 30px;
    h1 {
      height: 62px;
      box-sizing: border-box;
      font-size: 45px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 62px;
      padding-left: 30px;
    }
    .edit {
      padding: 13px 0 0 30px;
      height: 40px;
      font-size: 28px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(254, 186, 186, 1);
      line-height: 40px;
      span {
        display: inline-block;
        vertical-align: middle;
        margin-left: 11px;
      }
    }
    .edit-icon {
      width: 35px;
      height: 35px;
      display: inline-block;
      vertical-align: middle;
      .bg-img("~@images/pic_mine_modify");
    }
  }
}
.nav {
  margin-top: 5px;
  padding: 33px 0;
  /deep/ .van-cell {
    padding: 33px 45px 33px 50px;
  }
  /deep/ .van-cell:not(:last-child)::after {
    border-bottom: none;
  }
  /deep/ .van-cell__title {
    height: 45px;
    font-size: 32px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 45px;
    letter-spacing: 1px;
    &::before {
      content: "";
      display: inline-block;
      vertical-align: middle;
      margin-right: 28px;
    }
    span {
      display: inline-block;
      vertical-align: middle;
    }
  }
  /deep/ .my-activity .van-cell__title::before {
    width: 45px;
    height: 57px;
    .bg-img("~@images/ic_mine_tryout");
  }
  /deep/ .my-trial .van-cell__title::before {
    width: 45px;
    height: 57px;
    .bg-img("~@images/ic_mine_tryout");
  }
  /deep/ .my-report .van-cell__title::before {
    width: 47px;
    height: 46px;
    .bg-img("~@images/ic_mine_activity");
  }
  /deep/ .my-suggest .van-cell__title::before {
    width: 46px;
    height: 40px;
    .bg-img("~@images/ic_mine_feedback");
  }
  /deep/ .my-about .van-cell__title::before {
    width: 48px;
    height: 49px;
    .bg-img("~@images/ic_mine_contact");
  }
}
.nav-line {
  width: 656px;
  height: 2px;
  background-color: #f0f0f0;
  margin: 0 45px 0 50px;
}
</style>
