<template>
  <div class="container">
    <div class="share-btn"
         @click="openDialog"></div>
    <van-dialog :value="this.$store.state.shareShow"
                :close-on-click-overlay="true"
                :before-close="closeDialog"
                :showConfirmButton="false"
                className="share-dialog">
      <div class="img"></div>
      <div class="text">
        <p>报名后点击分享可以</p>
        <p>增加报名成功率</p>
      </div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: 'shareBtn',
  data () {
    return {
    }
  },
  methods: {
    // 关闭引导
    closeDialog () {
      this.$store.commit('setShareShow', false)
    },

    // 打开引导
    openDialog () {
      this.$store.commit('setShareShow', true)
    }
  }
}
</script>

<style lang="less" scoped>
.share-btn {
  width: 42px;
  height: 40px;
  .bg-img("~@images/ic_activity_details_share");
}
.share-dialog {
  background-color: transparent;
  top: 100px;
  right: 0;
  width: 100%;
  /deep/ .van-dialog__content {
    overflow: hidden;
    padding: 0 80px;
  }
  .img {
    display: block;
    width: 68px;
    height: 72px;
    float: right;
    .bg-img("~@images/pic_activity_tips_arrow");
  }
  .text {
    float: right;
    margin: 40px 20px 0 0;
    p {
      font-size: 38px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 1.8;
      letter-spacing: 2px;
    }
  }
}
</style>
