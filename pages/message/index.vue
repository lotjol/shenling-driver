<script setup>
  import { ref } from 'vue'

  // Tab 标签页索引
  const tabIndex = ref(0)
  // 切换标签页
  function changeTab(index) {
    tabIndex.value = index
  }
</script>

<template>
  <view class="page-container">
    <view class="message-tabbar">
      <text @click="changeTab(0)" :class="{ active: tabIndex === 0 }" class="tab">任务通知</text>
      <text @click="changeTab(1)" :class="{ active: tabIndex === 1 }" class="tab">公告</text>
    </view>
    <view class="message-action">
      <text class="iconfont icon-clear"></text>
      全部已读
    </view>
    <view class="message-list" v-show="tabIndex === 0">
      <uni-card :border="false" :is-shadow="false">
        <view class="brief">运输车辆：京A 123456 运输路线：北京—广州</view>
        <view class="extra">
          <text class="time">2022.05.04 13:00</text>
          <navigator hover-class="none" class="link" url="/subpkg_message/content/index">查看详情</navigator>
        </view>
        <template v-slot:title>
          <view class="title unread">您有新的运输任务</view>
        </template>
      </uni-card>
      <uni-card :border="false" :is-shadow="false">
        <view class="brief">运输车辆：京A 123456 运输路线：北京—广州</view>
        <view class="extra">
          <text class="time">2022.05.04 13:00</text>
          <navigator hover-class="none" class="link" url="/subpkg_message/content/index">查看详情</navigator>
        </view>
        <template v-slot:title>
          <view class="title">您有新的运输任务</view>
        </template>
      </uni-card>
    </view>
    <view class="message-list" v-show="tabIndex === 1">
      <uni-list :border="false">
        <uni-list-item
          to="/subpkg_message/content/index"
          ellipsis="1"
          title="在营车辆年检通知，为保障车辆能在营车辆年检通知，为保障车辆能够"
          rightText="05-06 06:16"
        >
          <template v-slot:header>
            <text class="dot"></text>
          </template>
        </uni-list-item>
        <uni-list-item
          to="/subpkg_message/content/index"
          ellipsis="1"
          title="在营车辆年检通知，为保障车辆能在营车辆年检通知，为保障车辆能够"
          rightText="05-06 06:16"
        />
        <uni-list-item
          to="/subpkg_message/content/index"
          ellipsis="1"
          title="在营车辆年检通知，为保障车辆能在营车辆年检通知，为保障车辆能够"
          rightText="05-06 06:16"
        />
        <uni-list-item
          to="/subpkg_message/content/index"
          ellipsis="1"
          title="在营车辆年检通知，为保障车辆能在营车辆年检通知，为保障车辆能够"
          rightText="05-06 06:16"
        />
      </uni-list>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
