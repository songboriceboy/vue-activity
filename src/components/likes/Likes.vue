<template>
  <span class="likes"
        @click="onLikes">
    <span class="liked"
          v-if="num === 1"></span>
    <span class="like"
          v-else></span>
    <span class="text">{{ newLikes }}</span>
  </span>
</template>

<script>
export default {
  name: 'likes',
  props: {
    likes: {
      default: 0
    }, // 点赞数量
    myLike: {
      default: false
    }, // 是我点赞的
    type: {
      default: ''
    }, // 类型 1：活动报告 2：试用报告 3：话题评论
    typeId: {
      default: ''
    } // 数据id
  },

  data () {
    return {
      newLikes: 0, // 点赞数
      num: 0 // -1/1
    }
  },

  created () {
    // 如果是我点赞的
    this.num = this.myLike ? 1 : -1
    this.newLikes = this.likes
  },

  methods: {
    // 点赞
    onLikes () {
      const params = {
        type: this.type, // 1：活动报告 2：试用报告 3：话题评论
        type_id: this.typeId // 报告id
      }
      this.$api.common.likes(params)
        .then(res => {
          if (res && res.errorCode === 0) {
            this.num = (this.num === 1) ? -1 : 1
            this.newLikes = this.newLikes + this.num
          } else {
            this.$toast(res.message)
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
.likes {
  display: inline-block;
  line-height: 32px;
  .like,
  .liked {
    display: inline-block;
    width: 32px;
    height: 32px;
    vertical-align: middle;
    .bg-img("~@images/ic_discuss_comment_1");
  }
  .liked {
    .bg-img("~@images/ic_discuss_comment_2");
  }
  .text {
    height: 32px;
    display: inline-block;
    vertical-align: middle;
    font-size: 24px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    padding-left: 10px;
  }
}
</style>

