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
          <div class="share"></div>
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
                   :routerPath="footerData.routerPath"></detail-footer>
  </section>
</template>

<script>
import commonTabs from '@/components/tabs/Tabs'
import detailFooter from '@/components/footer/Footer'
import emptyBox from '@/components/empty/Empty'
import usersPic from '@/components/usersPic/UsersPic'
import commentLi from '@/view/public/Comment'

export default {
  name: 'trialDetail',
  components: { commonTabs, detailFooter, emptyBox, usersPic, commentLi },
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
      id: this.$route.query.id // 试用品id
    }
  },

  created () {
    this.init()
  },

  methods: {
    // 加载详情
    init () {
      this.$api.trial
        .getTryUseDetail(this.id)
        .then(res => {
          this.dataProcess(res)
        })
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

      // 底部信息
      this.footerData = {
        endTime: data.apply_end, // 截止时间
        label: '申请使用', // 按钮文字
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
      .bg-img("~@images/ic_activity_details_share");
    }
  }
  .detail-b {
    padding: 0 0 126px;
    .reports-container {
      padding: 30px;
    }
  }
}
</style>

