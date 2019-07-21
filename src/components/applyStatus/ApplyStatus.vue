<template>
  <van-tabbar class="apply-status">
    <template v-if="status === 2 && applyStatus === -1">
      <van-tabbar-item class="end">试用已结束</van-tabbar-item>
    </template>
    <template v-else-if="activityStatus === 2 && applyStatus === -1">
      <van-tabbar-item class="ing">已结束</van-tabbar-item>
    </template>
    <template v-else>
      <van-tabbar-item class="success"
                       v-if="applyStatus === 2">申请成功</van-tabbar-item>
      <van-tabbar-item class="fail"
                       v-else-if="applyStatus === 0">申请失败</van-tabbar-item>
      <van-tabbar-item class="ing"
                       v-else-if="applyStatus === 1">申请中</van-tabbar-item>
    </template>
  </van-tabbar>
</template>

<script>
export default {
  name: 'applyStatus',
  props: {
    applyStatus: {
      default: -1,
    }, // 我的申请状态
    status: {
      default: 0
    }, // 试用进行状态 // 1进行中、2已结束
    activityStatus: {
      default: 0
    } // 活动进行状态 // 1进行中、2已结束
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
  font-size: 34px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
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
  .end {
    font-size: 38px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    background: rgba(229, 229, 229, 1);
  }
}
.van-hairline--top-bottom::after {
  border: none;
}
</style>
