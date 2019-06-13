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
    } // 截止时间
  },
  data () {
    return {
      over: false, // 是否已结束
      leftTimeString: '00天00时00分结束',
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let timer = setInterval(() => {
        if (this.over) {
          clearInterval(timer)
        }
        let leftTime = this.$methods.countDown(this)
        this.leftTimeString = `${leftTime[0]}天${leftTime[1]}时${leftTime[2]}分结束`
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
</style>


