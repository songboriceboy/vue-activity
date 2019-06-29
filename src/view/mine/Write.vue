<template>
  <div class="write">
    <div class="base-info">
      <div class="img"
           :style="{backgroundImage: 'url('+ imgSrc +')'}"></div>
      <h1>{{ title }}</h1>
    </div>
    <div class="textarea-box">
      <van-field v-model="message"
                 type="textarea"
                 placeholder="请填写内容"
                 rows="4" />
    </div>
    <ul class="upload-img">
      <li v-for="(img, index) of imgList"
          :key="index">
        <span class="img"
              :style="{backgroundImage: 'url('+ img +')'}"></span>
      </li>
      <li v-if="imgList.length < 10">
        <van-uploader class="upload-button"
                      :after-read="afterRead"
                      accept="image/gif,image/jpeg,image/jpg,image/png"
                      @oversize="oversize">
          <i class="add-icon"></i>
        </van-uploader>
      </li>
    </ul>
    <van-button type="default"
                v-if="!message"
                class="button is-radius-button-gray">提交</van-button>
    <van-button type="default"
                v-else
                class="button is-radius-button-red"
                @click="onSubmit">提交</van-button>
  </div>
</template>

<script>
export default {
  name: 'write',
  data () {
    return {
      id: '',
      title: '',
      imgSrc: '',
      message: '', //内容
      imgList: [] // 图片列表
    }
  },

  created () {
    this.id = this.$route.query.id
    this.title = this.$route.query.title
    this.imgSrc = this.$route.query.img
  },

  methods: {
    // 提交
    onSubmit () {

    },

    // 读取文件之后
    afterRead (file) {
      this.imgList.push(file.content)
    },

    // 文件大小超过限制
    oversize () {

    }
  }
}
</script>

<style lang="less" scoped>
.write {
  padding: 20px 30px;
}
.base-info {
  display: flex;
  padding-bottom: 20px;
  .img {
    width: 200px;
    height: 200px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  h1 {
    flex: 1;
    box-sizing: border-box;
    padding: 55px 0 0 34px;
    font-size: 32px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 45px;
  }
}
.textarea-box {
  width: 100%;
  height: 220px;
  box-sizing: border-box;
  padding: 26px 22px;
  background: rgba(246, 248, 250, 1);
  border-radius: 6px;
  /deep/ textarea.van-field__control {
    display: block;
    width: 100%;
    height: 100%;
    background: rgba(246, 248, 250, 1);
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #333;
    line-height: 40px;
  }
}
.upload-img {
  padding-top: 30px;
  .clearfix();
  li {
    width: 190px;
    height: 190px;
    position: relative;
    margin: 0 20px 20px 0;
    float: left;
    .img {
      display: block;
      width: 190px;
      height: 190px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }
  .upload-button {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 190px;
    height: 190px;
    background-color: #f6f8fa;
  }
  .add-icon {
    width: 56px;
    height: 56px;
    .bg-img("~@images/pic_mine_add");
  }
}

.is-radius-button-gray {
  .is-radius-button-gray();
}
.is-radius-button-red {
  .is-radius-button-red();
}
.button {
  display: block;
  width: 100%;
  height: 92px;
  border-radius: 53px;
  font-size: 38px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  letter-spacing: 1px;
  margin: 70px auto 0;
}
</style>

