<script>
  export default {
    options: {
      // virtualHost: true,
    },
  }
</script>
<template>
  <scroll-view class="scroll-view" refresher-enabled scroll-y>
    <view class="scroll-view-wrapper">
      <view class="message-action">
        <text class="iconfont icon-clear"></text>
        全部已读
      </view>
      <uni-card :border="false" :is-shadow="false">
        <view class="brief">运输车辆：京A 123456 运输路线：北京—广州</view>
        <view class="extra">
          <text class="time">2022.05.04 13:00</text>
          <navigator
            hover-class="none"
            class="link"
            url="/subpkg_message/content/index"
            >查看详情</navigator
          >
        </view>
        <template v-slot:title>
          <view class="title unread">您有新的运输任务</view>
        </template>
      </uni-card>
      <uni-card :border="false" :is-shadow="false">
        <view class="brief">运输车辆：京A 123456 运输路线：北京—广州</view>
        <view class="extra">
          <text class="time">2022.05.04 13:00</text>
          <navigator
            hover-class="none"
            class="link"
            url="/subpkg_message/content/index"
            >查看详情</navigator
          >
        </view>
        <template v-slot:title>
          <view class="title">您有新的运输任务</view>
        </template>
      </uni-card>
      <uni-card :border="false" :is-shadow="false">
        <view class="brief">运输车辆：京A 123456 运输路线：北京—广州</view>
        <view class="extra">
          <text class="time">2022.05.04 13:00</text>
          <navigator
            hover-class="none"
            class="link"
            url="/subpkg_message/content/index"
            >查看详情</navigator
          >
        </view>
        <template v-slot:title>
          <view class="title">您有新的运输任务</view>
        </template>
      </uni-card>
      <uni-card :border="false" :is-shadow="false">
        <view class="brief">运输车辆：京A 123456 运输路线：北京—广州</view>
        <view class="extra">
          <text class="time">2022.05.04 13:00</text>
          <navigator
            hover-class="none"
            class="link"
            url="/subpkg_message/content/index"
            >查看详情</navigator
          >
        </view>
        <template v-slot:title>
          <view class="title">您有新的运输任务</view>
        </template>
      </uni-card>
      <view v-if="false" class="message-blank">暂无消息</view>
    </view>
  </scroll-view>
</template>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
