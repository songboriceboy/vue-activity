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
            <span class="text">提供{{ details.number }}份</span>
          </div>
          <div class="share"></div>
        </div>
        <users-pic :usersPic="details.usersPic"></users-pic>
      </div>
    </div>
    <div class="detail-b">
      <common-tabs>
        <template slot="tab">
          <van-tab v-for="(item, index) of detailData"
                   :key="index"
                   :title="item.tab">
            <div class="tab-container"
                 v-html="item.intro"
                 v-if="item.intro"></div>
            <div class="reports-container"
                 v-else-if="item.reports">
              <comment-li v-for="data of item.reports"
                          :details="data"
                          :key="data.id"
                          :title="'试用产品: ' + details.title"></comment-li>
            </div>
            <empty-box v-else></empty-box>
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
      details: {
        id: 1,
        title: 'Armani官方阿玛尼满天星手表女镶钻星空手表潮流女士腕表AR1926',
        imgSrc: 'http://192.168.100.14:8080/static/pci_on_trial_commodity_details_1@3x.png',
        number: 2,
        price: '3989.00',
        usersPic: [
          'http://192.168.100.14:8080/static/pic.png',
          'http://192.168.100.14:8080/static/pic.png',
          'http://192.168.100.14:8080/static/pic.png',
          'http://192.168.100.14:8080/static/pic.png',
          'http://192.168.100.14:8080/static/pic.png'
        ]
      }, // 简介内容
      detailData: [
        {
          tab: '产品详情',
          intro: '<img src="http://192.168.100.14:8080/static/pci_on_trial_commodity_details_2@3x.png" alt="图片" /><img src="http://192.168.100.14:8080/static/pci_on_trial_commodity_details_2@3x.png" alt="图片" />',
        },
        {
          tab: '体验报告',
          reports: [{
            id: 3,
            images: [
              'http://192.168.100.14:8080/static/pic_activity_details_2@3x.png',
              'http://192.168.100.14:8080/static/pic_activity_details_3@3x.png',
              'http://192.168.100.14:8080/static/pic_activity_details_2@3x.png',
              'http://192.168.100.14:8080/static/pic_activity_details_2@3x.png',
              'http://192.168.100.14:8080/static/pic_activity_details_3@3x.png'
            ],
            content: 'asdasdsadasd111',
            like_times: 123,
            created_at: '9分钟前',
            user: {
              id: 1,
              name: 'Everan',
              avatar: 'http://192.168.100.14:8080/static/pic.png'
            }
          }]
        }
      ], // 详情
      footerData: {
        endTime: '2019-6-16 22:19:00',
        label: '申请使用',
        routerPath: '/trialApply'
      }
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
    .tab-container {
    }
    .reports-container {
      padding: 30px;
    }
  }
}
</style>

