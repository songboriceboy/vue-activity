<template>
  <section class="detial">
    <div class="detail-t">
      <img :src="details.imgSrc"
           :alt="details.title"
           class="img">
      <div class="content">
        <h1>{{ details.title }}</h1>
        <div class="apply-box">
          <!-- <span class="apply">已报名：{{ details.applyed }}/{{ details.total }}人</span> -->
          <span class="apply">报名上限人数：{{ details.total }}人</span>
          <span class="share">
            <share-btn></share-btn>
          </span>
        </div>
        <div class="info">地点：{{ details.address }}</div>
        <div class="info">时间：{{ details.time }}</div>
      </div>
    </div>
    <div class="detail-b">
      <common-tabs>
        <template slot="tab">
          <van-tab v-for="(item, index) of detailData"
                   :key="index"
                   :title="item.tab">
            <div class="tab-container"
                 v-if="item.tab==='活动介绍'">
              <div class="intro"
                   v-if="item.intro.length > 0">
                <img :src="img"
                     v-for="(img, index) of item.intro"
                     :key="index"
                     alt="图片加载失败">
              </div>
              <empty-box v-else></empty-box>
            </div>

            <div class="tab-container"
                 v-if="item.tab==='商户介绍'">
              <div class="content"
                   v-if="item.content"
                   v-html="item.content"></div>
              <empty-box v-else></empty-box>
            </div>

            <div class="tab-container"
                 v-if="item.tab==='体验报告'">
              <div class="reports"
                   v-if="item.reports.length > 0">
                <comment-li v-for="data of item.reports"
                            :details="data"
                            :type="1"
                            :key="data.id"
                            :title="'参与活动: ' + details.title"></comment-li>
              </div>
              <empty-box v-else></empty-box>
            </div>
          </van-tab>
        </template>
      </common-tabs>
    </div>
    <!-- 报名条 -->
    <detail-footer :label="footerData.label"
                   :endTime="footerData.endTime"
                   :routerPath="footerData.routerPath"
                   v-if="activityStatus === 1"></detail-footer>
    <!-- 我的申请状态 -->
    <apply-status :applyStatus="applyStatus"
                  :activityStatus="activityStatus"
                  v-if="activityStatus === 2"></apply-status>
  </section>
</template>

<script>
import commonTabs from '@/components/tabs/Tabs'
import detailFooter from '@/components/footer/Footer'
import applyStatus from '@/components/applyStatus/ApplyStatus'
import emptyBox from '@/components/empty/Empty'
import commentLi from '@/view/public/Comment'
import shareBtn from '@/components/shareBtn/ShareBtn'

import wxapi from '@/common/js/wxapi.js'

export default {
  name: 'activityDetail',
  components: { commonTabs, detailFooter, applyStatus, emptyBox, shareBtn, commentLi },
  data () {
    return {
      details: {}, // 简介内容
      detailData: [
        {
          tab: '活动介绍',
          intro: []
        },
        {
          tab: '商户介绍',
          content: ''
        },
        {
          tab: '体验报告',
          reports: []
        }
      ], // 详情
      footerData: {}, // 报名条
      applyStatus: -1, // 我的申请状态
      activityStatus: 0, // 活动进行状态 // 1进行中、2已结束
      id: this.$route.query.id, // 活动id
      shareUrl: '' // 分享url
    }
  },

  created () {
    this.init()
  },

  methods: {
    // 加载详情
    init () {
      this.shareUrl = location.protocol + "//" + location.hostname + this.$route.path + '?id=' + this.id
      const from = this.$route.query.from // 来源, mine: 我的活动
      if (from === 'mine') {
        this.$api.mine
          .getMyActivityDetail(this.id)
          .then(res => {
            this.dataProcess(res)
          })
      } else {
        this.$api.activity
          .getActivityDetail(this.id)
          .then(res => {
            this.dataProcess(res)
          })
      }
    },

    // 处理数据
    dataProcess (data) {
      // 基本信息
      this.details = {
        id: data.id, // 活动 id
        title: data.name, // 活动名称
        imgSrc: data.front_cover, // 封面图片
        // applyed: data.signs && data.signs.length, // 已经申请的人数
        total: data.limit, // 上限报名人数
        address: data.address, // 活动地点
        time: data.activity_time // 活动的时间
      }

      // 申请状态
      this.applyStatus = (data.apply_status === undefined) ? -1 : data.apply_status

      // 活动进行状态
      this.activityStatus = data.activity_apply_status

      // 底部信息
      this.footerData = {
        endTime: data.activity_apply_end.replace(/-/g, '/'),
        label: '报名',
        routerPath: '/activityApply?id=' + data.id,
        // limited: data.signs.length > data.limit ? true : false
      }

      // 活动介绍, 商户介绍, 体验报告
      this.detailData = [
        {
          tab: '活动介绍',
          intro: data.activity_intro
        },
        {
          tab: '商户介绍',
          content: data.content
        },
        {
          tab: '体验报告',
          reports: data.reports
        }
      ]

      // 初始化分享内容
      wxapi.wxRegister(this.wxRegCallback)
    },

    // wxRegCallback 用于微信JS-SDK回调
    wxRegCallback () {
      this.wxShareTimeline()
      this.wxShareAppMessage()
    },

    // wxShareTimeline 微信自定义分享到朋友圈
    wxShareTimeline () {
      console.log('分享到朋友圈')
      let that = this
      let opstion = {
        title: this.details.title, // 分享标题
        link: this.shareUrl, // 分享链接
        imgUrl: this.details.imgSrc, // 分享图标
        success: function () {
          that.$api.common.share({
            type: 1,
            type_id: that.details.id
          }).then(res => {
            console.log(res, '分享成功')
            // that.$toast('分享成功!')
          })
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
      let that = this
      let option = {
        title: this.details.title, // 分享标题, 
        // desc: '', // 分享描述, 
        link: this.shareUrl, // 分享链接
        imgUrl: this.details.imgSrc, // 分享图标, ，需要绝对路径
        success: () => {
          that.$api.common.share({
            type: 1,
            type_id: that.details.id
          }).then(res => {
            console.log(res, '分享成功')
            // that.$toast('分享成功!')
          })
        },
        error: () => {
          console.log('已取消分享')
          // that.$toast('已取消分享')
        }
      }
      // 将配置注入通用方法
      wxapi.ShareAppMessage(option)
    }
  }
}
</script>

<style lang="less" scoped>
.detial {
  background-color: #fff;
  .detail-t {
    border-bottom: 10px solid rgba(246, 247, 248, 1);
    background-color: #fff;
    .img {
      display: block;
      width: 100%;
      height: 478px;
    }
    .content {
      padding: 42px 32px;
    }
    h1 {
      font-size: 38px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 53px;
    }
    .apply-box {
      .clearfix();
      padding: 10px 0;
    }
    .apply {
      float: left;
      height: 40px;
      font-size: 28px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 69, 0, 1);
      line-height: 40px;
    }
    .share {
      display: block;
      float: right;
      width: 42px;
      height: 40px;
    }
    .info {
      font-size: 26px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(163, 163, 163, 1);
      line-height: 40px;
      margin-top: 6px;
    }
  }
  .detail-b {
    .tab-container {
      padding: 32px 32px 126px;
      .intro {
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>