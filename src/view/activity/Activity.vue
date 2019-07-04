<template>
  <van-pull-refresh v-model="isLoading"
                    @refresh="onRefresh">
    <van-list v-model="loading"
              class="activity"
              :finished="finished"
              finished-text="没有更多了"
              :offset="200"
              @load="init">
      <activity-item v-for="item of listData"
                     :key="item.id"
                     :itemData="item"></activity-item>
    </van-list>
  </van-pull-refresh>
</template>

<script>
import activityItem from './children/Item'

export default {
  name: 'activity',
  components: { activityItem },
  data () {
    return {
      isLoading: false, // 下拉刷新
      listData: [], // 列表数据
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
      this.$api.activity.getActivity(params)
        .then((res) => {

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
            id: item.id,
            title: item.name,
            endTime: item.apply_time_prompt,
            hasTime: item.activity_apply_status === 1 ? true : false,
            imgSrc: item.front_cover
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
}
</script>

<style lang="less" scoped>
.activity {
  padding: 32px;
}
</style>
