<template>
  <section class="comment-details">
    <div class="comment-head">
      <div class="info">
        <img :src="details.avatar"
             :alt="details.username"
             class="avatar">
        <div class="info-name">
          <h4>{{ details.username }}</h4>
          <p>{{ details.time }}</p>
        </div>
      </div>
      <div class="likes-box">
        <likes-count :likes="details.likes"></likes-count>
      </div>
    </div>
    <div class="comment">
      <h1>{{ details.title }}</h1>
      <div class="content">{{ details.content }}</div>
      <img-flex :imgs="details.imgs"></img-flex>
    </div>
  </section>
</template>

<script>
import likesCount from '@/components/likes/Likes'
import imgFlex from '@/components/imgFlex/ImgFlex'

export default {
  name: 'commentDetails',
  components: { likesCount, imgFlex },
  data () {
    return {
      details: {
        id: '1',
        username: 'GY',
        avatar: 'http://192.168.100.14:8080/static/pic.png',
        time: '2分钟前',
        likes: 1234,
        title: '参与活动:招商春季踏青活动',
        content: '我参加了2018年09月30日下午13:30，公司踏青活动回归自然，拥抱春天”城南湿地公园踏青活动，进一步丰富公司的的业余文化活动。当天，春风拂面、芳草如茵，100多名居民置身于湿地公园，令人顿感心旷神怡，精神焕发。通过此次活动，不仅增长见识、强身健体，同时也感受了春天的气息，丰富和活跃了大家的文体生活。',
        imgs: [
          'http://192.168.100.14:8080/static/pic_activity_details_2@3x.png',
          'http://192.168.100.14:8080/static/pic_activity_details_3@3x.png',
          'http://192.168.100.14:8080/static/pic_activity_details_2@3x.png',
          'http://192.168.100.14:8080/static/pic_activity_details_2@3x.png',
          'http://192.168.100.14:8080/static/pic_activity_details_3@3x.png'
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comment-details {
  padding: 30px;
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
.comment {
  padding-top: 36px;
  h1 {
    height: 48px;
    font-size: 30px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(68, 68, 68, 1);
    line-height: 48px;
  }
  .content {
    padding-top: 6px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(74, 74, 74, 1);
    line-height: 40px;
  }
}
</style>

