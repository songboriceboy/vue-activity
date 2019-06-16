<template>
  <div class="report">
    <van-tabs v-model="active"
              sticky
              animated
              class="report-tabs"
              title-inactive-color="#333"
              title-active-color="#FF4500">
      <van-tab v-for="item of tabs"
               :title="item.name"
               :key="item.id">
        <ul class="list">
          <li v-for="data of lists[active]"
              :key="data.id">
            <div class="img"
                 :style="{backgroundImage: 'url('+data.img+')'}"></div>
            <div class="content">
              <h2>{{ data.title }}</h2>
              <div class="trial-time"
                   v-if="data.endTime">
                <span class="end-time">{{ data.endTime }} 截止</span>
                提供{{ data.number }}份
              </div>
              <div class="activity-time"
                   v-if="data.time">{{ data.time }}</div>
              <div class="row">
                <div class="row-l"
                     v-if="data.price">
                  ¥<span class="price">{{ data.price }}</span>
                </div>
                <div class="button-group">
                  <span class="is-write"
                        v-if="data.isWrite">已填写</span>
                  <van-button type="default"
                              v-else
                              class="is-radius-button-red"
                              @click="goWrite">未填写</van-button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'myReport',
  data () {
    return {
      tabs: [
        {
          id: '0',
          name: '参与试用'
        },
        {
          id: '1',
          name: '参与活动'
        }
      ], // 选项
      lists: {
        '0': [
          {
            id: '1',
            title: 'HFP金盏花舒缓爽肤水 控油收缩毛孔补水保湿健康',
            img: 'http://192.168.100.14:8080/static/pic_on_trial_commodity_1@3x.png',
            price: '430.00',
            number: 4,
            endTime: '2019-06-12',
            isWrite: true
          },
          {
            id: '2',
            title: 'Armani官方阿玛尼满天星手表女镶钻星空手表 ',
            img: 'http://192.168.100.14:8080/static/pic_on_trial_commodity_2@3x.png',
            price: '430.00',
            number: 4,
            endTime: '2019-06-12',
            isWrite: false
          },
          {
            id: '22',
            title: 'Armani官方阿玛尼满天星手表女镶钻星空手表 ',
            img: 'http://192.168.100.14:8080/static/pic_on_trial_commodity_2@3x.png',
            price: '430.00',
            number: 4,
            endTime: '2019-06-12',
            isWrite: false
          },
          {
            id: '24',
            title: 'Armani官方阿玛尼满天星手表女镶钻星空手表 ',
            img: 'http://192.168.100.14:8080/static/pic_on_trial_commodity_2@3x.png',
            price: '430.00',
            number: 4,
            endTime: '2019-06-12',
            isWrite: false
          },
          {
            id: '245',
            title: 'Armani官方阿玛尼满天星手表女镶钻星空手表 ',
            img: 'http://192.168.100.14:8080/static/pic_on_trial_commodity_2@3x.png',
            price: '430.00',
            number: 4,
            endTime: '2019-06-12',
            isWrite: false
          },
          {
            id: '26',
            title: 'Armani官方阿玛尼满天星手表女镶钻星空手表 ',
            img: 'http://192.168.100.14:8080/static/pic_on_trial_commodity_2@3x.png',
            price: '430.00',
            number: 4,
            endTime: '2019-06-12',
            isWrite: false
          },
          {
            id: '27',
            title: 'Armani官方阿玛尼满天星手表女镶钻星空手表 ',
            img: 'http://192.168.100.14:8080/static/pic_on_trial_commodity_2@3x.png',
            price: '430.00',
            number: 4,
            endTime: '2019-06-12',
            isWrite: false
          },
          {
            id: '29',
            title: 'Armani官方阿玛尼满天星手表女镶钻星空手表 ',
            img: 'http://192.168.100.14:8080/static/pic_on_trial_commodity_2@3x.png',
            price: '430.00',
            number: 4,
            endTime: '2019-06-12',
            isWrite: false
          }
        ],
        '1': [
          {
            id: '1',
            title: '招商春季踏青活动',
            img: 'http://192.168.100.14:8080/static/pic_activity_1@3x.png',
            time: '2018年09月30日',
            isWrite: true
          },
          {
            id: '2',
            title: '招商秋季秋游活动',
            img: 'http://192.168.100.14:8080/static/pic_activity_details_2@3x.png',
            time: '2018年10月30日',
            isWrite: false
          }
        ]
      }, // 数据
      active: 0
    }
  },
  methods: {
    // 去填写
    goWrite () {

    }
  }
}
</script>

<style lang="less" scoped>
.report {
  .report-tabs.van-tabs {
    padding-top: 87px;
    position: relative;
    /deep/ .van-tabs__wrap {
      height: 87px;
      line-height: 87px;
      background: rgba(255, 255, 255, 1);
      border-bottom: 1px solid #eeeeee;
    }
    /deep/ .van-ellipsis {
      font-size: 32px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    /deep/ .van-tabs__line {
      width: 96px;
      height: 4px;
    }
  }

  .list {
    padding: 0 30px 30px;
    li {
      display: flex;
      padding: 34px 0;
      border-bottom: 2px solid #eee;
      .img {
        width: 200px;
        height: 200px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
      }
    }
    li:last-child {
      border-bottom: none;
    }
    .content {
      flex: 1;
      box-sizing: border-box;
      padding: 0 0 0 34px;
      h2 {
        font-size: 32px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 45px;
      }
      .trial-time {
        padding-top: 18px;
        font-size: 24px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 44px;
      }
      .activity-time {
        padding-top: 18px;
        height: 40px;
        font-size: 28px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(163, 163, 163, 1);
        line-height: 40px;
      }
      .end-time {
        height: 44px;
        display: inline-block;
        background: rgba(252, 238, 233, 1);
        border-radius: 4px;
        font-size: 24px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(232, 84, 30, 1);
        padding: 0 8px;
      }
      .row {
        display: flex;
        padding-top: 23px;
      }
      .row-l {
        flex: 1;
        font-size: 24px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(232, 84, 30, 1);
        .price {
          font-size: 40px;
        }
      }
      .button-group {
        flex: 1;
        text-align: right;
        .is-write {
          width: 129px;
          height: 50px;
          display: inline-block;
          background: rgba(229, 229, 229, 1);
          border-radius: 25px;
          text-align: center;
          font-size: 26px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
          line-height: 50px;
        }
        .is-radius-button-red {
          .is-radius-button-red();
          width: 129px;
          height: 50px;
          border-radius: 25px;
          text-align: center;
          font-size: 26px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 50px;
        }
      }
    }
  }
}
</style>

