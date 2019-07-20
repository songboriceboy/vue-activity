<template>
  <div class="index-container">
    <div class="header-box">
      <head-nav></head-nav>
    </div>
    <div class="index-content"
         ref="content">
      <div class="index-wrapper">
        <router-view />
      </div>
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
      this.$refs.content.scrollTop = 0
      // document.documentElement.scrollTop = 0
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
.index-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
}
.header-box {
  height: 86px;
  width: 100%;
}
.index-content {
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.index-wrapper {
  min-height: calc(100% + 1px);
  background-color: #fff;
}
</style>
