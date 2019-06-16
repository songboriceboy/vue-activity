<template>
  <div class="users-pic">
    <ul class="users-list">
      <li v-for="(item, index) of usersPic"
          :key="index">
        <img :src="item"
             alt="图片">
      </li>
      <li>
        <span class="more"></span>
      </li>
    </ul>
    <div class="label">
      <span class="color">{{ usersPic.length }}</span>人参与
    </div>
  </div>
</template>

<script>
export default {
  name: 'usersPic',
  props: {
    usersPic: {
      default: {}
    }
  }
}
</script>

<style lang="less" scoped>
.users-pic {
  height: 64px;
  line-height: 64px;
  .clearfix();
}
.users-list {
  .clearfix();
  padding-left: 30px;
  float: left;
  li {
    width: 54px;
    height: 54px;
    border: 5px solid #fff;
    background-color: #fff;
    border-radius: 50%;
    overflow: hidden;
    float: left;
    margin-left: -30px;
    img {
      display: block;
      width: 54px;
      height: 54px;
    }
    .more {
      display: block;
      width: 54px;
      height: 54px;
      .bg-img("~@images/pic_on_trial_more");
    }
  }
}
.label {
  height: 64px;
  font-size: 23px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: #b1b1b1;
  line-height: 64px;
  margin-left: 10px;
  float: left;
  .color {
    color: #ff4500;
    font-size: 27px;
  }
}
</style>

