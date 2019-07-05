<template>
  <van-dialog :value="show"
              :showConfirmButton="false"
              className="message-dialog">
    <div class="container">
      <div class="title">{{ title }}</div>
      <div class="content">
        {{ content }}
      </div>
      <van-button type="default"
                  class="is-radius-button-red"
                  @click="handleClose">确定</van-button>
    </div>
  </van-dialog>
</template>

<script>
export default {
  name: 'messageDialog',
  props: {
    show: {
      default: false
    }, // 显示控制
    title: {
      default: '提示'
    }, // 标题
    content: {
      default: ''
    }, // 信息
    path: {
      default: ''
    }, // 确定之后的跳转地址
    query: {
      default: null
    }, // 参数
    back: {
      default: false
    } // 返回上一页
  },
  data () {
    return {

    }
  },
  methods: {
    // 关闭信息弹框
    handleClose () {
      this.$store.commit('setMessageShow', false)
      if (this.back) {
        this.$router.back()
      } else if (this.path && !this.query) {
        this.$router.push({ path: this.path })
      } else if (this.path && this.query) {
        this.$router.push({ path: this.path, query: this.query })
      }
    },
  }
};
</script>

<style lang="less" scoped>
.message-dialog {
  width: 560px;
}
.container {
  background: rgba(253, 247, 244, 1);
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  overflow: hidden;
  padding: 30px 64px 38px;
  .title {
    font-size: 36px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(49, 49, 49, 1);
    line-height: 50px;
    text-align: center;
  }
}
.content {
  font-size: 32px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(49, 49, 49, 1);
  line-height: 45px;
  text-align: center;
  padding: 16px 0 39px;
}
.is-radius-button-red {
  .is-radius-button-red();
  width: 345px;
  height: 93px;
  line-height: 93px;
  display: block;
  margin: 0 auto;
  font-size: 38px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
</style>
