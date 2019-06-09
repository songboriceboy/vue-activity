<template>
  <div class="content">
    <head-nav></head-nav>
    <div class="scroll-content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Content',
  data () {
    return {

    }
  }
};
</script>

<style lang="less">
.scroll-content {
  position: absolute;
  top: 85px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-x: auto;
}
</style>
