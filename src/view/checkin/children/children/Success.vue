<template>
  <van-dialog :value="show"
              :showConfirmButton="false"
              className="success-dialog">
    <div class="container">
      <div class="img-bg">
        <div class="img"></div>
      </div>
      <div class="content">
        <h4>签到成功</h4>
        <p>{{ text }}</p>
      </div>
      <van-button type="default"
                  class="isRadiusButton"
                  @click="handleTo">
        <i class="calendar-icon"></i>
        <span class="button-text"
              v-if="days !== 7">返回首页</span>
        <span class="button-text"
              v-else>去抽奖</span>
      </van-button>
      <span class="success-close"
            @click="closesuccessDialog"></span>
    </div>
  </van-dialog>
</template>

<script>
export default {
  name: 'successDialog',
  props: {
    show: {
      default: false
    }, // 显示控制
    text: {
      default: ''
    }, // 文字信息
    days: {
      default: ''
    } // 成功天数
  },
  data () {
    return {

    }
  },
  methods: {
    // 关闭信息弹框
    closesuccessDialog () {
      this.$emit('close')
    },

    // 跳转
    handleTo () {
      // let path = this.hasPrize ? '/lotteryDetails' : '/checkin';
      // this.$router.push({ path: path })
    }
  }
};
</script>

<style lang="less" scoped>
.success-dialog {
  background: transparent;
  width: 543px;
  padding: 0 20px;
}
.success-img {
  width: 270px;
  height: 193px;
  margin: 0 auto;
}
.success-img-false {
  .bg-img("~@images/checkin/pic_checkin_notgetting");
}
.success-img-true {
  .bg-img("~@images/checkin/pic_checkin_winning");
}
.container {
  background: rgba(253, 247, 244, 1);
  border-radius: 15px 15px;
  padding-bottom: 50px;
  .success-close {
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
