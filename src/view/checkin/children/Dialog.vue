<template>
  <van-dialog :value="show"
              :showConfirmButton="false"
              className="info-dialog">
    <div class="info-img info-img-true"
         v-if="this.info.hasPrize"></div>
    <div class="info-img info-img-false"
         v-else></div>
    <div class="info-title">
      {{ infoTitle }}
      <span class="info-close"
            @click="closeInfoDialog"></span>
    </div>
    <div class="container">
      <div class="content">
        <img :src="this.info.infoImg"
             alt=""
             v-if="this.info.infoImg"
             class="content-img">
        {{ infoText }}
      </div>
      <van-button type="default"
                  class="is-radius-button-red"
                  @click="handleTo">
        <i class="calendar-icon"></i>
        <span class="button-text">{{ this.info.buttonText }}</span>
      </van-button>
    </div>
  </van-dialog>
</template>

<script>
export default {
  name: 'infoDialog',
  props: {
    show: {
      default: false
    }, // 显示控制
    info: {
      default: function () {
        return {
          prizeName: '', // 奖品名称
          hasPrize: false, // 是否中奖
          infoImg: '', // 奖品图片
          buttonText: '', // 按钮文字,
          date: '' // 日期
        }
      }
    }, // 信息
    adress: {
      default: function () {
        return {}
      }
    }
  },
  computed: {
    infoTitle () {
      return this.info.hasPrize ? '恭喜您, 中奖啦!' : '未中奖, 很遗憾!'
    },
    infoText () {
      return this.info.hasPrize ? '抽中奖品: ' + this.info.prizeName : '您和奖品只差一丢丢, 继续签到下次再抽一次吧。'
    },
  },
  data () {
    return {

    }
  },
  methods: {
    // 关闭信息弹框
    closeInfoDialog () {
      this.$emit('close')
    },

    // 跳转
    handleTo () {
      this.closeInfoDialog()
      let isEdit = this.info.buttonText === '查看详情' ? 0 : 1
      if (this.info.hasPrize) {
        this.$router.push({ path: '/lotteryDetails', query: { edit: isEdit, date: this.info.date, prizeName: this.info.prizeName, prizeImg: this.info.infoImg } })
      } else {
        this.$router.push({ path: '/checkin' })
      }

    }
  }
};
</script>

<style lang="less" scoped>
.info-dialog {
  background: transparent;
  width: 543px;
  padding: 0 20px;
}
.info-img {
  width: 270px;
  height: 193px;
  margin: 0 auto;
}
.info-img-false {
  .bg-img("~@images/checkin/pic_checkin_notgetting");
}
.info-img-true {
  .bg-img("~@images/checkin/pic_checkin_winning");
}
.info-title {
  width: 100%;
  height: 114px;
  font-size: 48px;
  margin-top: -15px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 114px;
  letter-spacing: 3px;
  text-align: center;
  border-radius: 15px 15px 0 0;
  position: relative;
  .bg-img("~@images/checkin/pic_checkin_windowtop");
}
.info-close {
  width: 44px;
  height: 44px;
  display: block;
  position: absolute;
  right: -18px;
  top: -18px;
  .bg-img("~@images/checkin/pic_checkin_close1");
}
.container {
  background: rgba(253, 247, 244, 1);
  border-radius: 0 0 15px 15px;
  padding: 50px 75px 70px;
  overflow: hidden;
}
.content {
  font-size: 32px;
  font-weight: 400;
  color: rgba(249, 121, 108, 1);
  line-height: 1.5;
  text-align: center;
  padding-bottom: 55px;
}
.content-img {
  display: block;
  margin: 0 auto 8px;
  max-width: 86px;
  max-height: 174px;
}
.is-radius-button-red {
  .is-radius-button-red();
  width: 345px;
  height: 93px;
  line-height: 93px;
  display: block;
  margin: 10px auto 0;
  font-size: 0;
  .button-text {
    font-size: 38px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
