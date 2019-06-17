<template>
  <span class="likes">
    <span class="liked"
          v-if="myLike"></span>
    <span class="like"
          v-else></span>
    <span class="text">{{ likes }}</span>
  </span>
</template>

<script>
export default {
  name: 'likes',
  props: {
    likes: {
      default: 0
    },
    myLike: {
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
.likes {
  display: inline-block;
  line-height: 28px;
  .like,
  .liked {
    display: inline-block;
    width: 27px;
    height: 27px;
    vertical-align: middle;
    .bg-img("~@images/ic_discuss_comment_1");
  }
  .liked {
    .bg-img("~@images/ic_discuss_comment_2");
  }
  .text {
    height: 28px;
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    padding-left: 10px;
  }
}
</style>

