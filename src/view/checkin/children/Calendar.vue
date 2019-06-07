<template>
  <div class="calendar">
    <div class="message">已连续签到 {{ calendarData.days }} 天，距离幸运又近了一步</div>
    <div class="container">
      <van-row type="flex"
               justify="center">
        <van-col span="8">
          <div class="left"><i></i></div>
        </van-col>
        <van-col span="8">
          <div class="time">{{ calendarData.curYear }}年{{ calendarData.curMonth }}月</div>
        </van-col>
        <van-col span="8">
          <div class="right"><i></i></div>
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
          <li v-for="num in calendarData.curMonthDays"
              :key="num"
              :class="{red: calendarData.curDay === num}">
            {{ num }}
            <span class="checked"
                  v-if="calendarData.checkinDays.indexOf(num) > -1"></span>
            <span class="record"
                  v-if="calendarData.recordDay.indexOf(num) > -1">
              <i class="icon"></i>
              中奖纪录
            </span>
            <span class="invalid"
                  v-if="calendarData.invaildDay.indexOf(num) > -1">
              <i class="icon"></i>
              已过期
            </span>
            <span class="success"
                  v-if="calendarData.successDay.indexOf(num) > -1">
              <i class="icon"></i>
              去抽奖
            </span>
          </li>
        </ul>
      </div>
      <van-button type="default"
                  class="isRadiusButton">
        <i class="calendar-icon"></i>
        <span class="button-text">点击签到</span>
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data () {
    return {
      cnNumbers: ['一', '二', '三', '四', '五', '六', '日'],
      calendarData: {
        curYear: 2019, // 当前年份
        curMonth: 6, // 当前月份
        curDay: 24, // 当前日期
        curMonthDays: 30, // 该月的天数
        checkinDays: [6, 7, 9, 10, 11], // 已签到的日期
        invaildDay: [3], // 已作废的日期
        successDay: [], // 可以抽奖的日期
        recordDay: [25], // 已经抽奖的日期
        days: 3, // 连续签到的天数
      }
    }
  },
  methods: {

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
    height: 50px;
    i {
      display: inline-block;
      width: 35px;
      height: 21px;
      margin-top: 14px;
      .bg-img("~@images/checkin/pic_checkin_previous");
    }
  }
  .right {
    width: 100%;
    height: 50px;
    i {
      display: inline-block;
      width: 35px;
      height: 21px;
      margin-top: 14px;
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
      padding: 22px 0;
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
        margin: 0 auto;
      }
      .invalid,
      .success,
      .record {
        display: block;
        width: 88px;
        text-align: center;
        font-size: 22px;
        position: absolute;
        top: 8px;
        right: 5px;
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
          .bg-img("~@images/checkin/pic_checkin_turntable");
        }
      }
    }
  }

  .isRadiusButton {
    width: 468px;
    height: 88px;
    line-height: 88px;
    display: block;
    text-align: center;
    margin: 10px auto 0;
    font-size: 0;
    .isRadiusButton();
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
  }
}
</style>
