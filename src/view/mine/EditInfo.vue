<template>
  <div class="edit-info">
    <template v-if="!edit">
      <van-uploader class="avatar-uploader"
                    :max-size="2097152"
                    :after-read="afterRead"
                    accept="image/gif,image/jpeg,image/jpg,image/png"
                    @oversize="oversize">
        <van-cell title="头像"
                  center
                  clickable
                  class="info info-avatar">
          <span class="avatar"
                slot="right-icon"
                :style="{backgroundImage: 'url('+userInfo.avatar+')'}"></span>
        </van-cell>
      </van-uploader>
      <div class="info-line"></div>
      <van-cell title="昵称"
                center
                clickable
                class="info info-username"
                :value="userInfo.name"
                @click="edit=true" />
      <div class="info-line"></div>
    </template>
    <template v-else>
      <van-field v-model="userInfo.name"
                 maxlength="16"
                 placeholder="请填写您的昵称"
                 class="username-text" />
      <div class="info-line"></div>
      <van-button type="default"
                  v-if="!userInfo.name || userInfo.name.length > 16"
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
      userInfo: null, // 个人信息
      edit: false, // 是否可编辑
      oldAvatar: '' // 存储当前头像
    }
  },
  created () {
    const userInfo = this.$store.state.userInfo || localStorage.getItem('user_info')
    this.userInfo = JSON.parse(userInfo)
  },

  methods: {
    // 保存
    onSubmit () {
      if (!this.userInfo.name) {
        this.$toast('请填写昵称!')
      }
      if (this.userInfo.name.length > 16) {
        this.$toast('昵称长度超长!')
      }

      this.updateData()
    },

    // 提交数据
    updateData () {
      let params = {
        avatar: this.userInfo.avatar,
        user_name: this.userInfo.name
      }

      this.$api.mine
        .patchInfo(params)
        .then(res => {
          if (res && res.errorCode === 0) {
            this.$toast('修改成功')
            const userInfo = JSON.stringify(this.userInfo)
            this.$store.commit('setUserInfo', userInfo)
            this.edit = false
            this.oldAvatar = ''
          } else {
            this.$toast(res.message)
            if (this.oldAvatar) {
              this.userInfo.avatar = this.oldAvatar
            }
          }
        })
    },

    // 将图片上传至服务器
    afterRead (file) {
      this.$toast.loading({
        mask: true,
        message: '上传中...'
      })

      // 图片预览
      this.oldAvatar = this.userInfo.avatar
      this.userInfo.avatar = file.content

      const params = new FormData()
      params.append('images[]', file.file)
      this.$api.common.upload(params)
        .then(res => {
          if (res && res.length > 0) {
            this.userInfo.avatar = res[0]
            this.updateData()
          }
        })
    },

    // 文件大小超过限制
    oversize () {
      this.$toast('图片文件不能超过2M!请重新选择')
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
    /deep/ .van-cell__title {
      width: 90px;
      flex: none;
    }
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
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .info-line {
    height: 1px;
    background-color: #e3e3e4;
    margin: 0 32px;
  }
  .username-text {
    padding: 54px 48px 34px;
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

