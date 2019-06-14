<template>
  <div class="content">
    <head-nav></head-nav>
    <div class="scroll-content"
         ref="wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
// import BScroll from 'better-scroll'
export default {
  name: 'Content',
  data () {
    return {

    }
  },
  // watch: {
  //   '$route' (to, from) {
  //     console.log(to, from)
  //     this.scroll = new BScroll(this.$refs.wrapper, { scrollY: true })
  //   }
  // },
  // mounted () {
  //   this.redirect()
  //   setTimeout(() => {
  //     this.scroll = new BScroll(this.$refs.wrapper, { scrollY: true })
  //   }, 20)
  // },
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
