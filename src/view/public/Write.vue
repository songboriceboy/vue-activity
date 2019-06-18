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
    <div class="upload-img">
      <van-uploader v-model="fileList"
                    :after-read="afterRead"
                    accept="image/gif,image/jpeg,image/jpg,image/png"
                    multiple
                    @oversize="oversize"
                    :max-count="9">
        上传
      </van-uploader>
    </div>
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
      title: 'Armani官方阿玛尼满天星手表女镶钻星空手表',
      imgSrc: 'http://192.168.100.14:8080/static/pic_on_trial_commodity_2@3x.png',
      message: '', //内容
      fileList: [] // 图片列表
    }
  },
  methods: {
    // 提交
    onSubmit () {

    },

    // 读取文件之后
    afterRead () {

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

