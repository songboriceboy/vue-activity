<template>
  <div class="item"
       @click="goTrialDetail">
    <img :src="itemData.imgSrc"
         :alt="itemData.title"
         class="img" />
    <div class="content">
      <h2>{{ itemData.title }}</h2>
      <div class="row">
        <div class="label">
          ¥<span class="price">{{ itemData.price }}</span>
          <span class="text">提供{{ itemData.quantity }}份</span>
        </div>
        <div class="end-time">{{ itemData.endTime }}截止</div>
      </div>
      <div class="row-flex">
        <div class="trial-users-box">
          <users-pic :usersPic="itemData.usersPic"
                     :picLen="itemData.picLen"></users-pic>
        </div>
        <van-button type="default"
                    class="button is-radius-button-red"
                    v-if="itemData.hasTime">申请试用</van-button>
        <van-button type="default"
                    class="button is-radius-button-gray"
                    v-else>已结束</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import usersPic from '@/components/usersPic/UsersPic'
export default {
  name: 'trialItem',
  components: { usersPic },
  props: {
    itemData: {
      required: true,
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {
    // 申请试用
    goTrialDetail () {
      location.href = '/trialDetail?id=' + this.itemData.id
      // this.$router.push({ path: '/trialDetail', query: { id: this.itemData.id } })
    }
  }
};
</script>

<style lang="less" scoped>
.item {
  width: 100%;
  margin-bottom: 32px;
  overflow: hidden;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 8px 2px rgba(229, 229, 229, 0.78);
  border-radius: 8px;
  .img {
    display: block;
    width: 100%;
    height: 395px;
  }
}
.content {
  padding: 28px 30px;
  h2 {
    font-size: 32px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 45px;
  }
  .row {
    padding: 10px 0;
    .clearfix();
    .label {
      float: left;
      height: 59px;
      font-size: 24px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 69, 0, 1);
      line-height: 59px;
    }
    .price {
      font-size: 42px;
    }
    .text {
      height: 30px;
      font-size: 22px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(167, 167, 167, 1);
      line-height: 30px;
      padding-left: 10px;
    }
    .end-time {
      float: right;
      height: 59px;
      font-size: 24px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 69, 0, 1);
      line-height: 59px;
    }
  }
  .row-flex {
    display: flex;
    padding: 10px 0;
  }
  .trial-users-box {
    flex: 1;
  }
  .is-radius-button-red {
    .is-radius-button-red();
  }
  .is-radius-button-gray {
    .is-radius-button-gray();
  }
  .button {
    width: 150px;
    height: 58px;
    float: right;
    font-size: 26px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 58px;
  }
}
</style>
