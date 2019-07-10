<template>
  <div class="details">
    <div class="details-form-row">
      <span class="count-len">{{ len }}/100</span>
      <van-field v-model="username"
                 label="姓名:"
                 maxlength="16"
                 input-align="right"
                 placeholder="请填写姓名" />
      <van-field v-model="phone"
                 ref="phone"
                 type="tel"
                 maxlength="11"
                 input-align="right"
                 label="联系电话:"
                 placeholder="请填写电话号码" />
      <div class="details-form-row-label">反馈内容:</div>
      <van-field v-model="content"
                 maxlength="100"
                 type="textarea"
                 label-width="100%"
                 placeholder="请输入100字以内的反馈内容"
                 @input="inputCountLen"
                 rows="5" />
    </div>
    <van-button type="default"
                class="is-radius-button-red"
                @click="onSubmit">提交</van-button>
    <!-- 弹框 -->
    <message-box :show="this.$store.state.messageShow"
                 :title="messageTitle"
                 :content="messageContent"
                 :back="back"></message-box>
  </div>
</template>

<script>
import messageBox from '@/components/message/Message'
export default {
  name: 'suggest',
  components: { messageBox },
  data () {
    return {
      username: '', // 姓名
      phone: '', // 联系电话
      content: '', // 反馈内容
      len: 0, // 已经输入的长度
      messageTitle: '', // 弹框提示
      messageContent: '', // 提示内容
      back: false // 跳转至上一页
    }
  },
  created () {

  },
  methods: {

    // 提交资料
    onSubmit () {
      if (!this.validate()) {
        return false
      }

      const params = {
        user_name: this.username,
        user_tel: this.phone,
        message: this.content
      }

      this.$api.mine.postSuggest(params)
        .then(res => {
          if (res.errorCode === 0) {
            this.username = ''
            this.phone = ''
            this.content = ''
            this.len = 0
            this.showMessage('提交成功', '您的意见已提交成功!', true)
          } else {
            this.$toast(res.message)
          }
        })
    },

    // 显示提示
    showMessage (title, content, back) {
      this.$store.commit('setMessageShow', true)
      this.messageTitle = title
      this.messageContent = content
      this.back = back
    },

    // 提交校验
    validate () {
      if (!this.username) {
        this.$toast('请填写姓名!')
        return false
      }

      if (this.username.length > 16) {
        this.$toast('姓名长度超长!')
        return false
      }

      if (!this.phone) {
        this.$toast('请填写电话号码!')
        return false
      }

      if (!this.telNumValidate()) {
        return false
      }

      if (!this.content) {
        this.$toast('请填写反馈内容!')
        return false
      }

      if (this.content.length > 100) {
        this.$toast('反馈内容过长!')
        return false
      }
      return true
    },

    // 输入计算长度
    inputCountLen (val) {
      this.len = val.length
    },

    // 电话号码校验
    telNumValidate () {
      if (!this.$methods.telNumValidate(this.phone)) {
        this.$toast('电话号码格式不正确')
        this.$refs.phone.focus()
        return false
      }
      return true
    }
  }
}
</script>

<style lang="less" scoped>
.details {
  .is-radius-button-red {
    .is-radius-button-red();
    width: 80%;
    height: 92px;
    line-height: 92px;
    display: block;
    margin: 78px auto 0;
    font-size: 38px;
  }
  .details-form-row {
    position: relative;
    /deep/ .van-cell textarea.van-field__control {
      border: none;
      background: rgba(246, 248, 250, 1);
    }
  }
  .count-len {
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(188, 188, 188, 1);
    position: absolute;
    bottom: 70px;
    right: 50px;
    z-index: 9;
  }
}
</style>

