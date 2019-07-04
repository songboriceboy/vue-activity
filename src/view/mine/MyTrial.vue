<template>
  <van-pull-refresh v-model="isLoading"
                    @refresh="onRefresh">
    <van-list v-model="loading"
              class="trial"
              :finished="finished"
              finished-text="没有更多了"
              :offset="200"
              @load="init">
      <trial-item v-for="item of listData"
                  :key="item.id"
                  :itemData="item"></trial-item>
    </van-list>
  </van-pull-refresh>
</template>

<script>
import trialItem from './children/TrialItem'

export default {
  name: 'myTrial',
  components: { trialItem },
  data () {
    return {
      listData: [], // 列表数据
      isLoading: false, // 下拉刷新
      loading: false, // 加载中
      finished: false, // 是否已加载完所有数据
      page: 1, // 当前页
      pageSize: 5, // 每页请求的数量
      total: 0 // 总数
    }
  },

  methods: {

    // 初始化列表
    init (refresh) {
      if (this.finished) {
        return false
      }

      // 参数
      const params = {
        page: this.page,
        page_size: this.pageSize
      }

      // 获取列表
      this.$api.mine.getMyTryUse(params)
        .then(res => {
          if (res.errorCode && res.errorCode !== 0) {
            this.$toast('未获取到数据!')
            this.isLoading = false
            this.loading = false
            this.finished = true
            return false
          }

          // 下拉刷新
          if (refresh) {
            this.listData = []
            this.dataProcessing(res.data)
            this.isLoading = false
            this.$toast('刷新成功')
          } else {
            this.dataProcessing(res.data)
          }

          this.total = res.total
          this.page++

          // 加载状态结束
          this.loading = false

          // 数据全部加载完成
          if (this.listData.length >= this.total) {
            this.finished = true
          }
        })
    },

    // 处理数据
    dataProcessing (data) {
      if (data && data.length > 0) {
        for (let item of data) {
          this.listData.push({
            id: item.id, // 试用id
            title: item.name, // 标题
            price: item.price, // 价格
            quantity: item.stock, // 库存数量
            usersPic: (item.signs.length < 6) ? item.signs : item.signs.slice(0, 5), // 前五个用户头像
            picLen: item.signs.length, // 报名人数
            endTime: item.apply_end, // 截止时间
            applyStatus: item.apply_status, // 申请状态：0 申请失败，1 申请中，2 申请成功
            imgSrc: item.front_cover // 封面图片
          })
        }
      }
    },

    // 下拉刷新
    onRefresh () {
      this.finished = false
      this.page = 1
      // 防止执行上拉加载
      this.loading = true

      this.init(true)
    }
  }
};
</script>

<style lang="less">
.trial {
  padding: 32px;
}
</style>
