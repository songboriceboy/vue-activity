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
          endTime: '15天12时36分结束',
          hasTime: true,
          imgSrc: require('@images/activity/pic_activity_1@3x.png'),
        },
        {
          id: '2',
          title: '招商春季踏青活动2',
          endTime: '0天0时0分结束',
          hasTime: false,
          imgSrc: require('@images/activity/pic_activity_2@3x.png'),
        },
        {
          id: '3',
          title: '招商春季踏青活动3',
          endTime: '11天1时6分结束',
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
