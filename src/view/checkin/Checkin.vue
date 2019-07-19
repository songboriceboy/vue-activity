<template>
  <div class="checkin">
    <span class="check-rule"
          @click="openRules"></span>
    <!-- 签到日历组件 -->
    <check-calendar></check-calendar>
    <!-- 签到规则 -->
    <check-rules :show="rulesControl"
                 :key="rulesControl"
                 :text="rulesText"
                 @close="closeRules"></check-rules>
  </div>
</template>

<script>
import checkCalendar from './children/Calendar'
import checkRules from './children/Rules'

export default {
  name: 'checkin',
  components: { checkCalendar, checkRules },
  data () {
    return {
      rulesControl: false, // 签到规则弹框控制
      rulesText: '' // 签到规则内容
    }
  },
  methods: {
    // 查看规则
    openRules () {
      // 节流
      if (!this.rulesText) {
        this.$api.checkin.getRules().then(res => {
          if (res) {
            const textArr = res.content.split('\n')
            let text = ''
            if (textArr && textArr.length > 0) {
              for (let item of textArr) {
                text += '<p>' + item + '</p>'
              }
            }
            this.rulesText = text
            this.rulesControl = true
          }
        })
      } else {
        this.rulesControl = true
      }
    },

    // 关闭签到规则弹框
    closeRules () {
      this.rulesControl = false
    }
  }
};
</script>

<style lang="less" scoped>
.checkin {
  position: absolute;
  top: 86px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  .bg-img("~@images/checkin/pic_checkin_background");
  .check-rule {
    width: 200px;
    height: 62px;
    display: block;
    position: absolute;
    right: 0;
    top: 30px;
    .bg-img("~@images/checkin/pic_checkin_rule");
  }
}
</style>
