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
          imgSrc: require('@images/discuss/pic_discuss_list_1 copy@3x.png'),
          discussUsers: [
            require('@images/discuss/pic_discuss_comment_head_1@3x.png'),
            require('@images/discuss/pic_discuss_comment_head_2@3x.png'),
            require('@images/discuss/pic_discuss_comment_head_3@3x.png'),
            require('@images/discuss/pic_discuss_comment_head_1@3x.png'),
            require('@images/discuss/pic_discuss_comment_head_3@3x.png')
          ],
          number: 5
        },
        {
          id: '2',
          title: '说说你家乡的秋天2',
          imgSrc: require('@images/discuss/pic_discuss_list_1@3x.png'),
          discussUsers: [
            require('@images/discuss/pic_discuss_comment_head_1@3x.png'),
            require('@images/discuss/pic_discuss_comment_head_2@3x.png'),
            require('@images/discuss/pic_discuss_comment_head_3@3x.png')
          ],
          number: 3
        },
        {
          id: '3',
          title: '说说你家乡的秋天3',
          imgSrc: require('@images/discuss/pic_discuss_list_details_1@3x.png'),
          discussUsers: [
            require('@images/discuss/pic_discuss_comment_head_1@3x.png'),
            require('@images/discuss/pic_discuss_comment_head_2@3x.png'),
            require('@images/discuss/pic_discuss_comment_head_2@3x.png'),
            require('@images/discuss/pic_discuss_comment_head_2@3x.png'),
            require('@images/discuss/pic_discuss_comment_head_2@3x.png'),
            require('@images/discuss/pic_discuss_comment_head_2@3x.png'),
            require('@images/discuss/pic_discuss_comment_head_3@3x.png')
          ],
          number: 7,
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
