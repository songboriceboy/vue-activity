<template>
  <div class="discuss">
    <discuss-item v-for="item of listData"
                  :key="item.id"
                  :itemData="item"></discuss-item>
  </div>
</template>

<script>
import discussItem from './children/Item'

export default {
  name: 'Discuss',
  components: { discussItem },
  data () {
    return {
      listData: [
        {
          id: '1',
          title: '说说你家乡的秋天1',
          imgSrc: 'http://192.168.100.14:8080/static/pic_discuss_list_1 copy@3x.png',
          usersPic: [
            'http://192.168.100.14:8080/static/pic.png',
            'http://192.168.100.14:8080/static/pic.png',
            'http://192.168.100.14:8080/static/pic.png',
            'http://192.168.100.14:8080/static/pic.png',
            'http://192.168.100.14:8080/static/pic.png'
          ],
        },
        {
          id: '2',
          title: '说说你家乡的秋天2',
          imgSrc: 'http://192.168.100.14:8080/static/pic_discuss_list_1@3x.png',
          usersPic: [
            'http://192.168.100.14:8080/static/pic.png',
            'http://192.168.100.14:8080/static/pic.png',
            'http://192.168.100.14:8080/static/pic.png'
          ],
        },
        {
          id: '3',
          title: '说说你家乡的秋天3',
          imgSrc: 'http://192.168.100.14:8080/static/pic_discuss_list_details_1@3x.png',
          usersPic: [
            'http://192.168.100.14:8080/static/pic.png',
            'http://192.168.100.14:8080/static/pic.png',
            'http://192.168.100.14:8080/static/pic.png',
            'http://192.168.100.14:8080/static/pic.png',
            'http://192.168.100.14:8080/static/pic.png'
          ],
        }
      ]
    }
  },
  methods: {

  }
};
</script>

<style lang="less" scoped>
.discuss {
  padding: 32px;
}
</style>
