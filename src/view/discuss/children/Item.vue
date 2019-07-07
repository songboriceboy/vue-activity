<template>
  <div class="item"
       @click="goDiscuss">
    <img :src="itemData.imgSrc"
         :alt="itemData.title"
         class="img" />
    <div class="content">
      <div class="label">#话题</div>
      <h2>{{ itemData.title }}</h2>
      <div class="row">
        <div class="users-box">
          <users-pic :usersPic="itemData.usersPic"
                     :picLen="itemData.picLen"></users-pic>
        </div>
        <van-button type="default"
                    class="button is-radius-button-red">我有话说</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import usersPic from '@/components/usersPic/UsersPic'
export default {
  name: 'discussItem',
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
    // 我有话说
    goDiscuss () {
      location.href = '/discussDetail?id=' + this.itemData.id
      // this.$router.push({ path: '/discussDetail', query: { id: this.itemData.id } })
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
  padding: 17px 24px 38px;
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
    padding-top: 16px;
    display: flex;
    .users-box {
      flex: 1;
      padding: 3px 0;
    }
    .is-radius-button-red {
      .is-radius-button-red();
    }
    .button {
      width: 190px;
      height: 70px;
      border-radius: 35px;
      line-height: 70px;
      font-size: 28px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
