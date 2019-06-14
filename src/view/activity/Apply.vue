<template>
  <div class="details">
    <div class="details-form-row">
      <span class="count-len">{{ len }}/100</span>
      <van-field v-model="infos.username"
                 label="姓名:"
                 input-align="right"
                 placeholder="请填写姓名" />
      <van-field v-model="infos.phone"
                 type="number"
                 input-align="right"
                 label="联系电话:"
                 placeholder="请填写电话号码" />
      <div class="details-form-row-label">报名理由:</div>
      <van-field v-model="infos.content"
                 maxlength="100"
                 type="textarea"
                 label-width="100%"
                 placeholder="请输入100字以内的报名理由"
                 @input="inputCountLen"
                 rows="5" />
    </div>
    <van-button type="default"
                class="is-radius-button-red"
                @click="onSubmit">提交</van-button>
    <!-- 弹框 -->
    <message-box :show="this.$store.state.messageShow"
                 :title="messageTitle"
                 :content="messageContent"></message-box>
  </div>
</template>

<script>
import messageBox from '@/components/message/Message'
export default {
  name: 'applyActivity',
  components: { messageBox },
  data () {
    return {
      infos: {
        username: '',
        phone: '',
        content: '',
      },
      len: 0, // 已经输入的长度
      messageTitle: '', // 弹框提示
      messageContent: '' // 提示内容
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

      // this.showMessage('提交失败', '已提交报名申请，不能重复申请！')
      this.showMessage('提交成功', '报名申请已提交成功，请耐心等待！')
    },

    // 显示提示
    showMessage (title, content) {
      this.$store.commit('setMessageShow', true)
      this.messageTitle = title
      this.messageContent = content
    },

    // 提交校验
    validate () {
      if (!this.infos.username) {
        this.$toast('请填写姓名!')
        return false
      }

      if (!this.infos.phone) {
        this.$toast('请填写电话号码!')
        return false
      }

      if (!this.infos.content) {
        this.$toast('请填写报名理由!')
        return false
      }
      return true
    },

    // 输入计算长度
    inputCountLen (val) {
      this.len = val.length
    }
  }
}
</script>

<style lang="less" scoped>
@import url("~@/common/style/resetui.less");
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

