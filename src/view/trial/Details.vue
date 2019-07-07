<template>
  <section class="detial">
    <div class="detail-t">
      <img :src="details.imgSrc"
           :alt="details.title"
           class="img">
      <div class="content">
        <h1>{{ details.title }}</h1>
        <div class="row-box">
          <div class="price-box">
            ¥<span class="price">{{ details.price }}</span>
            <span class="text">提供{{ details.stock }}份</span>
          </div>
          <div class="share">
            <share-btn></share-btn>
          </div>
        </div>
        <users-pic :usersPic="details.usersPic"
                   :picLen="details.picLen"></users-pic>
      </div>
    </div>
    <div class="detail-b">
      <common-tabs>
        <template slot="tab">
          <van-tab v-for="(item, index) of detailData"
                   :key="index"
                   :title="item.tab">
            <div class="tab-container"
                 v-if="item.tab==='产品详情'">
              <div class="intro"
                   v-if="item.content.length > 0">
                <img v-for="(img, index) of item.content"
                     :src="img"
                     :key="index"
                     alt="图片加载失败">
              </div>
              <empty-box v-else></empty-box>
            </div>

            <div class="tab-container"
                 v-if="item.tab==='体验报告'">
              <div class="reports-container"
                   v-if="item.reports.length > 0">
                <comment-li v-for="data of item.reports"
                            :details="data"
                            :type="2"
                            :key="data.id"
                            :title="'试用产品: ' + details.title"></comment-li>
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
                   v-if="status === 1"></detail-footer>
    <!-- 我的申请状态 -->
    <apply-status :applyStatus="applyStatus"
                  :status="status"
                  v-if="status === 2"></apply-status>
  </section>
</template>

<script>
import commonTabs from '@/components/tabs/Tabs'
import detailFooter from '@/components/footer/Footer'
import applyStatus from '@/components/applyStatus/ApplyStatus'
import emptyBox from '@/components/empty/Empty'
import usersPic from '@/components/usersPic/UsersPic'
import commentLi from '@/view/public/Comment'
import shareBtn from '@/components/shareBtn/ShareBtn'

import wxapi from '@/common/js/wxapi.js'

export default {
  name: 'trialDetail',
  components: { commonTabs, detailFooter, emptyBox, usersPic, commentLi, applyStatus, shareBtn },
  data () {
    return {
      details: {}, // 简介内容
      detailData: [
        {
          tab: '产品详情',
          content: '', // 产品详情
        },
        {
          tab: '体验报告',
          reports: [] // 体验报告
        }
      ], // 详情
      footerData: {},
      applyStatus: -1, // 我的申请状态
      id: this.$route.query.id, // 试用品id
      status: 0, // 试用状态  1进行中 2已结束
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
          .getMyTryUseDetail(this.id)
          .then(res => {
            this.dataProcess(res)
          })
      } else {
        this.$api.trial
          .getTryUseDetail(this.id)
          .then(res => {
            this.dataProcess(res)
          })
      }
    },

    // 处理数据
    dataProcess (data) {
      // 基本信息
      this.details = {
        id: data.id, // 产品id
        title: data.name, // 产品名称
        imgSrc: data.front_cover, // 产品图片
        stock: data.stock, // 库存数量
        price: data.price, // 产品价格
        usersPic: (data.signs.length < 6) ? data.signs : data.signs.slice(0, 5), // 申请用户
        picLen: data.signs.length // 申请用户总数
      }

      // 申请状态
      this.applyStatus = (data.apply_status === undefined) ? -1 : data.apply_status

      // 试用状态
      this.status = data.status

      // 底部信息
      this.footerData = {
        endTime: data.apply_end.replace(/-/g, '/'), // 截止时间
        label: '申请试用', // 按钮文字
        routerPath: '/trialApply?id=' + data.id // 跳转地址
      }

      // 产品详情, 体验报告
      this.detailData = [
        {
          tab: '产品详情',
          content: data.product_intro
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
      let that = this
      let opstion = {
        title: this.details.title, // 分享标题
        link: this.shareUrl, // 分享链接
        imgUrl: this.details.imgSrc, // 分享图标
        success: function () {
          that.$api.common.share({
            type: 2,
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
            type: 2,
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
      height: 480px;
    }
    .content {
      padding: 16px 30px 40px;
    }
    h1 {
      font-size: 32px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 45px;
    }
    .row-box {
      .clearfix();
      padding: 10px 0;
    }
    .price-box {
      float: left;
      height: 60px;
      font-size: 24px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 69, 0, 1);
      line-height: 60px;
      .price {
        font-size: 42px;
      }
      .text {
        vertical-align: top;
        font-size: 22px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(167, 167, 167, 1);
        line-height: 60px;
        padding-left: 13px;
      }
    }
    .share {
      display: block;
      float: right;
      width: 42px;
      height: 40px;
    }
  }
  .detail-b {
    padding: 0 0 126px;
    .reports-container {
      padding: 30px;
      /deep/ .comment {
        border-bottom: 1px solid #e5e5e5;
      }
      /deep/ .comment:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>

