<template>
  <div class="topic">
    <img :src="avatar"
         alt="头像"
         class="img">
    <div class="controll">我有话说...</div>
  </div>
</template>

<script>
export default {
  name: 'topic',
  data () {
    return {
      avatar: ''
    }
  },

  created () {
    this.avatar = localStorage.getItem('avatar')
  }
}
</script>

<style lang="less" scoped>
.topic {
  position: absolute;
  left: 30px;
  right: 30px;
  bottom: 40px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 16px 2px rgba(215, 215, 215, 0.78);
  border-radius: 56px;
  padding: 22px 18px;
  display: flex;
  .img {
    display: block;
    width: 72px;
    height: 72px;
    border-radius: 50%;
  }
  .controll {
    flex: 1;
    height: 66px;
    background: rgba(254, 246, 244, 1);
    border-radius: 32px;
    height: 72px;
    line-height: 72px;
    padding: 22px;
    box-sizing: border-box;
  }
}
</style>


