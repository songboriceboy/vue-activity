export default {
  /**
   * 倒计时 后面有时间再改写成 面向对象写法
   * @param {*} self
   */
  countDown(self) {
    // 如果截止时间为空
    if (!self.endTime) {
      self.over = true
      return false
    }

    // 截止时间
    const endTime = new Date(self.endTime)

    // 当前时间
    const nowTime = new Date()

    // 剩余时间 秒
    let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000)

    // 如果截止时间已经过期
    if (leftTime <= 0) {
      self.over = true
      return ['00', '00', '00', '00']
    }

    // 取整
    let D = this.addPrefixZero(parseInt(leftTime / (24 * 60 * 60)))
    let H = this.addPrefixZero(parseInt((leftTime / (60 * 60)) % 24))
    let M = this.addPrefixZero(parseInt((leftTime / 60) % 60))
    let S = this.addPrefixZero(parseInt(leftTime % 60))

    return [D, H, M, S]
  },

  /**
   * 补前缀 0
   * @param {*} number
   */
  addPrefixZero(number) {
    if (number >= 10) {
      return number
    } else {
      return `0${number}`
    }
  }
}
