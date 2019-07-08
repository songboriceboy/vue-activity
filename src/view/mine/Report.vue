<template>
  <div class="report">
    <van-tabs v-model="active"
              sticky
              animated
              swipeable
              @change="changeTabs"
              class="report-tabs"
              title-inactive-color="#333"
              title-active-color="#FF4500">
      <van-tab v-for="item of tabs"
               :title="item.name"
               :key="item.id">
        <van-list v-model="loading"
                  class="list"
                  :finished="tryFinished"
                  finished-text="没有更多了"
                  :offset="200"
                  @load="init"
                  v-if="active === 0">
          <li v-for="data of tryUseData"
              :key="data.id"
              @click="viewComment(2, data.reportId)">
            <div class="img"
                 :style="{backgroundImage: 'url('+data.frontCover+')'}"></div>
            <div class="content">
              <h2>{{ data.name }}</h2>
              <div class="trial-time">
                <span class="end-time">{{ data.applyEnd }} 截止</span>
                提供{{ data.stock }}份
              </div>
              <div class="row">
                <div class="row-l">
                  ¥<span class="price">{{ data.price }}</span>
                </div>
                <div class="button-group">
                  <span class="is-write"
                        v-if="data.isWrite">已填写</span>
                  <van-button type="default"
                              v-else
                              class="is-radius-button-red"
                              @click="goWrite(data.id, data.name, data.frontCover, 2, data.signId)">未填写</van-button>
                </div>
              </div>
            </div>
          </li>
        </van-list>
        <van-list v-model="loading"
                  class="list"
                  :finished="activityFinished"
                  finished-text="没有更多了"
                  :offset="200"
                  @load="init"
                  v-if="active === 1">
          <li v-for="data of activityData"
              :key="data.id"
              @click="viewComment(1, data.reportId)">
            <div class="img"
                 :style="{backgroundImage: 'url('+data.frontCover+')'}"></div>
            <div class="content">
              <h2>{{ data.name }}</h2>
              <div class="activity-time">{{ data.createdAt }}</div>
              <div class="row">
                <div class="row-l"></div>
                <div class="button-group">
                  <span class="is-write"
                        v-if="data.isWrite">已填写</span>
                  <van-button type="default"
                              v-else
                              class="is-radius-button-red"
                              @click="goWrite(data.id, data.name, data.frontCover, 1, data.signId)">未填写</van-button>
                </div>
              </div>
            </div>
          </li>
        </van-list>
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
          id: 0,
          name: '参与试用'
        },
        {
          id: 1,
          name: '参与活动'
        }
      ], // 选项
      tryUseData: [], // 参与试用数据
      activityData: [], // 参与活动数据
      active: this.$store.state.reportActive || 0, // 0 参与试用 1 参与活动
      loading: false, // 加载中
      tryFinished: false, // 是否已加载完所有数据
      activityFinished: false, // 是否已加载完所有数据
      page: 1, // 当前页
      pageSize: 5, // 每页请求的数量
      tryTotals: 0, // 参与试用总数
      activityTotals: 0 // 参与活动总数
    }
  },
  methods: {
    // 初始化列表
    init () {
      if (this.active === 0 && this.tryFinished) {
        return false
      }

      if (this.active === 1 && this.activityFinished) {
        return false
      }

      // 参数
      const params = {
        page: this.page,
        page_size: this.pageSize
      }

      // 获取列表
      this.$api.mine.getMyReport(params)
        .then((res) => {
          if (res.errorCode && res.errorCode !== 0) {
            this.$toast('未获取到数据!')
            this.loading = false
            this.tryFinished = true
            this.activityFinished = true
            return false
          }

          // 数据处理
          this.dataProcessing(res)
          this.tryTotals = res.try_use.total
          this.activityTotals = res.activity.total
          this.page++

          // 加载状态结束
          this.loading = false

          // 数据全部加载完成
          if (this.tryUseData.length >= this.tryTotals) {
            this.tryFinished = true
          }

          // 数据全部加载完成
          if (this.activityData.length >= this.activityTotals) {
            this.activityFinished = true
          }
        })
    },

    // 处理数据
    dataProcessing (result) {
      const tryData = result.try_use.data
      if (tryData && tryData.length > 0) {
        for (let item of tryData) {
          this.tryUseData.push({
            id: item.id,
            name: item.name, // 名称
            frontCover: item.front_cover, // 图片
            stock: item.stock, // 库存
            price: item.price, // 价格
            signId: item.sign_id, // 报名的id
            reportId: item.report_id, // 报告的id
            applyEnd: item.apply_end, // 截止日期
            isWrite: item.is_write // 1 表示写了报告 0 表示未写
          })
        }
      }

      const activityData = result.activity.data
      if (activityData && activityData.length > 0) {
        for (let item of activityData) {
          this.activityData.push({
            id: item.id,
            name: item.name,
            frontCover: item.front_cover,
            createdAt: item.created_at,
            signId: item.sign_id, // 报名的id
            reportId: item.report_id, // 报告的id
            isWrite: item.is_write // 1 表示写了报告 0 表示未写
          })
        }
      }
    },

    // 去填写
    goWrite (id, title, img, type, signId) {
      this.$router.push({ name: 'write', params: { id: id, title: title, img: img, type: type, signId: signId } })
    },

    // 切换tabs
    changeTabs () {
      this.$store.commit('setReportActive', this.active)
    },

    // 查询我的报告id
    viewComment (type, id) {
      if (id === 0) {
        return false
      }

      this.$router.push({ path: '/CommentDetails', query: { type: type, id: id } })

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

