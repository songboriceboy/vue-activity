<template>
  <div class="empty">
    <span class="img"></span>
    <p>暂无数据～</p>
  </div>
</template>

<script>
export default {
  name: 'emptyBox'
}
</script>

<style lang="less" scoped>
.empty {
  width: 100%;
  height: 390px;
  padding-top: 135px;
  background-color: #fff;
  .img {
    display: block;
    width: 185px;
    height: 180px;
    margin: 0 auto;
    .bg-img("~@images/pic_activity_experience_1");
  }
  p {
    text-align: center;
    height: 40px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(179, 179, 179, 1);
    line-height: 40px;
    margin-top: 10px;
  }
}
</style>
