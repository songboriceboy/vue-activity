<template>
  <div class="calendar">
    <div class="message">{{ statusMessage }}</div>
    <div class="container">
      <van-row type="flex"
               justify="center">
        <van-col span="8">
          <div class="left"
               @click="onPrev"><i></i></div>
        </van-col>
        <van-col span="8">
          <div class="time">{{ curYear }}年{{ curMonth }}月</div>
        </van-col>
        <van-col span="8">
          <div class="right"
               @click="onNext"><i></i></div>
        </van-col>
      </van-row>
      <div class="content">
        <ul class="title">
          <li v-for="(item, index) in cnNumbers"
              :key="index">
            {{ item }}
          </li>
        </ul>
        <ul class="list">
          <template v-for="num in firstDay">
            <li v-if="num < firstDay"
                :key="'0_0'+num"></li>
          </template>
          <li v-for="num in curMonthDays"
              :key="num"
              :class="{red: staticYMD === ''+curYear+curMonth+num}">
            {{ num }}
            <span class="checked"
                  v-if="checkinDays.indexOf(''+curYear+curMonth+num) > -1"></span>
            <span class="record"
                  @click="viewRecord(''+curYear+curMonth+num)"
                  v-if="recordDays.indexOf(''+curYear+curMonth+num) > -1">
              <i class="icon"></i>
              中奖纪录
            </span>
            <span class="invalid"
                  v-if="invaildDays.indexOf(''+curYear+curMonth+num) > -1">
              <i class="icon"></i>
              已过期
            </span>
            <span class="success"
                  @click="goLottery(''+curYear+curMonth+num)"
                  v-if="successDays.indexOf(''+curYear+curMonth+num) > -1">
              <i class="icon"></i>
              去抽奖
            </span>
          </li>
        </ul>
      </div>
      <van-button type="default"
                  class="is-radius-button-red"
                  @click="onCheckin">
        <i class="calendar-icon"></i>
        <span class="button-text">点击签到</span>
      </van-button>
    </div>
    <!-- 签到成功 -->
    <check-success :show="successControl"
                   :key="successControl"
                   :text="successText"
                   :days="days"
                   @close="closeSuccess"></check-success>
    <!-- 抽奖信息弹框 -->
    <info-dialog :show="toastControl"
                 :key="'0_0'+toastControl"
                 :title="recordInfo.infoTitle"
                 :text="recordInfo.infoText"
                 :hasPrize="recordInfo.hasPrize"
                 :infoImg="recordInfo.infoImg"
                 :buttonText="recordInfo.buttonText"
                 @close="closeToast"></info-dialog>
  </div>
</template>

<script>
import checkSuccess from './children/Success'
import InfoDialog from './Dialog'

