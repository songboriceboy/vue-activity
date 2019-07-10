<template>
  <div class="details">
    <div class="details-form-row">
      <van-field v-model="infos.username"
                 ref="username"
                 label="收件人"
                 maxlength="16"
                 input-align="right"
                 :readonly="readonly"
                 placeholder="请填写收件人" />
      <van-field v-model="infos.phone"
                 type="text"
                 ref="tel"
                 maxlength="11"
                 input-align="right"
                 :readonly="readonly"
                 label="联系电话"
                 placeholder="请填写联系电话" />
      <van-field v-model="infos.areas"
                 type="tel"
                 input-align="right"
                 :readonly="readonly"
                 label="所在地区"
                 placeholder="请选择所在地区"
                 v-if="readonly" />
      <van-field readonly
                 input-align="right"
                 clickable
                 label="所在地区"
                 :value="infos.areas"
                 placeholder="请选择所在地区"
                 @click="showPicker = true"
                 right-icon="arrow"
                 class="details-form-row-areas"
                 v-else />
      <div class="details-form-row-label">详细地址</div>
      <div v-if="readonly"
           class="readonly-address">{{ infos.address }}</div>
      <van-field v-model="infos.address"
                 v-else
                 maxlength="100"
                 type="textarea"
                 label-width="100%"
                 placeholder="请填写详细地址"
                 rows="5" />
    </div>
    <van-button type="default"
                class="is-radius-button-red"
                @click="onSubmit"
                v-if="!readonly">提交</van-button>
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
                 :path="messagePath"></message-box>
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
      edit: this.$route.query.edit, // 是否可编辑
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
      messagePath: '' // 点击确定之后的跳转地址
    }
  },
  created () {
    if (this.readonly) {
      this.init()
    }
  },
  computed: {
    readonly () {
      return Number(this.edit) === 1 ? false : true;
    }
  },
  methods: {
    // 获取提交的资料
    init () {
      const date = this.$route.query.date // 查询日期
      const params = { date: date }
      this.$api.checkin.getWinRecord(params)
        .then(res => {
          let areas = ''
          if (res.province === res.city) {
            areas = res.province + res.city + res.district
          } else {
            areas = res.province + res.district
          }
          this.infos = {
            username: res.contact_name, // 收件人
            phone: res.contact_phone, // 联系电话
            areas: areas, // 中奖省市区
            address: res.address // 详细地址
          }
          this.toastControl = true
        })
    },

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
        prize_name: this.$route.query.prizeName,
        prize_img: this.$route.query.prizeImg,
        prize_status: 1,
        contact_name: this.infos.username,
        contact_phone: this.infos.phone,
        province: this.province,
        city: this.city,
        district: this.district,
        address: this.infos.address
      }
      this.$api.checkin.postWinPrize(data)
        .then(res => {
          if (res && res.errorCode === 0) {
            this.showMessage('提交成功', '提交成功,您的奖品将会在近期寄出。')
          } else if (res && res.errorCode === 1) {
            this.$toast(res.message)
          }
        })
    },

    // 显示提示
    showMessage (title, content) {
      this.$store.commit('setMessageShow', true)
      this.messageTitle = title
      this.messageContent = content
      this.messagePath = './checkin'
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

