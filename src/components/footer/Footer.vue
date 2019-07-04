<template>
  <van-tabbar route
              class="footer">
    <van-tabbar-item class="footer-l">
      <div class="label">距结束仅剩</div>
      <ul class="time-list">
        <li class="time-val">{{ leftTime[0] }}</li>
        <li class="time-split">:</li>
        <li class="time-val">{{ leftTime[1] }}</li>
        <li class="time-split">:</li>
        <li class="time-val">{{ leftTime[2] }}</li>
        <li class="time-split">:</li>
        <li class="time-val">{{ leftTime[3] }}</li>
      </ul>
    </van-tabbar-item>
    <van-tabbar-item class="footer-r over"
                     v-if="over">已结束</van-tabbar-item>
    <van-tabbar-item class="footer-r"
                     v-else
                     @click="redirectTo">
      {{ label }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: 'detailFooter',
  props: {
    label: {
      default: '报名',
    },
    limited: {
      default: false
    },// 报名人数是否达到上限
    endTime: {
      type: String,
      default: ''
    }, // 截止时间
    routerPath: {
      default: ''
    } // 报名跳转路径
  },
  data () {
    return {
      over: false, // 是否已结束
      leftTime: ['00', '00', '00', '00'], // 剩余时间数组 天时分秒
      timer: null // 定时器
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.timer = setInterval(() => {
        if (this.over) {
          clearInterval(this.timer)
        }
        this.leftTime = this.$methods.countDown(this)
      }, 1000)
    },

    // 跳转到申请页
    redirectTo () {
      // if (this.limited) {
      //   this.$toast('报名人数已达到上限, 请关注其他活动')
      // } else {
      // }
      this.$router.push(this.routerPath)
    }
  },

  beforeDestroy () {
    // 离开页面清除定时器
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
</script>

<style lang="less" scoped>
.footer {
  width: 100%;
  background-color: #ff4500;
  display: flex;
  height: 110px;
  line-height: 110px;
  .footer-l {
    flex: 1;
    overflow: hidden;
    .label {
      padding: 0 36px;
      height: 37px;
      font-size: 26px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(247, 248, 251, 1);
      line-height: 37px;
      float: left;
    }
  }
  .time-list {
    .clearfix();
    float: left;
    li {
      float: left;
      text-align: center;
    }
    .time-val {
      width: 37px;
      height: 37px;
      line-height: 37px;
      background: linear-gradient(
        360deg,
        rgba(255, 245, 198, 1) 0%,
        rgba(255, 252, 239, 1) 100%
      );
      border-radius: 6px;
      font-size: 26px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(243, 104, 65, 1);
    }
    .time-split {
      width: 20px;
      height: 37px;
      font-size: 26px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(247, 248, 251, 1);
      line-height: 37px;
    }
  }
  .footer-r {
    background: rgba(245, 166, 35, 1);
    width: 257px;
    flex: initial;
    font-size: 38px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    text-align: center;
  }
  .footer-r.over {
    background-color: #c2bfc7;
  }
  /deep/ .van-tabbar-item__icon {
    display: none;
  }
  /deep/ .van-tabbar-item__text {
    width: 100%;
  }
}
.van-hairline--top-bottom::after {
  border: none;
}
</style>
