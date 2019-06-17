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
      // this.$api.checkin.getRules().then(res => {
      //   let result = res.data
      //   if (result.errorCode === 0) {
      //     this.rulesText = result.content
      //     this.rulesControl = true
      //   }
      // })
      this.rulesText = '<p>1、签到按月计算 </p><p>2、每天签到都可以点亮 </p><p>3、单个周内连续签到7天可抽奖，同一周内最多可抽1次 </p><p>4、每日最多签到1次，断签清零重新签</p>'
      this.rulesControl = true
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
  top: 0;
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
