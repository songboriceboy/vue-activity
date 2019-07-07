<template>
  <div class="item"
       @click="toDetails">
    <img :src="itemData.imgSrc"
         :alt="itemData.title"
         class="img" />
    <div class="content">
      <h2>{{ itemData.title }}</h2>
      <div class="row">
        <div class="end-time">{{ itemData.endTime }}</div>
        <span class="apply-status success"
              v-if="itemData.applyStatus === 2">申请成功</span>
        <span class="apply-status ing"
              v-else-if="itemData.applyStatus === 1">申请中</span>
        <span class="apply-status fail"
              v-else>申请失败</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'activityItem',
  props: {
    itemData: {
      required: true,
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    // 详情
    toDetails () {
      location.href = '/activityDetail?id=' + this.itemData.id + '&from=mine'
      // this.$router.push({ path: '/activityDetail', query: { id: this.itemData.id, from: 'mine' } })
    },
  }
};
</script>

<style lang="less" scoped>
.item {
  width: 100%;
  margin-bottom: 32px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 20px 0px rgba(117, 117, 117, 0.14);
  border-radius: 16px;
  overflow: hidden;
  .img {
    display: block;
    width: 100%;
    height: 294px;
  }
}
.content {
  padding: 16px 24px 36px;
  h2 {
    height: 53px;
    font-size: 38px;
    font-weight: 500;
    color: rgba(49, 49, 49, 1);
    line-height: 53px;
    .ellipsis();
  }
  .row {
    padding-top: 3px;
    .clearfix();
    .end-time {
      padding-top: 9px;
      height: 40px;
      font-size: 28px;
      font-weight: 500;
      color: rgba(255, 69, 0, 1);
      line-height: 40px;
      float: left;
    }
    .apply-status {
      float: right;
      display: block;
      padding-top: 9px;
      height: 40px;
      line-height: 40px;
      font-size: 28px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .apply-status.success {
      color: rgba(51, 51, 51, 1);
    }
    .apply-status.fail {
      color: rgba(191, 188, 196, 1);
    }
    .apply-status.ing {
      color: rgba(255, 69, 0, 1);
    }
  }
}
</style>
