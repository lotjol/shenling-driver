<template>
  <view class="page-container">
    <view class="search-bar">
      <text class="iconfont icon-scan"></text>
      <input class="input" type="text" placeholder="输入运单号" />
    </view>
    <scroll-view class="order-list" scroll-y>
      <view class="scroll-view-wrapper">
        <view class="order-list-item">
          <text class="order-no">SD1234567890123</text>
          <text class="goods-number">1件</text>
          <text class="goods-weight">5KG</text>
        </view>
        <view class="order-list-item">
          <text class="order-no">SD1234567890123</text>
          <text class="goods-number">1件</text>
          <text class="goods-weight">5KG</text>
        </view>
        <view class="order-list-item">
          <text class="order-no">SD1234567890123</text>
          <text class="goods-number">1件</text>
          <text class="goods-weight">5KG</text>
        </view>
        <view class="order-list-item">
          <text class="order-no">SD1234567890123</text>
          <text class="goods-number">1件</text>
          <text class="goods-weight">5KG</text>
        </view>
        <view class="order-list-item">
          <text class="order-no">SD1234567890123</text>
          <text class="goods-number">1件</text>
          <text class="goods-weight">5KG</text>
        </view>
        <view class="order-list-item">
          <text class="order-no">SD1234567890123</text>
          <text class="goods-number">1件</text>
          <text class="goods-weight">5KG</text>
        </view>
        <view class="order-list-item">
          <text class="order-no">SD1234567890123</text>
          <text class="goods-number">1件</text>
          <text class="goods-weight">5KG</text>
        </view>
        <view class="order-list-item">
          <text class="order-no">SD1234567890123</text>
          <text class="goods-number">1件</text>
          <text class="goods-weight">5KG</text>
        </view>
        <view class="order-list-item">
          <text class="order-no">SD1234567890123</text>
          <text class="goods-number">1件</text>
          <text class="goods-weight">5KG</text>
        </view>
        <view class="order-list-item">
          <text class="order-no">SD1234567890123</text>
          <text class="goods-number">1件</text>
          <text class="goods-weight">5KG</text>
        </view>
        <view class="order-list-item">
          <text class="order-no">SD1234567890123</text>
          <text class="goods-number">1件</text>
          <text class="goods-weight">5KG</text>
        </view>
        <view class="order-list-item">
          <text class="order-no">SD1234567890123</text>
          <text class="goods-number">1件</text>
          <text class="goods-weight">5KG</text>
        </view>
        <view class="order-list-item">
          <text class="order-no">SD1234567890123</text>
          <text class="goods-number">1件</text>
          <text class="goods-weight">5KG</text>
        </view>
        <view class="order-list-item">
          <text class="order-no">SD1234567890123</text>
          <text class="goods-number">1件</text>
          <text class="goods-weight">5KG</text>
        </view>
        <view class="order-list-item">
          <text class="order-no">SD1234567890123</text>
          <text class="goods-number">1件</text>
          <text class="goods-weight">5KG</text>
        </view>
        <view class="order-list-item">
          <text class="order-no">SD1234567890123</text>
          <text class="goods-number">1件</text>
          <text class="goods-weight">5KG</text>
        </view>
        <view class="order-list-item">
          <text class="order-no">SD1234567890123</text>
          <text class="goods-number">1件</text>
          <text class="goods-weight">5KG</text>
        </view>
        <view class="order-list-item">
          <text class="order-no">SD1234567890123</text>
          <text class="goods-number">1件</text>
          <text class="goods-weight">5KG</text>
        </view>
        <view v-if="false" class="order-blank">暂无相关商品</view>
      </view>
    </scroll-view>
  </view>
</template>

<script></script>

<style lang="scss" scoped>
  .page-container {
    display: flex;
    flex-direction: column;
  }

  .search-bar {
    position: relative;
    padding: 30rpx;
    background-color: #fff;
    border-bottom: 1rpx solid #eee;

    .icon-scan {
      position: absolute;
      top: 50%;
      left: 40rpx;
      padding: 20rpx;
      font-weight: 600;
      transform: translateY(-50%);
      color: $uni-secondary-color;
      font-size: $uni-font-size-base;
    }

    .input {
      height: 64rpx;
      background-color: #f4f4f4;
      border-radius: 64rpx;
      padding-left: 80rpx;
      font-size: $uni-font-size-small;
    }
  }

  .order-list {
    flex: 1;
    overflow: hidden;
    box-sizing: border-box;
    background-color: #f4f4f4;
  }

  .order-list-item {
    display: flex;
    justify-content: space-between;
    line-height: 1;
    padding: 30rpx 40rpx;
    background-color: #fff;
    font-size: $uni-font-size-base;
    color: $uni-main-color;

    &:first-child {
      padding-top: 40rpx;
      margin-top: 30rpx;
    }

    &:last-child {
      padding-bottom: 40rpx;
      margin-bottom: 30rpx;
    }
  }

  .order-no {
    width: 400rpx;
  }

  .goods-number {
    width: 100rpx;
  }

  .goods-weight {
    width: 120rpx;
    text-align: right;
  }

  .order-blank {
    position: absolute;
    left: 50%;
    top: 40%;
    width: 201rpx;
    text-align: center;
    padding-top: 130rpx;
    background-image: url(https://sl-driver.oss-cn-hangzhou.aliyuncs.com/images/blank%402x.png);
    background-size: contain;
    background-repeat: no-repeat;
    font-size: 24rpx;
    color: $uni-secondary-color;
    transform: translate(-50%, -100%);
  }
</style>
