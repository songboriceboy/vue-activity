<template>
  <div class="about"
       v-html="content"></div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      content: '<p>联系电话:0755-82330676</p><br /><p>宝贝标题决定展现入口数量。宝贝标题包含的关键词数量一定要多，数量越多被搜索机会就越多。前14天培养链接权重时需要注意以某关键词为核心词，然后通过这个关键词扩展到长尾词、次长尾词，操作时由“次长尾词—长尾词—核心词”的顺序来操作。还有操作需要以手机端为主，电脑端为辅，手机端至少占8成比例。</p>'
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
}
</style>

