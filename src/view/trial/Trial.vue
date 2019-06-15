<template>
  <div class="trial">
    <trial-item v-for="item of listData"
                :key="item.id"
                :itemData="item"></trial-item>
  </div>
</template>

<script>
import trialItem from './children/Item'

export default {
  name: 'Trial',
  components: { trialItem },
  data () {
    return {
      listData: [
        {
          id: '1',
          title: 'HFP金盏花舒缓爽肤水 控油收缩毛孔补水保 湿健康水化妆护肤品男女',
          imgSrc: 'http://192.168.100.14:8080/static/pic_on_trial_commodity_1@3x.png',
          price: '430.00',
          quantity: 4,
          usersPic: [
            'http://192.168.100.14:8080/static/pic.png',
            'http://192.168.100.14:8080/static/pic.png',
            'http://192.168.100.14:8080/static/pic.png',
            'http://192.168.100.14:8080/static/pic.png',
            'http://192.168.100.14:8080/static/pic.png'
          ],
          endTime: '2019-06-18',
          hasTime: true
        },
        {
          id: '2',
          title: 'Armani官方阿玛尼满天星手表女镶钻星空手表 潮流女士腕表AR1926',
          imgSrc: 'http://192.168.100.14:8080/static/pic_on_trial_commodity_2@3x.png',
          price: '3938.0',
          quantity: 1,
          usersPic: [
            'http://192.168.100.14:8080/static/pic.png',
          ],
          endTime: '2019-06-13',
          hasTime: false
        }
      ]
    }
  },
  methods: {

  }
};
</script>

<style lang="less">
.trial {
  padding: 32px;
}
</style>
