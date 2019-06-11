<template>
  <div class="item">
    <img :src="itemData.imgSrc"
         :alt="itemData.title"
         class="img" />
    <div class="content">
      <div class="label">#话题</div>
      <h2>{{ itemData.title }}</h2>
      <div class="row">
        <div class="discuss-users-box">
          <discuss-users></discuss-users>
        </div>
        <van-button type="default"
                    class="button is-radius-button-red"
                    @click="goDiscuss">我有话说</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import discussUsers from '@/components/discussUsers/DiscussUsers'
export default {
  name: 'discussItem',
  components: { discussUsers },
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
    // 我有话说
    goDiscuss () {

    }
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
    height: 364px;
  }
}
.content {
  padding: 17px 24px 36px;
  .label {
    height: 40px;
    font-size: 28px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 69, 0, 1);
    line-height: 40px;
  }
  h2 {
    height: 53px;
    font-size: 38px;
    font-weight: 500;
    color: rgba(49, 49, 49, 1);
    line-height: 53px;
    margin-top: 7px;
    .ellipsis();
  }
  .row {
    padding-top: 3px;
    .clearfix();
    .is-radius-button-red {
      .is-radius-button-red();
    }
    .button {
      width: 190px;
      height: 70px;
      line-height: 70px;
      float: right;
      font-size: 28px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
