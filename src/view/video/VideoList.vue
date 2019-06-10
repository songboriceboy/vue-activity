<template>
  <div class="video">
    <video-item v-for="item of listData"
                :key="item.id"
                :itemData="item"></video-item>
  </div>
</template>

<script>
import videoItem from './children/Item'

export default {
  name: 'Video',
  components: { videoItem },
  data () {
    return {
      listData: [
        {
          id: '1',
          title: '深度实践核心技术篇',
          number: 386,
          imgSrc: require('@images/video/pic_video_list_1@3x.png'),
        },
        {
          id: '2',
          title: '设计模式系统讲解与应...',
          number: 233,
          imgSrc: require('@images/video/pic_video_list_2@3x.png'),
        },
        {
          id: '3',
          title: '深度实践核心技术篇',
          number: 3453,
          imgSrc: require('@images/video/pic_video_list_3@3x.png'),
        },
        {
          id: '4',
          title: '设计模式系统讲解与应...',
          number: 233,
          imgSrc: require('@images/video/pic_video_list_2@3x.png'),
        },
        {
          id: '5',
          title: '深度实践核心技术篇',
          number: 3453,
          imgSrc: require('@images/video/pic_video_list_3@3x.png'),
        },
        {
          id: '6',
          title: '设计模式系统讲解与应...',
          number: 233,
          imgSrc: require('@images/video/pic_video_list_2@3x.png'),
        },
        {
          id: '7',
          title: '深度实践核心技术篇',
          number: 3453,
          imgSrc: require('@images/video/pic_video_list_3@3x.png'),
        },
        {
          id: '8',
          title: '设计模式系统讲解与应...',
          number: 233,
          imgSrc: require('@images/video/pic_video_list_2@3x.png'),
        },
        {
          id: '9',
          title: '深度实践核心技术篇',
          number: 3453,
          imgSrc: require('@images/video/pic_video_list_3@3x.png'),
        }
      ]
    }
  },
  methods: {

  }
};
</script>

<style lang="less" scoped>
.video {
  padding: 20px;
  .clearfix();
}
</style>
