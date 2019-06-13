<template>
  <div class="activity">
    <activity-item v-for="item of listData"
                   :key="item.id"
                   :itemData="item"></activity-item>
  </div>
</template>

<script>
import activityItem from './children/Item'

export default {
  name: 'activity',
  components: { activityItem },
  data () {
    return {
      listData: [
        {
          id: '1',
          title: '招商春季踏青活动1',
          endTime: '2019-06-30 00:00:00',
          hasTime: true,
          imgSrc: require('@images/activity/pic_activity_1@3x.png'),
        },
        {
          id: '2',
          title: '招商春季踏青活动2',
          endTime: '2019-06-01 00:00:00',
          hasTime: false,
          imgSrc: require('@images/activity/pic_activity_2@3x.png'),
        },
        {
          id: '3',
          title: '招商春季踏青活动3',
          endTime: '2019-06-16 00:00:00',
          hasTime: true,
          imgSrc: require('@images/activity/pic_activity_3@3x.png'),
        }
      ]
    }
  },
  methods: {

  }
};
</script>

<style lang="less" scoped>
.activity {
  padding: 32px;
  overflow: hidden;
}
</style>
