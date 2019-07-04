<template>
  <div class="comment">
    <div class="comment-head">
      <div class="info">
        <img :src="details.user.avatar"
             :alt="details.user.name"
             class="avatar">
        <div class="info-name">
          <h4>{{ details.user.name }}</h4>
          <p>{{ details.created_at }}</p>
        </div>
      </div>
      <div class="likes-box">
        <likes-count :likes="details.like_times"
                     :type="type"
                     :myLike="details.has_zan"
                     :typeId="details.id"></likes-count>
      </div>
    </div>
    <div class="content"
         @click="toCommentDetails">
      <h2>{{ title }}</h2>
      <p>{{ details.content | contentFormatter }}</p>
    </div>
    <img-flex :imgs="images"
              v-if="images && images.length > 0"></img-flex>
  </div>
</template>

<script>
import likesCount from '@/components/likes/Likes'
import imgFlex from '@/components/imgFlex/ImgFlex'
export default {
  name: 'comment',
  components: { likesCount, imgFlex },
  props: {
    details: {},
    type: {
      default: 0
    }, // 点赞类型
    title: {
      default: ''
    } // 标题
  },
  computed: {
    images () {
      return this.details.images && this.details.images.slice(0, 3)
    }
  },
  methods: {
    // 跳转
    toCommentDetails () {
      this.$router.push({ path: '/CommentDetails', query: { type: this.type, id: this.details.id } })
    }
  },
  filters: {
    // 内容截取
    contentFormatter (str) {
      return str.length < 50 ? str : str.slice(0, 50) + '...'
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
  padding: 34px 0 32px;
}
.comment-head {
  display: flex;
  .info {
    flex: 1;
    overflow: hidden;
  }
  .info-name {
    padding-left: 22px;
    float: left;
    h4 {
      height: 48px;
      font-size: 30px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 48px;
    }
    p {
      height: 33px;
      font-size: 24px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(189, 189, 189, 1);
      line-height: 33px;
    }
  }
  .avatar {
    float: left;
    display: block;
    width: 76px;
    height: 76px;
    border-radius: 50%;
  }
  .likes-box {
    flex: 1;
    overflow: hidden;
    text-align: right;
    padding-top: 20px;
  }
}
.content {
  padding-top: 32px;
  h2 {
    height: 40px;
    font-size: 28px;
    font-family: PingFangSC-Medium;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 40px;
    margin-bottom: 5px;
    .ellipsis();
  }
  p {
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 50px;
    letter-spacing: 1px;
  }
}
</style>

