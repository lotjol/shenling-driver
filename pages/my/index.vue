<script setup></script>

<template>
  <view class="page-container">
    <view class="user-profile">
      <image class="avatar" src="/static/images/avatar_2.png" mode=""></image>
      <text class="username">李明</text>
      <text class="no">司机编号：67409881</text>
      <text class="mobile">手机号码：177 9998 8765</text>
    </view>
    <view class="month-overview">
      <view class="title">本月任务</view>
      <view class="content">
        <view class="item">
          <text class="volumn">18</text>
          <text class="label">任务总量</text>
        </view>
        <view class="item">
          <text class="volumn">16</text>
          <text class="label">完成任务量</text>
        </view>
        <view class="item">
          <text class="volumn">3987</text>
          <text class="label">运输里程(km)</text>
        </view>
      </view>
    </view>
    <view class="entry-list">
      <uni-list :border="false">
        <uni-list-item to="/subpkg_user/truck/index" showArrow title="车辆信息" />
        <uni-list-item to="/subpkg_user/task/index" showArrow title="任务数据" />
        <uni-list-item to="/subpkg_user/settings/index" showArrow title="系统设置" />
      </uni-list>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
