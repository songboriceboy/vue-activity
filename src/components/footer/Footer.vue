<template>
  <van-tabbar route
              class="footer">
    <van-tabbar-item class="footer-l">
      <div class="label">距结束仅剩</div>
      <ul class="time-list">
        <li class="time-val">12</li>
        <li class="time-split">:</li>
        <li class="time-val">12</li>
        <li class="time-split">:</li>
        <li class="time-val">12</li>
        <li class="time-split">:</li>
        <li class="time-val">12</li>
      </ul>
    </van-tabbar-item>
    <van-tabbar-item class="footer-r"
                     replace
                     to="/">
      {{ label }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: 'detailFooter',
  props: {
    label: {
      default: '报名'
    }
  }
}
</script>

<style lang="less" scoped>
.footer {
  width: 100%;
  background-color: #ff4500;
  display: flex;
  height: 110px;
  line-height: 110px;
  .footer-l {
    flex: 1;
    overflow: hidden;
    .label {
      padding: 0 36px;
      height: 37px;
      font-size: 26px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(247, 248, 251, 1);
      line-height: 37px;
      float: left;
    }
  }
  .time-list {
    .clearfix();
    float: left;
    li {
      float: left;
    }
    .time-val {
      width: 37px;
      height: 37px;
      line-height: 37px;
      background: linear-gradient(
        360deg,
        rgba(255, 245, 198, 1) 0%,
        rgba(255, 252, 239, 1) 100%
      );
      border-radius: 6px;
      font-size: 26px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(243, 104, 65, 1);
    }
    .time-split {
      width: 20px;
      height: 37px;
      font-size: 26px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(247, 248, 251, 1);
      line-height: 37px;
      text-align: center;
    }
  }
  .footer-r {
    background: rgba(245, 166, 35, 1);
    width: 257px;
    flex: initial;
    font-size: 38px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    text-align: center;
  }
  /deep/ .van-tabbar-item__icon {
    display: none;
  }
  /deep/ .van-tabbar-item__text {
    width: 100%;
  }
}
</style>
