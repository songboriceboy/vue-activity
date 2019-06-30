<template>
  <div class="img-container">
    <ul class="img-flex">
      <li v-for="(item, index) of imgs"
          :key="index">
        <span class="img"
              @click="viewImage(index)"
              :style="{backgroundImage: 'url('+ item +')'}"></span>
      </li>
    </ul>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
export default {
  name: 'imgFlex',
  props: {
    imgs: [Array]
  },
  methods: {
    // 查看大图
    viewImage (index) {
      ImagePreview({
        images: this.imgs,
        startPosition: index,
        onClose () {
          // do something
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.img-container {
  padding: 26px 0;
}
.img-flex {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.img-flex > li {
  width: 32%; /* calc里面的运算符两边要空格 */
  height: 0;
  margin-right: 2%;
  margin-bottom: 2%;
  padding-bottom: 32%;
  overflow: hidden;
  text-align: center;
  color: #fff;
  font-size: 50px;
  line-height: 2;
  border-radius: 5px;
}
.img-flex > li:nth-of-type(3n) {
  /* 选择个数是3的倍数的元素 */
  margin-right: 0;
}
.img-flex > li:nth-last-child(1),
.img-flex > li:nth-last-child(2),
.img-flex > li:nth-last-child(3) {
  /* 选择倒数的三个元素，n可以取0 */
  margin-bottom: 0;
}
.img-flex > li .img {
  display: block;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
