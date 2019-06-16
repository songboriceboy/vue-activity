<template>
  <div class="content">
    <head-nav></head-nav>
    <div class="wrapper"
         ref="wrapper">
      <div class="scroll-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
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
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        taps: true
      })
    });
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
  overflow: hidden;
}
.scroll-content {
  min-height: 100%;
  background-color: #fff;
}
</style>
