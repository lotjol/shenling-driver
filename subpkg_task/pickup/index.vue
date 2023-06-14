<script setup>
  import { ref, computed } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import taskApi from '@/apis/task'

  // 任务ID
  let id = ''
  // 提货凭证照片
  const receiptPictrues = ref([])
  // 提货商品照片
  const goodsPictrues = ref([])

  const cargoPickUpPictureList = computed(() => {
    return receiptPictrues.value.map(({ url }) => {
      return { url }
    })
  })

  const cargoPictureList = computed(() => {
    return goodsPictrues.value.map(({ url }) => {
      return { url }
    })
  })

  // 数据验证
  const enableButton = computed(() => {
    return goodsPictrues.value.length > 0 && receiptPictrues.value.length > 0
  })

  onLoad((params) => {
    // 获取任务的ID
    id = params.id
  })

  // 接货完成
  async function pickupGoods() {
    // 调用接口
    const { code } = await taskApi.pickup(
      id,
      cargoPickUpPictureList.value,
      cargoPictureList.value
    )
    if (code !== 200) return uni.$utils.toast('上传图片失败!')
    // 去到任务列表（查看在途任务）
    uni.reLaunch({ url: '/pages/task/index?status=2' })
  }
</script>
<template>
  <view class="page-container">
    <view class="receipt-info">
      <uni-file-picker
        v-model="receiptPictrues"
        file-extname="jpg,webp,gif,png"
        limit="3"
        title="请拍照上传收货凭证"
      ></uni-file-picker>
      <uni-file-picker
        v-model="goodsPictrues"
        file-extname="jpg,webp,gif,png"
        limit="3"
        title="请拍照上传货品照片"
      ></uni-file-picker>
    </view>
    <button @click="pickupGoods" :disabled="!enableButton" class="button">
      完成提货
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
    border-radius: 100rpx;
    margin-top: 60rpx;
    color: #fff;
    font-size: $uni-font-size-base;
    background-color: $uni-primary;

    &[disabled] {
      color: #fff;
      background-color: #fadcd9;
    }
  }
</style>
