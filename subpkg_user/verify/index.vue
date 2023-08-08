<!-- subpkg_user/verify/index.vue -->
<script setup>
  import { ref } from 'vue'
  // 获取表单中用户姓名和身份证号的
  const realName = ref('')
  const idCard = ref('')

  function onFormSubmit() {
    // 1. 获取设备信息
    const metaInfo = uni.getFacialRecognitionMetaInfo()
    // 2. 调用云函数
    uniCloud.callFunction({
      name: 'uni-verify',
      data: { realName: realName.value, idCard: idCard.value, metaInfo },
      success({ result }) {
        // 3. 调用摄像头
        uni.startFacialRecognitionVerify({
          certifyId: result.certifyId,
          success() {
            uni.utils.toast('认证成功')
          },
          fail() {
            uni.utils.toast('认证失败')
          },
        })
      },
      fail(err) {
        console.log(err)
      },
    })
  }
</script>
<template>
  <uni-forms class="verify-form">
    <uni-forms-item name="account">
      <input
        type="text"
        v-model="realName"
        placeholder="请输入姓名"
        class="uni-input-input"
        placeholder-style="color: #818181"
      />
    </uni-forms-item>
    <uni-forms-item name="password">
      <input
        type="text"
        v-model="idCard"
        placeholder="请输入身份证号"
        class="uni-input-input"
        placeholder-style="color: #818181"
      />
    </uni-forms-item>
    <button @click="onFormSubmit" class="submit-button">认证</button>
  </uni-forms>
</template>

<style lang="scss" scoped>
  .verify-form {
    padding: 120rpx 66rpx 66rpx;
  }

  .uni-forms-item {
    height: 100rpx;
    margin-bottom: 20 !important;
    border-bottom: 2rpx solid #eee;
    box-sizing: border-box;
  }

  ::v-deep .uni-forms-item__content {
    display: flex;
    align-items: center;
  }

  ::v-deep input {
    width: 100%;
    font-size: $uni-font-size-base;
    color: $uni-main-color;
  }

  ::v-deep .uni-forms-item__error {
    width: 100%;
    padding-top: 10rpx;
    border-top: 2rpx solid $uni-primary;
    color: $uni-primary;
    font-size: $uni-font-size-small;
    transition: none;
  }

  .submit-button {
    height: 100rpx;
    line-height: 100rpx;
    /* #ifdef APP */
    padding-top: 4rpx;
    /* #endif */
    margin-top: 80rpx;
    border: none;
    color: #fff;
    background-color: $uni-primary;
    border-radius: 100rpx;
    font-size: $uni-font-size-big;
  }

  button[disabled] {
    background-color: #fadcd9;
    color: #fff;
  }
</style>
