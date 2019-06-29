<template>
  <van-tabbar class="apply-status">
    <van-tabbar-item class="success"
                     v-if="applyStatus === 2">申请成功</van-tabbar-item>
    <van-tabbar-item class="fail"
                     v-else-if="applyStatus === 0">申请失败</van-tabbar-item>
    <van-tabbar-item class="ing"
                     v-else-if="applyStatus === 1">申请中</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: 'applyStatus',
  props: {
    applyStatus: {
      default: '',
    } // 我的申请状态
  }
}
</script>

<style lang="less" scoped>
.apply-status {
  width: 100%;
  background-color: #fff;
  height: 110px;
  line-height: 110px;
  text-align: center;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.42);
  /deep/ .van-tabbar-item__icon {
    display: none;
  }
  .success {
    color: rgba(51, 51, 51, 1);
  }
  .fail {
    color: rgba(191, 188, 196, 1);
  }
  .ing {
    color: rgba(255, 69, 0, 1);
  }
  /deep/ .van-tabbar-item__text {
    width: 100%;
  }
}
.van-hairline--top-bottom::after {
  border: none;
}
</style>
