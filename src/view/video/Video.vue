<template>
  <van-pull-refresh v-model="isLoading"
                    @refresh="onRefresh">
    <van-list v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              :offset="200"
              @load="init">
      <div class="video">
        <children-item v-for="item of listData"
                       :key="item.id"
                       :itemData="item"></children-item>
      </div>
    </van-list>
  </van-pull-refresh>
</template>

<script>
import childrenItem from './children/Item'

export default {
  name: 'videoModule',
  components: { childrenItem },
  data () {
    return {
      listData: [], // 列表数据
      isLoading: false, // 下拉刷新
      loading: false, // 加载中
      finished: false, // 是否已加载完所有数据
      page: 1, // 当前页
      pageSize: 10, // 每页请求的数量
      total: 0 // 总数
    }
  },
  methods: {
    // 获取数据列表
    init (refresh) {
      // 已加载所有
      if (this.finished) {
        return false
      }

      // 参数
      const params = {
        page: this.page,
        page_size: this.pageSize
      }

      // 获取列表
      this.$api.video.getVideoModule(params)
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
            id: item.id,
            title: item.name,
            number: item.watch_times,
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
.video {
  padding: 20px;
  .clearfix();
}
</style>
