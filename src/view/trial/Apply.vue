<template>
  <div class="details">
    <div class="details-form-row">
      <van-field v-model="infos.username"
                 ref="username"
                 maxlength="16"
                 label="收件人"
                 input-align="right"
                 placeholder="请填写收件人" />
      <van-field v-model="infos.phone"
                 ref="phone"
                 type="tel"
                 maxlength="11"
                 input-align="right"
                 label="联系电话"
                 placeholder="请填写联系电话" />
      <van-field readonly
                 input-align="right"
                 clickable
                 label="所在地区"
                 :value="infos.areas"
                 placeholder="请选择所在地区"
                 @click="showPicker = true"
                 right-icon="arrow"
                 class="details-form-row-areas" />
      <div class="details-form-row-label">详细地址</div>
      <van-field v-model="infos.address"
                 type="textarea"
                 maxlength="100"
                 label-width="100%"
                 placeholder="请填写详细地址"
                 rows="5" />
    </div>
    <van-button type="default"
                class="is-radius-button-red"
                @click="onSubmit">提交</van-button>
    <!-- 城市地区 -->
    <van-popup v-model="showPicker"
               position="bottom">
      <van-area :area-list="areaList"
                title="选择所在地区"
                confirm-button-text="完成"
                cancel-button-text="取消"
                :visible-item-count="3"
                :item-height="60"
                @confirm="onConfirm"
                @cancel="onCancel" />
    </van-popup>
    <!-- 弹框 -->
    <message-box :show="this.$store.state.messageShow"
                 :title="messageTitle"
                 :content="messageContent"
                 :back="back"></message-box>
  </div>
</template>

<script>
import areaList from '@/common/js/area.js'
import messageBox from '@/components/message/Message'

export default {
  name: 'lotteryDetails',
  components: { messageBox },
  data () {
    return {
      areaList, // 城市地区数据
      showPicker: false, // 地区控制
      infos: {
        username: '',
        phone: '',
        areas: '',
        address: '',
      },
      province: '', // 省
      city: '', // 市
      district: '', // 区
      messageTitle: '', // 弹框提示
      messageContent: '', // 提示内容
      back: false, // 跳转回上一页
      id: this.$route.query.id // 试用品id
    }
  },
  methods: {
    // 完成地区选择
    onConfirm (data) {
      this.province = data[0].name
      this.city = data[1].name
      this.district = data[2].name
      if (data) {
        let arr = []
        for (let item of data) {
          if (arr.indexOf(item.name) < 0) {
            arr.push(item.name)
          }
        }
        this.infos.areas = arr.join('')
      }
      this.showPicker = false
    },

    // 取消城市选择
    onCancel () {
      this.showPicker = false
    },

    // 提交资料
    onSubmit () {
      if (!this.validate()) {
        return false
      }

      const data = {
        use_id: this.$route.query.id,
        contact_name: this.infos.username,
        contact_phone: this.infos.phone,
        province: this.province,
        city: this.city,
        district: this.district,
        address: this.infos.address
      }

      this.$api.trial.postTryUse(data)
        .then(res => {
          if (res.errorCode === 0) {
            this.showMessage('提交成功', '报名申请已提交成功，请耐心等待！', true)
          } else if (res.errorCode === 1) {
            this.showMessage('提交失败', '已提交试用申请，不能重复申请！', true)
          } else {
            this.showMessage('提交失败', res.message)
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
      if (!this.infos.username) {
        this.$toast('请填写收件人!')
        return false
      }

      if (this.infos.username.length > 16) {
        this.$toast('收件人字数过多!')
        return false
      }

      if (!this.infos.phone) {
        this.$toast('请填写联系电话!')
        return false
      }

      if (!this.telNumValidate()) {
        return false
      }

      if (!this.infos.areas) {
        this.$toast('请选择所在地区!')
        return false
      }

      if (!this.infos.address) {
        this.$toast('请填写详细地址!')
        return false
      }
      return true
    },

    // 电话号码校验
    telNumValidate () {
      if (!this.$methods.telNumValidate(this.infos.phone)) {
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
}
</style>

