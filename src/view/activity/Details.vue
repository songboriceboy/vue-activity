<template>
  <section class="detial">
    <div class="detail-t">
      <img :src="details.imgSrc"
           :alt="details.title"
           class="img">
      <div class="content">
        <h1>{{ details.title }}</h1>
        <div class="apply-box">
          <span class="apply">已报名:{{ details.applyed }}/{{ details.total }}人</span>
          <span class="share"></span>
        </div>
        <div class="info">地点:{{ details.address }}</div>
        <div class="info">时间:{{ details.time }}</div>
      </div>
    </div>
    <div class="detail-b">
      <common-tabs>
        <template slot="tab">
          <van-tab v-for="(item, index) of detailData"
                   :key="index"
                   :title="item.tab">
            <div class="tab-container"
                 v-html="item.content"
                 v-if="item.content"></div>
            <empty-box v-else></empty-box>
          </van-tab>
        </template>
      </common-tabs>
    </div>
    <detail-footer></detail-footer>
  </section>
</template>

<script>
import commonTabs from '@/components/tabs/Tabs'
import detailFooter from '@/components/footer/Footer'
import emptyBox from '@/components/empty/Empty'
export default {
  name: 'activityDetail',
  components: { commonTabs, detailFooter, emptyBox },
  data () {
    return {
      details: {
        id: 1,
        title: '招商春季踏青活动1',
        imgSrc: require('@images/activity/pic_activity_details_1@3x.png'),
        applyed: 22,
        total: 100,
        address: '福田莲花山',
        time: '2019年4月26日12:00-2019年4月27日12:00'
      }, // 简介内容
      detailData: [
        {
          tab: '活动介绍',
          content: '<img src="https://upload.jianshu.io/users/upload_avatars/9520297/66bfa8a8-d0e5-4631-904e-0b8662799b4b.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120" />><img src="https://upload.jianshu.io/admin_banners/web_images/4660/224da83c76e01d5deff07e163615921233af5c82.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" alt="title" />',
        },
        {
          tab: '商户介绍',
          content: '<p>商户介绍字段商户介绍字段商户介绍字段商户介绍字段商户介绍字段商户介绍字段商户介绍字段商户介绍字段商户介绍字段商户介绍字段商户介绍字段商户介绍字段商户介绍字段商户介绍字段商户介绍</p><img src="https://upload.jianshu.io/admin_banners/web_images/4672/20312e92bba4622441b74ea42977598e0bbbe4c4.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" alt="title" />'
        },
        {
          tab: '体验报告',
          content: ''
        }
      ] // 详情
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
      .bg-img("~@images/activity/ic_activity_details_share");
    }
    .info {
      font-size: 28px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(163, 163, 163, 1);
      line-height: 40px;
      margin-top: 6px;
    }
  }
  .detail-b {
    .tab-container {
      padding: 16px 32px 126px;
    }
  }
}
</style>

