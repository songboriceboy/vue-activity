<template>
  <van-dialog :value="show"
              :showConfirmButton="false"
              className="info-dialog">
    <div class="info-img info-img-true"
         v-if="hasPrize"></div>
    <div class="info-img info-img-false"
         v-else></div>
    <div class="info-title">
      {{ title }}
      <span class="info-close"
            @click="closeInfoDialog"></span>
    </div>
    <div class="container">
      <div class="content">
        <img :src="infoImg"
             alt=""
             class="content-img">
        {{ text }}
      </div>
      <van-button type="default"
                  class="isRadiusButton"
                  @touchstart="handleTo">
        <i class="calendar-icon"></i>
        <span class="button-text"
              v-if="hasPrize">立即领取</span>
        <span class="button-text"
              v-else>返回首页</span>
      </van-button>
    </div>
  </van-dialog>
</template>

<script>
export default {
  name: 'infoDialog',
  props: {
    title: {
      default: '信息'
    }, // 标题
    show: {
      default: false
    }, // 显示控制
    text: {
      default: ''
    }, // 文字信息
    hasPrize: {
      default: false
    }, // 是否中奖
    infoImg: {
      default: ''
    } // 奖品图片
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
      let path = this.hasPrize ? '/lotteryDetails' : '/checkin';
      this.$router.push({ path: path })
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
.container {
  background: rgba(253, 247, 244, 1);
  border-radius: 0 0 15px 15px;
  padding: 50px 75px 70px;
  overflow: hidden;
  .info-close {
    width: 44px;
    height: 44px;
    display: block;
    position: absolute;
    right: -18px;
    top: -18px;
    .bg-img("~@images/checkin/pic_checkin_close1");
  }
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
.isRadiusButton {
  width: 345px;
  height: 93px;
  line-height: 93px;
  display: block;
  text-align: center;
  margin: 10px auto 0;
  font-size: 0;
  .isRadiusButton();
  .button-text {
    font-size: 38px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
