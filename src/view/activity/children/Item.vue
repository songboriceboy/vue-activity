<template>
  <div class="item"
       @click="toDetails">
    <img :src="itemData.imgSrc"
         :alt="itemData.title"
         class="img" />
    <div class="content">
      <h2>{{ itemData.title }}</h2>
      <div class="row">
        <div class="end-time">
          {{ itemData.endTime }}
          <!-- <count-down :endTime="itemData.endTime"
                      :interval="60000"
                      @change="timeEnd"></count-down> -->
        </div>
        <van-button type="default"
                    class="button is-radius-button-red"
                    v-if="itemData.hasTime">报名</van-button>
        <van-button type="default"
                    class="button is-radius-button-gray"
                    v-else>已结束</van-button>
      </div>
    </div>
  </div>
</template>

<script>
// import countDown from '@/components/countDown/CountDown'
export default {
  name: 'activityItem',
  // components: { countDown },
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
      // over: false // 是否已结束
    }
  },
  methods: {
    // 报名
    // onApply () {
    //   console.log('报名')
    //   return false
    // },

    // 详情
    toDetails () {
      location.href = '/activityDetail?id=' + this.itemData.id
      // this.$router.push({ path: '/activityDetail', query: { id: this.itemData.id } })
    },

    // 时间结束
    // timeEnd () {
    //   this.over = true
    // }
  }
};
</script>

<style lang="less" scoped>
.item {
  width: 100%;
  margin-bottom: 32px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 20px 0px rgba(117, 117, 117, 0.14);
  border-radius: 16px;
  overflow: hidden;
  .img {
    display: block;
    width: 100%;
    height: 294px;
  }
}
.content {
  padding: 16px 24px 36px;
  h2 {
    height: 53px;
    font-size: 38px;
    font-weight: 500;
    color: rgba(49, 49, 49, 1);
    line-height: 53px;
    .ellipsis();
  }
  .row {
    padding-top: 3px;
    .clearfix();
    .end-time {
      padding-top: 9px;
      height: 40px;
      font-size: 28px;
      font-weight: 500;
      color: rgba(255, 69, 0, 1);
      line-height: 40px;
      float: left;
    }
    .is-radius-button-red {
      .is-radius-button-red();
    }
    .is-radius-button-gray {
      .is-radius-button-gray();
    }
    .button {
      width: 151px;
      height: 57px;
      line-height: 57px;
      float: right;
      border-radius: 29px;
      font-size: 26px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
