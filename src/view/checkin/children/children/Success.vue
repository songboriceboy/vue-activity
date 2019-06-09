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
    </div>
    <span class="success-close"
          v-if="days === 7"
          @click="closesuccessDialog"></span>
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
      if (this.days === 7) {
        this.$router.push({ path: '/lottery' })
      } else {
        this.closesuccessDialog()
      }
    }
  }
};
</script>

<style lang="less" scoped>
.success-dialog {
  background: transparent;
  width: 583px;
  padding-bottom: 163px;
  .success-close {
    width: 96px;
    height: 96px;
    display: block;
    position: absolute;
    left: 50%;
    bottom: 0;
    margin-left: -48px;
    .bg-img("~@images/checkin/pic_checkin_close");
  }
}
.container {
  background: rgba(253, 247, 244, 1);
  border-radius: 15px 15px;
  padding-bottom: 50px;
  overflow: hidden;
  .img-bg {
    width: 100%;
    height: 430px;
    .bg-img("~@images/checkin/pic_checkin_window");
  }
  .img {
    width: 376px;
    height: 272px;
    position: absolute;
    top: 26px;
    left: 50%;
    margin-left: -188px;
    .bg-img("~@images/checkin/pic_checkin_success");
  }
}
.content {
  text-align: center;
  padding: 0 75px 24px;
  h4 {
    font-size: 42px;
    font-weight: 500;
    color: rgba(242, 23, 23, 1);
    line-height: 42px;
  }
  p {
    margin-top: 25px;
    font-size: 32px;
    font-weight: 400;
    color: rgba(249, 121, 108, 1);
    line-height: 45px;
    letter-spacing: 1px;
  }
}
.isRadiusButton {
  width: 345px;
  height: 93px;
  line-height: 93px;
  display: block;
  text-align: center;
  margin: 0 auto;
  font-size: 0;
  .isRadiusButton();
  .button-text {
    font-size: 38px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
