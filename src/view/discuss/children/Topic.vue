<template>
  <div class="container">
    <div class="topic"
         v-show="!show">
      <span class="img"
            :style="{backgroundImage: 'url('+avatar+')'}"></span>
      <div class="controll"
           @click="openEdit">我有话说...</div>
    </div>
    <van-popup v-model="show"
               position="bottom"
               @click-overlay="handleCancel">
      <div class="message">
        <div class="operate">
          <span class="cancel"
                @click="handleCancel">取消</span>
          <span class="submit"
                @click="handleSubmit">发布</span>
        </div>
        <van-field v-model="message"
                   ref="message"
                   type="textarea"
                   placeholder="我来说两句"
                   class="message-textarea"
                   maxlength="100"
                   @input="inputCountLen"
                   rows="5" />
        <span class="count-len">{{ len }}/100</span>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'topic',
  props: {
    id: {
      default: ''
    }
  },
  data () {
    return {
      show: false, // 是否开启编辑
      message: '', // 内容
      len: 0 // 已经输入的长度
    }
  },
  computed: {
    avatar () {
      let avatar = this.$store.state.userinfo || localStorage.getItem('user_info')
      return JSON.parse(avatar).avatar
    }
  },

  methods: {
    // 输入计算长度
    inputCountLen (val) {
      this.len = val.length
    },

    // 编辑
    openEdit () {
      this.show = true

      setTimeout(() => {
        this.$refs.message.focus()
      }, 300)
    },

    // 取消
    handleCancel () {
      this.$refs.message.blur()
      this.show = false
    },

    // 发布
    handleSubmit () {
      if (this.id === '') {
        this.$toast('话题不存在!')
        return false
      }

      if (!this.message) {
        this.$toast('请输入内容再提交!')
        return false
      }

      if (this.message.length > 100) {
        this.$toast('内容最多为100字符!')
        return false
      }

      const params = {
        topic_id: this.id,
        comment: this.message
      }

      this.$api.discuss.postTopicComment(params)
        .then(res => {
          if (res && res.errorCode === 0) {
            this.$toast('发布成功!')
            // 清空文本框
            this.message = ''
            this.len = 0
            // 刷新页面
            this.$parent.init()
          } else {
            this.$toast(res.message)
          }
        })

      this.handleCancel()
    }
  }
}
</script>

<style lang="less" scoped>
.topic {
  position: fixed;
  left: 30px;
  right: 30px;
  bottom: 40px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 16px 2px rgba(215, 215, 215, 0.78);
  border-radius: 56px;
  padding: 22px 18px;
  display: flex;
  .img {
    display: block;
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .controll {
    flex: 1;
    height: 66px;
    background: rgba(254, 246, 244, 1);
    border-radius: 32px;
    height: 72px;
    line-height: 72px;
    font-size: 30px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 69, 0, 1);
    padding: 0 22px;
    box-sizing: border-box;
    margin-left: 15px;
  }
}
.message {
  background-color: #fff;
  padding: 0 20px 27px;
  .operate {
    overflow: hidden;
    height: 90px;
    line-height: 90px;
  }
  .cancel {
    float: left;
    padding-right: 20px;
    font-size: 30px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(193, 193, 193, 1);
  }
  .submit {
    float: right;
    padding-left: 20px;
    font-size: 30px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(249, 121, 108, 1);
  }
  /deep/ .message-textarea {
    background: rgba(246, 248, 250, 1);
    border-radius: 8px;
    padding: 12px 14px;
    box-sizing: border-box;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #333;
    line-height: 1.5;
  }
  .count-len {
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(193, 193, 193, 1);
    display: block;
    height: 40px;
    line-height: 40px;
    position: absolute;
    bottom: 33px;
    right: 35px;
    z-index: 9;
  }
}
</style>


