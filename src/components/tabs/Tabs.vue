<template>
  <van-tabs v-model="active"
            swipeable
            sticky
            animated
            class="common-tabs"
            title-inactive-color="#333"
            title-active-color="#FF4500">
    <slot name="tab"></slot>
  </van-tabs>
</template>

<script>
export default {
  name: 'commonTabs',
  props: {
    detailData: {}
  },
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
.common-tabs.van-tabs {
  padding-top: 87px;
  position: relative;
  /deep/ .van-tabs__wrap {
    height: 87px;
    background: rgba(255, 255, 255, 1);
    border-bottom: 1px solid #eeeeee;
  }
  /deep/ .van-ellipsis {
    font-size: 32px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
  }
  /deep/ .van-tabs__line {
    width: 96px;
    height: 4px;
  }
  /deep/ .tab-container {
    background-color: #fff;
    line-height: 1.5;
    img {
      max-width: 100% !important;
    }
    p {
      font-size: 30px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 1.5;
      letter-spacing: 1px;
    }
  }
}
</style>
