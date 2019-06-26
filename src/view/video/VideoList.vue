<template>
  <van-pull-refresh v-model="isLoading"
                    @refresh="onRefresh">
    <van-list v-model="loading"
              class="video-list"
              :finished="finished"
              finished-text="没有更多了"
              :offset="200"
              @load="init">
      <div class="video-item"
           v-for="video of videoData"
           :key="video.id">
        <div class="video-box">
          <my-video :sources="video.sources"
                    :options="video.options"></my-video>
        </div>
        <h3>{{ video.title }}</h3>
      </div>
    </van-list>
  </van-pull-refresh>
</template>

<script>
import myVideo from 'vue-video'

export default {
  name: 'videoList',
  components: { myVideo },
  data () {
    return {
      isLoading: false, // 下拉刷新
      loading: false, // 加载中
      finished: false, // 是否已加载完所有数据
      page: 1, // 当前页
      pageSize: 4, // 每页请求的数量
      total: 0, // 总数
      videoData: [], // 数据列表
      id: this.$route.query.id // 视频模块的id
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
      this.$api.video.getVideo(this.id, params)
        .then(res => {
          if (res.code && res.code !== 0) {
            this.$toast('暂无数据!')
            this.isLoading = false
            this.loading = false
            this.finished = true
            return false
          }

          // 下拉刷新
          if (refresh) {
            this.videoData = []
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
          if (this.videoData.length >= this.total) {
            this.finished = true
          }
        })
    },

    // 处理数据
    dataProcessing (data) {
      if (data && data.length > 0) {
        for (let item of data) {
          this.videoData.push({
            id: item.id,
            title: item.title,
            sources: [{
              src: item.video,
              type: 'video/mp4'
            }],
            options: {
              autoplay: false, // 是否自动播放
              volume: 0.4, // 音量降到40%
              poster: item.front_cover // 默认封面图
            }
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
.video-list {
  .video-item {
    padding-bottom: 20px;
    h3 {
      height: 85px;
      font-size: 32px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 85px;
      padding: 0 30px;
      .ellipsis();
    }
  }
  .video-box {
    background-color: #f3f3f3;
    width: 100%;
  }
}
</style>
