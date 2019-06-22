<template>
  <div class="content">
    <head-nav></head-nav>
    <div class="wrapper">
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
  watch: {
    '$route' () {
      this.redirect()
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
.wrapper {
  position: absolute;
  top: 85px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  background-color: #fff;
}
</style>
