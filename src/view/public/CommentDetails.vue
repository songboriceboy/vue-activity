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
        <likes-count :likes="details.likes"
                     v-if="details.id"
                     :type="type"
                     :myLike="details.hasZan"
                     :typeId="id"></likes-count>
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
      details: {},
      type: 0, // 1：活动报告 2：试用报告 3：话题评论
      id: 0 // 类型 报告 id
    }
  },

  created () {
    this.init()
  },

  methods: {
    // 查询数据
    init () {
      this.type = parseInt(this.$route.query.type)
      this.id = parseInt(this.$route.query.id)

      this.$api.common.getReport(this.id)
        .then(res => {
          this.details = {
            id: res.id,
            username: res.user.name,
            avatar: res.user.avatar,
            time: res.created_at, // 时间
            likes: res.like_times, // 点赞数
            title: this.type === 1 ? '参与活动：' + res.activity_report.name : '试用产品：' + res.try_use_report.name,
            content: res.content,
            imgs: res.images,
            hasZan: res.has_zan // 是否是我点赞的
          }
        })
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
    font-size: 30px;
    font-family: PingFangSC-Medium;
    font-weight: bold;
    color: rgba(68, 68, 68, 1);
    line-height: 48px;
  }
  .content {
    padding-top: 10px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(74, 74, 74, 1);
    line-height: 40px;
  }
}
</style>

