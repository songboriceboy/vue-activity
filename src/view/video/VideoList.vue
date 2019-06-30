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
          <video-player class="video-player vjs-custom-skin"
                        @play="onPlayerPlay($event, video.id)"
                        @pause="onPlayerPause($event)"
                        @loadeddata="onPlayerLoadeddata($event)"
                        :playsinline="true"
                        :options="video.playerOptions"></video-player>
          <span class="watch-times"
                v-show="!playing">{{ video.watchTimes }}人观看</span>
          <!-- <span class="duration">{{ duration }}</span> -->
        </div>
        <h3>{{ video.title }}</h3>
      </div>
    </van-list>
  </van-pull-refresh>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'

export default {
  name: 'videoList',
  components: { videoPlayer },
  data () {
    return {
      isLoading: false, // 下拉刷新
      loading: false, // 加载中
      finished: false, // 是否已加载完所有数据
      page: 1, // 当前页
      pageSize: 4, // 每页请求的数量
      total: 0, // 总数
      videoData: [], // 数据列表
      id: this.$route.query.id, // 视频模块的id
      playing: false // 播放状态
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
          if (res.errorCode && res.errorCode !== 0) {
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
            title: item.title, // 视频标题
            watchTimes: item.watch_times, // 观看次数
            playerOptions: {
              playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
              autoplay: false, //如果true,浏览器准备好时开始回放。
              muted: false, // 默认情况下将会消除任何音频。
              loop: false, // 导致视频一结束就重新开始。
              preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
              language: 'zh-CN',
              aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
              fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
              sources: [{
                src: item.video,  // 路径
                type: 'video/mp4'  // 类型
              }],
              poster: item.front_cover, //你的封面地址
              notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
              controlBar: {
                timeDivider: true, // 时间分频器
                durationDisplay: true, // 持续时间显示
                remainingTimeDisplay: false, // 剩余时间显示
                fullscreenToggle: true  //全屏按钮
              }
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
    },

    // 开始播放
    onPlayerPlay (player, videoId) {
      console.log('player play!', player)
      this.playing = true

      this.$api.video.postWatch({ video_id: videoId })
        .then(res => {
          console.log(res)
        })
    },

    // 暂停
    onPlayerPause () {
      // console.log('player pause!', player)
    },

    // 加载完成
    onPlayerLoadeddata () {
      // console.log(player)
      // 视频时长
      // console.log(player.duration())
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
    position: relative;
    width: 100%;
    /deep/ .vjs-poster {
      background-size: cover;
    }
    /deep/ .video-js .vjs-big-play-button {
      width: 100px;
      height: 100px;
      border: none;
      border-radius: 50%;
      background-color: transparent;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -50px;
      margin-left: -50px;
      .bg-img("~@images/ic_video_list_play_1");
      .vjs-icon-placeholder {
        display: none;
      }
    }
    .watch-times {
      height: 42px;
      line-height: 42px;
      font-size: 30px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      position: absolute;
      left: 32px;
      bottom: 20px;
    }
    .duration {
      height: 42px;
      font-size: 30px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 42px;
      position: absolute;
      right: 32px;
      bottom: 20px;
    }
  }
}
</style>
