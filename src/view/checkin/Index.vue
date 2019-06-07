<template>
  <div class="checkin-index">
    <van-button round
                type="danger">点击签到</van-button>
    <span class="icon"></span>
    <span class="text">文字</span>
  </div>
</template>

<script>
export default {
  name: 'checkinIndex',
  data () {
    return {
    };
  },
  methods: {

  }
};
</script>

<style lang="less">
.icon {
  display: block;
  width: 162px;
  height: 155px;
  .bg-img("~@images/mine/pic_mine_avatar");
}
.text {
  color: @text-color;
}
</style>
