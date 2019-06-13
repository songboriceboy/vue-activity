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
                     replace
                     to="/">
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
    endTime: {
      type: String,
      default: ''
    },
    routePath: {
      default: ''
    }
  },
  data () {
    return {
      over: false, // 是否已结束
      leftTime: ['00', '00', '00', '00'], // 剩余时间数组 天时分秒
    }
  },
  mounted () {
    let timer = setInterval(() => {
      if (this.over) {
        clearInterval(timer)
      }
      this.countDown()
    }, 1000)
  },
  methods: {
    // 倒计时
    countDown () {
      // 如果截止时间为空
      if (!this.endTime) {
        this.over = true
        return false
      }

      // 截止时间
      const endTime = new Date(this.endTime)

      // 当前时间
      const nowTime = new Date()

      // 剩余时间 秒
      let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000)

      // 如果截止时间已经过期
      if (leftTime <= 0) {
        this.over = true
        this.leftTime = ['00', '00', '00', '00']
        return false
      }

      // 取整
      let D = this.addPrefixZero(parseInt(leftTime / (24 * 60 * 60)))
      let H = this.addPrefixZero(parseInt(leftTime / (60 * 60) % 24))
      let M = this.addPrefixZero(parseInt(leftTime / 60 % 60))
      let S = this.addPrefixZero(parseInt(leftTime % 60))

      this.leftTime = [D, H, M, S]
    },

    // 时间 1 位数, 则添加前缀 0
    addPrefixZero (time) {
      if (time >= 10) {
        return time
      } else {
        return `0${time}`
      }
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
