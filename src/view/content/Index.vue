<template>
  <div class="index-container">
    <div class="header-box">
      <head-nav></head-nav>
    </div>
    <div class="index-content"
         ref="content">
      <div class="wrapper">
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

  created () {
    this.overscroll(document.querySelector('.index-content'))
    document.body.addEventListener('touchmove', function (evt) {
      // 在这种情况下，默认行为是滚动正文
      // 会导致溢出 由于我们不希望这样，我们阻止默认。
      if (!evt._isScroller) {
        evt.preventDefault()
      }
    })
  },

  methods: {
    // 重定向至签到页
    redirect () {
      let path = this.$route.path
      if (path === '' || path === '/') {
        this.$router.push({ path: '/checkin' })
      }
    },

    // 处理微信页面下拉黑底的问题
    overscroll (el) {
      el.addEventListener('touchstart', function () {
        let top = el.scrollTop
        let totalScroll = el.scrollHeight
        let currentScroll = top + el.offsetHeight
        // 如果我们位于容器的顶部或底部 滚动，向上或向下推一个像素。
        // 这可以防止滚动“穿过”到body
        if (top === 0) {
          el.scrollTop = 1
        } else if (currentScroll === totalScroll) {
          el.scrollTop = top - 1
        }
      })
      el.addEventListener('touchmove', function (evt) {
        // 如果内容实际上是可滚动的，即内容足够长
        // 可以进行滚动
        if (el.offsetHeight < el.scrollHeight)
          evt._isScroller = true
      })
    }
  }
};
</script>

<style lang="less" scoped>
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
.wrapper {
  min-height: calc(100% + 1px);
  background-color: #fff;
}
</style>
