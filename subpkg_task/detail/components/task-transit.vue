<script setup></script>

<template>
  <view class="content">
    <view class="transit-line">
      <view class="start">
        <text class="lead">北京市</text>
        <text class="normal">北京市</text>
      </view>
      <view class="end">
        <text class="lead">河南省</text>
        <text class="normal">郑州市</text>
      </view>
    </view>
    <navigator hover-class="none" url="/subpkg_task/guide/index" class="guide">
      <text class="iconfont icon-guide"></text>
      <text>开始导航</text>
    </navigator>
  </view>
</template>

<style lang="scss" scoped>
  @import 'styles/task-transit.scss';
</style>
