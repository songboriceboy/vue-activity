<template>
  <section class="video-list">
    <div class="video-item"
         v-for="video of videoData"
         :key="video.id">
      <div class="video-box">
        <!-- <video :src="video.videoSrc"
               preload="auto"
               webkit-playsinline
               playsinline
               x-webkit-airplay="allow"
               x5-video-player-type="h5"
               x5-video-player-fullscreen="true"
               x5-video-orientation="portraint"
               style="object-fit:fill">

        </video> -->
        <!-- <video id="video"
               src="http://vjs.zencdn.net/v/oceans.mp4"
               controls="controls"
               height="100%"
               width="100%">您的浏览器不支持。</video> -->
        <my-video :sources="video.sources"
                  :options="video.options"></my-video>
      </div>
      <h3>{{ video.title }}</h3>
    </div>
  </section>
</template>

<script>
import myVideo from 'vue-video'

export default {
  name: 'videoList',
  components: { myVideo },
  data () {
    return {
      videoData: [
        {
          id: 1,
          title: '1-让你学会言值爆表',
          sources: [{
            src: 'https://www.runoob.com/try/demo_source/mov_bbb.mp4',
            type: 'video/mp4'
          }],
          options: {
            autoplay: false,
            volume: 0.6,
            poster: 'http://192.168.100.14:8080/static/pic_video_list_play_bg_1@3x.png'
          }
        },
        {
          id: 2,
          title: '2-让你学会如何管理团队',
          sources: [{
            src: 'https://www.runoob.com/try/demo_source/mov_bbb.mp4',
            type: 'video/mp4'
          }],
          options: {
            autoplay: false,
            volume: 0.6,
            poster: 'http://192.168.100.14:8080/static/pic_video_list_play_bg_3@3x.png'
          }
        }
      ]
    }
  },
  methods: {

  }
};
</script>

<style lang="less" scoped>
.video-list {
  padding-top: 30px;
}
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
</style>
