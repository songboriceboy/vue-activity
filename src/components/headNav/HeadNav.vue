<template>
  <div class="head-nav">
    <van-tabs @click="jump"
              v-model="active"
              background="#F21717"
              title-inactive-color="#FFC5C5"
              title-active-color="#FFF">
      <van-tab v-for="(item,index) in navList"
               :title="item.title"
               :key="index"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'headNav',
  data () {
    return {
      navList: [
        {
          title: '签到',
          path: '/checkin'
        },
        {
          title: '活动报名',
          path: '/activity'
        },
        {
          title: '试用',
          path: '/trial'
        },
        {
          title: '视频',
          path: '/video'
        },
        {
          title: '话题讨论',
          path: '/discuss'
        },
        {
          title: '个人中心',
          path: '/mine'
        }
      ], // 列表
      active: this.$route.query.active || 0
    }
  },

  watch: {
    '$route': function () {
      this.active = this.$route.query.active || 0
    }
  },

  methods: {
    // 跳转页面
    jump (index) {
      const path = this.navList[index].path
      this.$router.push({ path: path, query: { active: index } })
    }
  }
}
</script>

<style lang="less" scoped>
.head-nav {
  height: 86px;
  background-color: #f21717;
  /deep/ .van-tabs--line {
    padding-top: 85px;
    background-color: #f21717;
  }
  /deep/ .van-hairline--top-bottom::after {
    border: none;
  }
  /deep/ .van-tabs--line .van-tabs__wrap {
    height: 85px;
    background-color: #f21717;
  }
  /deep/ .van-tab {
    line-height: 85px;
  }
  /deep/ .van-tabs__line {
    background: #fff;
  }
  /deep/ .van-ellipsis {
    font-size: 32px;
  }
}
</style>

