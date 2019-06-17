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
        <likes-count :likes="details.like_times"></likes-count>
      </div>
    </div>
    <div class="content">
      <h2>{{ details.title }}</h2>
      <p>{{ details.content }}</p>
    </div>
    <img-flex :imgs="details.images"></img-flex>
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
    title: {
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
  padding: 34px 0 32px;
  border-bottom: 1px solid #e5e5e5;
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
  h2 {
    height: 40px;
    font-size: 28px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 40px;
    .ellipsis();
  }
  p {
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 50px;
  }
}
</style>

