<script setup>
  import { onLoad } from '@dcloudio/uni-app'

  // 获取地址参数
  onLoad((params) => {
    console.log(params.id)
  })
</script>

<template>
  <view class="page-container">
    <view class="search-bar">
      <text class="iconfont icon-scan"></text>
      <input class="input" type="text" placeholder="输入运单号" />
    </view>
    <scroll-view scroll-y class="task-detail">
      <view class="scroll-view-wrapper">
        <view class="basic-info panel">
          <view class="panel-title">基本信息</view>
          <view class="timeline">
            <view class="line"
              >北京市昌平区回龙观街道西三旗桥东金燕龙写字楼8877号</view
            >
            <view class="line">河南省郑州市路北区北清路99号</view>
            <navigator
              hover-class="none"
              url="/subpkg_task/guide/index"
              class="guide"
            >
              <text class="iconfont icon-guide"></text>
              <text>开始导航</text>
            </navigator>
          </view>
          <view class="info-list">
            <view class="info-list-item">
              <text class="label">任务编号</text>
              <text class="value">1557211886558850</text>
            </view>
            <view class="info-list-item">
              <text class="label">提货联系人</text>
              <text class="value">张三</text>
            </view>
            <view class="info-list-item">
              <text class="label">联系电话</text>
              <text class="value">13212345678</text>
            </view>
            <view class="info-list-item">
              <text class="label">预计提货时间</text>
              <text class="value">2022.05.04 13:00</text>
            </view>
            <view class="info-list-item">
              <text class="label">实际提货时间</text>
              <text class="value">2022.05.04 13:00</text>
            </view>

            <view class="hr"></view>

            <view class="info-list-item">
              <text class="label">交付联系人</text>
              <text class="value">李四</text>
            </view>
            <view class="info-list-item">
              <text class="label">联系电话</text>
              <text class="value">13212345678</text>
            </view>
            <view class="info-list-item">
              <text class="label">预计送达时间</text>
              <text class="value">2022.05.05 10:00</text>
            </view>
            <view class="info-list-item">
              <text class="label">实际送达时间</text>
              <text class="value">2022.05.05 10:00</text>
            </view>
          </view>
        </view>

        <view class="except-info panel">
          <view class="panel-title">异常信息</view>
          <view class="info-list">
            <view class="info-list-item">
              <text class="label">上报时间</text>
              <text class="value">2022.05.04 13:00</text>
            </view>
            <view class="info-list-item">
              <text class="label">异常类型</text>
              <text class="value">有异常响动</text>
            </view>
            <view class="info-list-item">
              <text class="label">处理结果</text>
              <text class="value">继续运输</text>
            </view>
          </view>
          <view class="info-list">
            <view class="info-list-item">
              <text class="label">上报时间</text>
              <text class="value">2022.05.04 13:00</text>
            </view>
            <view class="info-list-item">
              <text class="label">异常类型</text>
              <text class="value">有异常响动</text>
            </view>
            <view class="info-list-item">
              <text class="label">处理结果</text>
              <text class="value">继续运输</text>
            </view>
          </view>
        </view>

        <view class="panel pickup-info">
          <view class="panel-title">提货信息</view>
          <view class="label">提货凭证</view>
          <view class="pictures">
            <image class="picture" src="" mode=""></image>
            <image class="picture" src="" mode=""></image>
            <image class="picture" src="" mode=""></image>
            <view v-if="false" class="picture-blank">暂无图片</view>
          </view>
          <view class="label">货品照片</view>
          <view class="pictures">
            <image class="picture" src="" mode=""></image>
            <image class="picture" src="" mode=""></image>
            <image class="picture" src="" mode=""></image>
            <view v-if="false" class="picture-blank">暂无图片</view>
          </view>
        </view>

        <view class="delivery-info panel">
          <view class="panel-title">交货信息</view>
          <view class="label">交货凭证</view>
          <view class="pictures">
            <image class="picture" src="" mode=""></image>
            <image class="picture" src="" mode=""></image>
            <image class="picture" src="" mode=""></image>
            <view v-if="false" class="picture-blank">暂无图片</view>
          </view>
          <view class="label">货品照片</view>
          <view class="pictures">
            <image class="picture" src="" mode=""></image>
            <image class="picture" src="" mode=""></image>
            <image class="picture" src="" mode=""></image>
            <view v-if="false" class="picture-blank">暂无图片</view>
          </view>
        </view>
      </view>
    </scroll-view>

    <view class="toolbar" v-if="true">
      <navigator
        url="/subpkg_task/delay/index"
        hover-class="none"
        class="button secondary"
        >延迟提货</navigator
      >
      <navigator
        url="/subpkg_task/pickup/index"
        hover-class="none"
        class="button primary"
        >提货</navigator
      >
    </view>
    <view class="toolbar" v-if="false">
      <navigator
        url="/subpkg_task/except/index"
        hover-class="none"
        class="button secondary"
        >异常上报
      </navigator>
      <navigator
        url="/subpkg_task/delivery/index"
        hover-class="none"
        class="button primary"
        >支付</navigator
      >
    </view>
    <view class="toolbar" v-if="false">
      <navigator
        url="/subpkg_task/record/index"
        hover-class="none"
        class="button primary block"
        >回车登记</navigator
      >
    </view>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
