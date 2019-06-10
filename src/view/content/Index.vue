<template>
  <div class="content">
    <head-nav></head-nav>
    <div class="scroll-content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Content',
  data () {
    return {

    }
  },
  mounted () {
    this.redirect()
  },
  methods: {
    // 重定向至签到页
    redirect () {
      let path = this.$route.path
      if (path === '' || path === '/') {
        this.$router.push({ path: '/checkin' })
      }
    }
  }
};
</script>

<style lang="less">
.scroll-content {
  position: absolute;
  top: 85px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-x: auto;
}
</style>
