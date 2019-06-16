<template>
  <div class="edit-info">
    <template v-if="!edit">
      <van-uploader class="avatar-uploader"
                    :max-size="4194304"
                    :after-read="afterRead"
                    :max-count="1"
                    @oversize="oversize">
        <van-cell title="头像"
                  center
                  clickable
                  class="info info-avatar">
          <img :src="avatar"
               alt="头像"
               class="avatar"
               slot="right-icon" />
        </van-cell>
      </van-uploader>
      <div class="info-line"></div>
      <van-cell title="昵称"
                center
                clickable
                class="info info-username"
                :value="username"
                @click="edit=true" />
      <div class="info-line"></div>
    </template>
    <template v-else>
      <van-field v-model="username"
                 placeholder="请填写您的昵称"
                 class="username-text" />
      <div class="info-line"></div>
      <van-button type="default"
                  v-if="!username"
                  class="button is-radius-button-gray">保存</van-button>
      <van-button type="default"
                  v-else
                  class="button is-radius-button-red"
                  @click="onSubmit">保存</van-button>
    </template>
  </div>
</template>

<script>
export default {
  name: 'editInfo',
  data () {
    return {
      avatar: 'http://192.168.100.14:8080/static/pic.png',
      username: 'UOOU',
      edit: false,
    }
  },
  methods: {
    // 保存
    onSubmit () {
      this.$api.mine
        .patchInfo({
          avatar: this.avatar,
          name: this.username
        })
        .then(res => {
          if (res.code === 0) {
            this.$toast('修改成功')
          }
        })
    },

    // 将文件上传至服务器
    afterRead (file) {
      // 图片预览
      const oldAvatar = this.avatar
      this.avatar = file.content

      const params = [file]
      this.$api.common.upload(params)
        .then(res => {
          if (res.code === 0) {
            this.$toast('头像修改成功!')
          } else {
            this.$toast('头像修改失败!')
            this.avatar = oldAvatar
          }
        })
    },

    // 文件大小超过限制
    oversize () {
      this.$toast('图片文件过大!请重新选择')
    }
  }
}
</script>

<style lang="less" scoped>
.edit-info {
  .van-cell.info {
    box-sizing: border-box;
    .van-cell__title {
      font-size: 30px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
    }
    .van-cell__value {
      font-size: 28px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(74, 74, 74, 1);
    }
  }
  .avatar-uploader {
    width: 100%;
  }
  .info-avatar {
    padding: 25px 32px 28px;
  }
  .info-username {
    padding: 30px 32px;
  }
  .van-cell::after {
    border-bottom: none;
  }
  .van-cell.info::after {
    content: "";
    width: 11px;
    height: 30px;
    position: initial;
    margin-left: 16px;
    .bg-img("~@images/pic_mine_more");
  }
  .avatar {
    display: block;
    width: 76px;
    height: 76px;
    border-radius: 50%;
  }
  .info-line {
    height: 1px;
    background-color: #e3e3e4;
    margin: 0 32px;
  }
  .username-text {
    padding: 44px 48px;
    box-sizing: border-box;
  }
  .is-radius-button-gray {
    .is-radius-button-gray();
  }
  .is-radius-button-red {
    .is-radius-button-red();
  }
  .button {
    display: block;
    width: 90%;
    height: 92px;
    border-radius: 53px;
    font-size: 38px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    letter-spacing: 1px;
    margin: 378px auto 0;
  }
}
</style>