export default {
  name: 'Calendar',
  components: { checkSuccess, InfoDialog },
  data () {
    return {
      cnNumbers: ['一', '二', '三', '四', '五', '六', '日'], // 日历头部
      staticYMD: '', // 今天日期 201967
      curYear: 0, // 当前年份
      curMonth: 0, // 当前月份
      curDate: 0, // 当前日期
      curMonthDays: 0, // 该月的天数
      firstDay: 0, // 每月 1 日是周几 0~6
      checkinDays: [], // 已签到的日期
      invaildDays: [], // 已作废的日期
      successDays: [], // 可以抽奖的日期
      recordDays: [], // 已经抽奖的日期
      days: 0, // 连续签到的天数
      successControl: false, // 签到成功信息弹框控制
      successText: '', // 签到成功信息
      recordInfo: {
        hasPrize: false, // 是否中奖
        infoTitle: '', // 中奖标题
        infoImg: '', // 中奖图片
        infoText: '', // 中奖信息
        buttonText: '' // 按钮文字
      }, // 中奖纪录信息
      toastControl: false // 详情控制
    }
  },
  created () {
    this.init()
  },
  computed: {
    // 签到状态信息
    statusMessage () {
      let str = ''
      let days = this.days
      if (days === 0) {
        str = '已连续签到 0 天, 点击下方签到按钮开始签到哦!'
      } else if (days > 0 && days < 7) {
        str = '已连续签到 ' + days + ' 天, 距离幸运又近了一步!'
      } else if (days === 7) {
        str = '已连续签到 7 天, 点击"去抽奖"可以参与抽奖!'
      }
      return str;
    }
  },
  methods: {
    // 初始化签到日历数据
    init () {
      const date = new Date()
      this.curYear = date.getFullYear()
      this.curMonth = date.getMonth() + 1
      this.curDate = date.getDate()
      this.staticYMD = '' + this.curYear + this.curMonth + this.curDate

      this.printCalendar(this.curYear, this.curMonth)

      this.getCheckRecord()
    },

    // 获取签到记录
    getCheckRecord (date) {
      let params = { date: date || this.curYear + '-' + this.$methods.addPrefixZero(this.curMonth) }
      this.$api.checkin.getCheckin(params)
        .then(res => {

          if (res && res.length > 0) {
            // 已连续签到次数
            this.days = res[res.length - 1].check_in_times
            let checkinDays = []
            let invaildDays = []
            let successDays = []
            let recordDays = []
            for (let item of res) {
              let time = this.dateFormatter(item.check_in_time)

              // -1 已过期, 0 正常签到, 1 待抽奖, 2 已抽奖
              switch (item.status) {
                case -1:
                  invaildDays.push(time)
                  break
                case 1:
                  successDays.push(time)
                  break
                case 2:
                  recordDays.push(time)
                  break
                default:
                  checkinDays.push(time)
                  break
              }
            }
            // 已签到的日期
            this.checkinDays = checkinDays
            // 已过期的日期
            this.invaildDays = invaildDays
            // 已抽奖的日期
            this.recordDays = recordDays
            // 待抽奖的日期
            this.successDays = successDays
          }
        })
    },

    // 时间格式转化 例如: 2019-06-08 => 201968
    dateFormatter (date) {
      let arr = date.split('-')
      let str = '' + arr[0] + Number(arr[1]) + Number(arr[2])
      return str
    },

    // 遍历日历
    printCalendar (y, m) {
      this.curMonthDays = this.getMonthDays(y, m)
      this.firstDay = this.firstDateToWeek(y, m)
    },

    // 获取月天数
    getMonthDays (y, m) {
      const date = new Date(y, m, 0)
      return date.getDate()
    },

    // 获取每月 1 日是星期几
    firstDateToWeek (y, m) {
      const date = new Date(y + '/' + m + '/1')
      return date.getDay() > 0 ? date.getDay() : 7
    },

    // 上个月
    onPrev () {
      const month = this.curMonth
      if (month > 1) {
        this.curMonth = month - 1
      } else if (month === 1) {
        // 当前是 1 月, 则减少一年
        this.curMonth = 12
        this.curYear--
      }

      this.printCalendar(this.curYear, this.curMonth)

      this.getCheckRecord()
    },

    // 下个月
    onNext () {
      const month = this.curMonth
      if (month < 12) {
        this.curMonth = month + 1
      } else if (month === 12) {
        // 当前是 12 月, 则增加年
        this.curMonth = 1
        this.curYear++
      }

      this.printCalendar(this.curYear, this.curMonth)

      this.getCheckRecord()
    },

    // 点击签到
    onCheckin () {
      if (this.checkinDays.indexOf(this.staticYMD) < 0) {
        this.$api.checkin.postCheckin().then(res => {
          if (res.errorCode === 0) {
            // 签到成功
            this.days = res.check_num
            let str = ''
            if (this.days === 7) {
              this.successDays.push(this.staticYMD)
              str = '恭喜您已连续签到7天，有一次抽奖的机会'
            } else {
              str = '已连续签到' + this.days + '天，继续加油，签满7天可抽奖一次。'
            }
            this.successText = str
            this.successControl = true
            this.checkinDays.push(this.staticYMD)
          } else {
            this.$toast(res.message)
          }
        })
      } else {
        this.$toast('今天已经签过到了, 记得明天再来哦!')
      }
    },

    // 去抽奖
    goLottery (date) {
      this.$router.push({ path: '/lottery', query: { date: date } })
    },

    // 查看中奖纪录
    viewRecord () {
      // console.log(date)
      // this.recordInfo = {
      //   hasPrize: false,
      //   infoTitle: '未中奖,很遗憾！',
      //   infoImg: '',
      //   infoText: '您和奖品只差一丢丢，继续签到下次再抽一次吧。',
      //   buttonText: '返回首页'
      // }
      this.recordInfo = {
        hasPrize: true,
        infoImg: '',
        infoText: '恭喜您抽中奖品: iPad一个',
        buttonText: '查看详情'
      }
      this.toastControl = true
    },

    // 关闭签到成功的信息弹框
    closeSuccess () {
      this.successControl = false
    },

    // 关闭抽奖详情信息
    closeToast () {
      this.toastControl = false
    }
  }
};
</script>

