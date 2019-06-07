<template>
  <div class="checkin">
    <span class="check-rule"></span>
    <check-calendar></check-calendar>
  </div>
</template>

<script>
import CheckCalendar from './children/Calendar'

export default {
  name: 'checkin',
  components: { CheckCalendar },
  data () {
    return {

    }
  },
  methods: {

  }
};
</script>

<style lang="less" scoped>
.checkin {
  position: absolute;
  top: 85px;
  left: 0;
  right: 0;
  bottom: 0;
  .bg-img("~@images/checkin/pic_checkin_background");
  .check-rule {
    width: 200px;
    height: 62px;
    display: block;
    position: absolute;
    right: 0;
    top: 30px;
    .bg-img("~@images/checkin/pic_checkin_rule");
  }
}
</style>
