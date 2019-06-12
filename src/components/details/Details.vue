<template>
  <van-tabs v-model="active"
            swipeable
            sticky
            animated
            class="detail-tabs"
            title-inactive-color="#333"
            title-active-color="#FF4500">
    <!-- <van-tab v-for="(item, index) of detailData"
             :key="index"
             :title="item.tab">
      <div class="container"
           v-html="item.content"></div>
    </van-tab> -->
    <slot name="tab"></slot>
  </van-tabs>
</template>

<script>
export default {
  name: 'commonDetail',
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
.detail-tabs.van-tabs {
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
    img {
      max-width: 100% !important;
    }
  }
}
</style>
