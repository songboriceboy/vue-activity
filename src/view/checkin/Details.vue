<template>
  <div class="details">
    <div class="details-form-row">
      <van-field v-model="infos.username"
                 ref="username"
                 label="收件人"
                 input-align="right"
                 :readonly="readonly"
                 placeholder="请填写收件人" />
      <van-field v-model="infos.phone"
                 type="number"
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
                 type="textarea"
                 label-width="100%"
                 placeholder="请填写详细地址"
                 rows="5"
                 autosize />
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
  </div>
</template>

<script>
import areaList from '@/common/js/area.js';

export default {
  name: 'lotteryDetails',
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
      }
    }
  },
  created () {
    if (this.readonly) {
      this.init()
    }
  },
  computed: {
    readonly () {
      return this.edit === '1' ? true : false;
    }
  },
  methods: {
    // 获取提交的资料
    init () {
      this.infos = {
        username: 'GuoYou.Li',
        phone: '13510748985',
        areas: '深圳市南山区西丽街道',
        address: '麒麟公寓',
      }
    },

    // 完成地区选择
    onConfirm (data) {
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
    },

    // 提交校验
    validate () {
      if (!this.infos.username) {
        this.$toast('请填写收件人!')
        // this.$refs.username.focus()
        return false
      }

      if (!this.infos.phone) {
        this.$toast('请填写联系电话!')
        // this.$refs.username.focus()
        return false
      }

      if (!this.infos.areas) {
        this.$toast('请选择所在地区!')
        // this.$refs.username.focus()
        return false
      }

      if (!this.infos.address) {
        this.$toast('请填写详细地址!')
        // this.$refs.username.focus()
        return false
      }
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
}
</style>

