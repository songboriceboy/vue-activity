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
                 maxlength="500"
                 placeholder="请填写内容"
                 rows="4" />
    </div>
    <ul class="upload-img">
      <li v-for="(item, index) of imgList"
          :key="index">
        <span class="img"
              @click="viewImg(index)"
              :style="{backgroundImage: 'url('+ item.img +')'}"></span>
        <van-loading class="upload-loading"
                     type="spinner"
                     color="white"
                     v-if="item.loading" />
        <span class="del"
              @click="delImg(index)"
              v-else></span>
      </li>
      <li v-if="imgList.length < 9">
        <van-uploader class="upload-button"
                      :max-size="5242880"
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
    <!-- 弹框 -->
    <message-box :show="this.$store.state.messageShow"
                 :title="messageTitle"
                 :content="messageContent"
                 :back="back"></message-box>
  </div>
</template>

<script>
import messageBox from '@/components/message/Message'
import { ImagePreview } from 'vant'

export default {
  name: 'write',
  components: { messageBox },
  data () {
    return {
      type: 0, // 类型 1：活动体验报告 2：试用体验报告
      id: 0, // 活动/试用 id
      title: '',
      imgSrc: '',
      message: '', //内容
      imgList: [], // 图片预览列表
      imgs: [], // 图片上传地址列表
      messageTitle: '', // 弹框提示
      messageContent: '', // 提示内容
      back: false // 跳转至上一页
    }
  },

  created () {
    this.title = this.$route.params.title
    this.type = parseInt(this.$route.params.type)
    this.imgSrc = this.$route.params.img
    this.id = this.$route.params.id
  },

  methods: {
    // 提交
    onSubmit () {
      if (this.message.length > 500) {
        this.$toast('内容过多!请检查后重新提交')
        return false
      }
      const params = {
        type: this.type,
        type_id: this.id,
        sign_id: this.$route.params.signId,
        content: this.message,
        images: this.imgs
      }

      this.$api.mine.postReport(params)
        .then(res => {
          if (res && res.errorCode === 0) {
            if (this.type === 1) {
              this.showMessage('提交成功', '您的体验报告已提交成功!', true)
            } else if (this.type === 2) {
              this.showMessage('提交成功', '您的体验报告已提交成功!', true)
            }
          } else {
            this.$toast(res.message)
          }
        })
    },

    // 显示提示
    showMessage (title, content, back) {
      this.$store.commit('setMessageShow', true)
      this.messageTitle = title
      this.messageContent = content
      this.back = back
    },

    // 读取文件之后
    afterRead (file) {
      const len = this.imgList.push({
        loading: true, // 上传中
        img: file.content
      })

      this.uploadImg(file.file, len)
    },

    // 上传图片
    uploadImg (file, len) {
      const params = new FormData()
      params.append('images[]', file)
      this.$api.common.upload(params)
        .then(res => {
          if (res && res.length > 0) {
            this.imgList[len - 1].loading = false
            this.imgs.push(res[0])
          }
          // 解决请求取消(canceled)的问题
          if (res === undefined) {
            this.imgList.splice(len - 1, 1)
            this.imgs.splice(len - 1, 1)
          }
        })
    },

    // 文件大小超过限制
    oversize () {
      this.$toast('图片文件不能超过5M! 请重新选择图片')
    },

    // 查看图片
    viewImg (index) {
      let imgs = []
      for (let item of this.imgList) {
        imgs.push(item.img)
      }
      ImagePreview({
        images: imgs,
        startPosition: index,
        onClose () {
          // do something
        }
      })
    },

    // 删除图片
    delImg (index) {
      this.imgList.splice(index, 1)
      this.imgs.splice(index, 1)
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
    margin: 0 30px 20px 0;
    float: left;
    .img {
      display: block;
      width: 190px;
      height: 190px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
    .upload-loading {
      display: block;
      padding: 50px;
      width: 90px;
      height: 90px;
      position: absolute;
      left: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.6);
    }
    .del {
      display: block;
      width: 32px;
      height: 32px;
      .bg-img("~@images/pic_mine_close");
      position: absolute;
      right: -12px;
      top: -12px;
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

