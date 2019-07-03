<template>
  <div class="item"
       @click="rediectTo">
    <div class="video-img">
      <img :src="itemData.imgSrc"
           :alt="itemData.title"
           class="img" />
      <span class="label">视频</span>
    </div>
    <div class="content">
      <h2>{{ itemData.title }}</h2>
      <p>{{ itemData.number }}人观看</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'videoItem',
  props: {
    itemData: {
      required: true,
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {
    // 跳转详情页
    rediectTo () {
      this.$router.push({ path: '/videoList', query: { id: this.itemData.id } })
    }
  }
};
</script>

<style lang="less" scoped>
.item {
  width: 50%;
  box-sizing: border-box;
  padding: 10px;
  float: left;
  .video-img {
    width: 100%;
    height: 190px;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    .img {
      display: block;
      width: 100%;
      height: 100%;
    }
    .label {
      width: 96px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: linear-gradient(
        180deg,
        rgba(253, 150, 108, 1) 0%,
        rgba(242, 58, 23, 1) 100%
      );
      border-radius: 0px 0px 8px 8px;
      font-size: 22px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      position: absolute;
      right: 3px;
      top: 0;
    }
  }
}
.content {
  padding-top: 16px;
  h2 {
    height: 42px;
    font-size: 30px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 42px;
    .ellipsis();
  }
  p {
    height: 33px;
    font-size: 24px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(177, 176, 186, 1);
    line-height: 33px;
  }
}
</style>
