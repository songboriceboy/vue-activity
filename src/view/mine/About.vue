<template>
  <div class="about"
       v-html="content"></div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      content: ''
    }
  },
  created () {
    this.init()
  },

  methods: {
    // 获取数据
    init () {
      this.$api.mine.getAboutUs()
        .then(res => {
          this.content = res.body
        })
    }
  }
}
</script>

<style lang="less" scoped>
.about {
  padding: 76px 40px;
  font-size: 28px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(102, 102, 102, 1);
  line-height: 40px;
  /deep/ p {
    line-height: 1.5;
    color: rgba(102, 102, 102, 1);
  }
  /deep/ img {
    max-width: 100% !important;
  }
}
</style>

