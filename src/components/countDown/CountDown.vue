<template>
  <span class="count-down">{{ leftTimeString }}</span>
</template>

<script>
export default {
  name: 'countDown',
  props: {
    endTime: {
      type: String,
      default: ''
    }, // 截止时间
    interval: {
      default: 0
    } // 间隔
  },
  data () {
    return {
      over: false, // 是否已结束
      leftTimeString: '00天00时00分结束',
    }
  },
  watch: {
    over: function (val) {
      if (val) {
        this.$emit('change')
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let interval = this.interval || 1000
      // 初始化
      this.start()
      // 间隔 interval 执行一次
      let timer = setInterval(() => {
        if (this.over) {
          clearInterval(timer)
        }
        this.start()
      }, interval)
    },

    start () {
      let leftTime = this.$methods.countDown(this)
      this.leftTimeString = `${leftTime[0]}天${leftTime[1]}时${leftTime[2]}分结束`
    }
  }
}
</script>

<style lang="less" scoped>
</style>