<style lang="less" scoped>
.calendar {
  margin: 126px 40px 0;
  .message {
    width: 608px;
    height: 64px;
    line-height: 64px;
    background: rgba(247, 219, 177, 1);
    border-radius: 12px 12px 0px 0px;
    text-align: center;
    color: #785f3a;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    margin: 0 auto;
  }

  .container {
    width: 634px;
    background-color: #fff;
    border-radius: 30px;
    box-shadow: 0px 2px 20px 0px #000 0.12;
    padding: 20px 18px 30px;
    .van-col {
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 0;
    }
  }
  .left {
    width: 100%;
    height: 36px;
    padding-top: 14px;
    i {
      display: inline-block;
      width: 35px;
      height: 21px;
      .bg-img("~@images/checkin/pic_checkin_previous");
    }
  }
  .right {
    width: 100%;
    height: 50px;
    height: 36px;
    padding-top: 14px;
    i {
      display: inline-block;
      width: 35px;
      height: 21px;
      .bg-img("~@images/checkin/pic_checkin_");
    }
  }
  .time {
    text-align: center;
    color: #666;
    font-size: 36px;
  }

  .content {
    .title {
      padding-top: 20px;
      .clearfix();
    }
    li {
      float: left;
      width: 14.2%;
      height: 44px;
      line-height: 44px;
      text-align: center;
      color: #999;
      padding: 25px 0;
      font-size: 26px;
    }
    .list {
      .clearfix();
      li {
        color: #666;
        position: relative;
      }
      li.red {
        color: @red;
      }
      .checked {
        display: block;
        width: 44px;
        height: 44px;
        position: absolute;
        top: 22px;
        left: 22px;
        .bg-img("~@images/checkin/pic_checkin_pass");
      }
      .icon {
        display: block;
        width: 74px;
        height: 58px;
        margin: 6px 0 0 10px;
      }
      .invalid,
      .success,
      .record {
        display: block;
        width: 100%;
        text-align: center;
        font-size: 22px;
        position: absolute;
        top: 8px;
        right: 0;
      }
      .invalid {
        color: #bec0ca;
        .icon {
          .bg-img("~@images/checkin/pic_checkin_expired");
        }
      }
      .success {
        color: #ffa8a6;
        .icon {
          .bg-img("~@images/checkin/pic_checkin_turntable");
        }
      }
      .record {
        color: #ffa8a6;
        .icon {
          .bg-img("~@images/checkin/ic_checkin");
        }
      }
    }
  }

  .is-radius-button-red {
    .is-radius-button-red();
    width: 468px;
    height: 88px;
    line-height: 88px;
    border-radius: 44px;
    display: block;
    margin: 10px auto 0;
    font-size: 0;
  }
  .calendar-icon {
    display: inline-block;
    margin-right: 14px;
    width: 40px;
    height: 40px;
    vertical-align: middle;
    .bg-img("~@images/checkin/pic_checkin_calendar");
  }
  .button-text {
    font-size: 36px;
    color: #fff;
    vertical-align: middle;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    letter-spacing: 1px;
  }
}
</style>
