<template>
  <van-dialog :value="show"
              :showConfirmButton="false"
              className="rules-dialog">
    <div class="container">
      <h2><span>签到规则</span></h2>
      <div class="content"
           v-html="text"></div>
    </div>
    <span class="rules-close"
          @click="closerulesDialog"></span>
  </van-dialog>
</template>

<script>
export default {
  name: 'rulesDialog',
  props: {
    show: {
      default: false
    }, // 显示控制
    text: {
      default: ''
    }, // 文字信息
  },
  data () {
    return {

    }
  },
  methods: {
    // 关闭信息弹框
    closerulesDialog () {
      this.$emit('close')
    },
  }
};
</script>

<style lang="less" scoped>
.rules-dialog {
  background: transparent;
  width: 583px;
  padding-bottom: 163px;
  .rules-close {
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
  width: 583px;
  background: rgba(255, 255, 255, 1);
  border-radius: 15px;
  overflow: hidden;
  h2 {
    width: 100%;
    height: 114px;
    line-height: 114px;
    text-align: center;
    .bg-img("~@images/checkin/pic_checkin_windowtop");
    span {
      display: block;
      position: relative;
      width: 248px;
      height: 114px;
      font-size: 48px;
      font-weight: 500;
      margin: 0 auto;
      color: rgba(255, 255, 255, 1);
      line-height: 114px;
      letter-spacing: 2px;
      &::before,
      &::after {
        content: "";
        display: block;
        width: 38px;
        height: 22px;
        position: absolute;
        top: 50%;
        margin-top: -11px;
      }
      &::before {
        left: -38px;
        .bg-img("~@images/checkin/pic_checkin_line1");
      }
      &::after {
        right: -38px;
        .bg-img("~@images/checkin/pic_checkin_line2");
      }
    }
  }
}
.content {
  padding: 47px 47px 55px;
  font-size: 28px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 1.8;
  letter-spacing: 2px;
}
</style>
