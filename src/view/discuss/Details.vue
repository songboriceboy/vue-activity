<template>
  <section class="detial">
    <div class="detail-t">
      <img :src="details.imgSrc"
           :alt="details.title"
           class="img">
      <div class="content">
        <h1>{{ details.title }}</h1>
        <div class="row-box">
          <div class="users-box">
            <users-pic :usersPic="details.usersPic"
                       :picLen="details.picLen"></users-pic>
          </div>
          <div class="share">
            <share-btn></share-btn>
          </div>
        </div>
        <div class="acticle">{{ details.content }}</div>
      </div>
    </div>
    <div class="detail-b">
      <h2>参与话题</h2>
      <ul class="comments">
        <li v-for="(item, index) of comments"
            :key="index">
          <div class="info">
            <span class="img"
                  :style="{backgroundImage: 'url('+item.user.avatar+')'}"></span>
            <div class="info-r">
              <h5>{{ item.user.name | nameFilter }}</h5>
              <p>{{ item.created_at }}</p>
            </div>
            <div class="handle">
              <div class="delete-btn"
                   v-if="item.is_owner"
                   @click="deleteComment(item.id)">
                <i></i>
                <span class="text">删除</span>
              </div>
              <div class="likes-box">
                <likes-count :likes="item.like_times"
                             :type="3"
                             :myLike="item.has_zan"
                             :typeId="item.id"></likes-count>
              </div>
            </div>
          </div>
          <div class="comment-content">{{ item.comment }}</div>
        </li>
      </ul>
      <div v-if="comments.length === 0"
           class="empty">期待您的参与</div>
    </div>
    <topic-children :id="details.id"></topic-children>
  </section>
</template>

<script>
import usersPic from '@/components/usersPic/UsersPic'
import likesCount from '@/components/likes/Likes'
import shareBtn from '@/components/shareBtn/ShareBtn'
import topicChildren from './children/Topic'

import wxapi from '@/common/js/wxapi.js'

export default {
  name: 'discussDetail',
  components: { usersPic, likesCount, topicChildren, shareBtn },
  data () {
    return {
      details: {}, // 简介内容
      comments: [], // 评论列表
      shareUrl: '' // 分享url
    }
  },

  created () {
    this.init()
  },

  methods: {
    // 初始化
    init () {
      this.shareUrl = location.protocol + "//" + location.hostname + this.$route.path + '?id=' + this.id
      const id = this.$route.query.id
      this.$api.discuss
        .getTopicDetail(id)
        .then(res => {
          // 详情
          this.details = {
            id: res.id,
            title: res.title,
            imgSrc: res.front_cover,
            usersPic: (res.users.length < 6) ? res.users : res.users.slice(0, 5),
            picLen: res.users.length,
            content: res.content
          }

          // 评论列表
          this.comments = res.comments

          // 初始化分享内容
          wxapi.wxRegister(this.wxRegCallback)
        })
    },

    // wxRegCallback 用于微信JS-SDK回调
    wxRegCallback () {
      this.wxShareTimeline()
      this.wxShareAppMessage()
    },

    // wxShareTimeline 微信自定义分享到朋友圈
    wxShareTimeline () {
      let opstion = {
        title: this.details.title, // 分享标题
        link: this.shareUrl, // 分享链接
        imgUrl: location.protocol + '//' + location.hostname + '/logo.png', // 分享图标
        success: function () {
          console.log('分享成功')
          // that.$toast('分享成功!')
        },
        error: function () {
          console.log('已取消分享')
          // that.$toast('已取消分享')
        }
      }
      // 将配置注入通用方法
      wxapi.ShareTimeline(opstion)
    },

    // 微信自定义分享给朋友
    wxShareAppMessage () {
      let option = {
        title: this.details.title, // 分享标题, 
        // desc: '', // 分享描述, 
        link: this.shareUrl, // 分享链接
        imgUrl: location.protocol + '//' + location.hostname + '/logo.png', // 分享图标, ，需要绝对路径
        success: () => {
          console.log('分享成功')
          // that.$toast('分享成功!')
        },
        error: () => {
          console.log('已取消分享')
          // that.$toast('已取消分享')
        }
      }
      // 将配置注入通用方法
      wxapi.ShareAppMessage(option)
    },

    // 删除评论
    deleteComment (id) {
      this.$dialog.confirm({
        title: '提示',
        message: '是否删除当前评论?'
      }).then(() => {
        this.$api.discuss
          .delTopicComment(id)
          .then(res => {
            if (res && res.errorCode === 0) {
              this.$toast('删除成功!')
              // 在评论列表中去掉该评论
              const list = this.comments
              if (list) {
                let len = list.length
                for (let i = 0; i < len; i++) {
                  if (list[i].id === id) {
                    list.splice(i, 1)
                    break
                  }
                }
              }
            } else {
              this.$toast(res.message)
            }
          })
      }).catch(() => {
        this.$toast('已取消删除!')
      })
    }
  },

  filters: {
    // 名称过滤
    nameFilter (val) {
      return val.length > 10 ? val.slice(0, 8) + '...' : val
    }
  }
}
</script>

<style lang="less" scoped>
.detial {
  background-color: #fff;
  .detail-t {
    border-bottom: 20px solid rgba(246, 247, 248, 1);
    background-color: #fff;
    .img {
      display: block;
      width: 100%;
      height: 480px;
    }
    .content {
      padding: 32px 32px 50px;
    }
    h1 {
      font-size: 38px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 53px;
    }
    .row-box {
      .clearfix();
      padding: 32px 0 30px;
    }
    .users-box {
      float: left;
      font-size: 24px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 69, 0, 1);
    }
    .share {
      display: block;
      float: right;
      width: 42px;
      height: 40px;
      padding: 12px;
    }
    .acticle {
      font-size: 28px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 40px;
    }
  }
  .detail-b {
    padding: 50px 30px 150px;
    background-color: #fff;
    h2 {
      height: 42px;
      font-size: 30px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 42px;
    }
    .empty {
      color: #999;
      font-size: 28px;
      font-family: PingFangSC-Semibold;
    }
  }
  .comments {
    padding-top: 40px;
    li {
      margin-bottom: 30px;
      background: rgba(246, 247, 248, 1);
      border-radius: 16px;
      padding: 38px 25px 25px 21px;
      position: relative;
    }
    li:nth-child(even) {
      background: rgba(254, 246, 244, 1);
    }
    .info {
      display: flex;
      .img {
        display: block;
        width: 78px;
        height: 78px;
        border-radius: 50%;
        overflow: hidden;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
      }
      .info-r {
        flex: 1;
        padding-left: 24px;
      }
      h5 {
        height: 42px;
        font-size: 30px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 42px;
        letter-spacing: 1px;
      }
      p {
        height: 33px;
        font-size: 24px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 33px;
      }
      .handle {
        position: absolute;
        top: 38px;
        right: 25px;
        text-align: right;
      }
      .delete-btn {
        display: inline-block;
        margin-right: 30px;
        vertical-align: middle;
        i {
          display: inline-block;
          width: 32px;
          height: 32px;
          .bg-img("~@images/ic_discuss_comment_delete");
          margin-right: 13px;
          vertical-align: middle;
        }
        .text {
          display: inline-block;
          vertical-align: middle;
          font-size: 24px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(174, 174, 174, 1);
          line-height: 32px;
        }
      }
      .likes-box {
        display: inline-block;
        vertical-align: middle;
      }
    }
    .comment-content {
      padding-top: 23px;
      font-size: 28px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 40px;
    }
  }
}
</style>