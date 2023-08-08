<script setup>
  import { ref, computed } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import taskApi from '@/apis/task'

  // 任务ID
  const id = ref('')

  // 提货凭证照片
  const receiptPictrues = ref([])
  // 过滤掉多余的数据，只保留 url
  const certificatePictureList = computed(() => {
    return receiptPictrues.value.map(({ url }) => {
      return { url }
    })
  })

  // 提货商品照片
  const goodsPictrues = ref([])
  // 过滤掉多余的数据，只保留 url
  const deliverPictureList = computed(() => {
    return goodsPictrues.value.map(({ url }) => {
      return { url }
    })
  })

  // 凭证和商品都至少上传一张图片
  const enableSubmit = computed(() => {
    return goodsPictrues.value.length > 0 && receiptPictrues.value.length > 0
  })

  // 获取地址中的参数
  onLoad((query) => {
    // 任务ID
    id.value = query.id
  })

  // 提交交付数据
  async function onSubmitForm() {
    // 表单数据
    const formData = {
      id: id.value,
      certificatePictureList: certificatePictureList.value,
      deliverPictureList: deliverPictureList.value,
    }
    // 调用接口
    const { code } = await taskApi.deliver(formData)
    if (code !== 200) return uni.utils.toast('上传图片失败!')
    // 去到任务列表（查看在途任务）
    uni.reLaunch({ url: '/pages/task/index' })
  }
</script>
<template>
  <view class="page-container">
    <view class="receipt-info">
      <uni-file-picker
        v-model="receiptPictrues"
        file-extname="jpg,webp,gif,png"
        limit="3"
        title="请拍照上传回单凭证"
      ></uni-file-picker>
      <uni-file-picker
        v-model="goodsPictrues"
        file-extname="jpg,webp,gif,png"
        limit="3"
        title="请拍照上传货品照片"
      ></uni-file-picker>
    </view>
    <button :disabled="!enableSubmit" @click="onSubmitForm" class="button">
      提交
    </button>
  </view>
</template>

<style lang="scss" scoped>
  .page-container {
    padding: 30rpx;
  }

  .receipt-info {
    min-height: 600rpx;
    background-color: #fff;
    padding: 20rpx 30rpx;
    border-radius: 16rpx;

    ::v-deep .uni-file-picker {
      margin-bottom: 30rpx;
    }
  }

  .button {
    height: 100rpx;
    text-align: center;
    line-height: 100rpx;
    /* #ifdef APP */
    padding-top: 4rpx;
    /* #endif */
    border-radius: 100rpx;
    margin-top: 60rpx;
    color: #fff;
    font-size: $uni-font-size-big;
    background-color: $uni-primary;

    &[disabled] {
      color: #fff;
      background-color: #fadcd9;
    }
  }
</style>
