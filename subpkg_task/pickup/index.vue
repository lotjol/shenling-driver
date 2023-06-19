<template>
  <view class="page-container">
    <view class="receipt-info">
      <uni-file-picker limit="3" title="请拍照上传回单凭证"></uni-file-picker>
      <uni-file-picker limit="3" title="请拍照上传货品照片"></uni-file-picker>
    </view>
    <button disabled class="button">提交</button>
  </view>
</template>

<script></script>

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
