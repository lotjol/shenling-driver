<script setup>
  import { ref } from 'vue'

  // 初始经纬度
  const latitude = ref(39.909)
  const longitude = ref(116.39742)
</script>

<template>
  <view class="page-container">
    <map :latitude="latitude" :longitude="longitude" class="map"></map>
    <cover-view class="meta">
      <cover-view class="label">任务编号: XAHH1234567</cover-view>
      <cover-view class="timeline">
        <cover-view class="start">起</cover-view>
        <cover-view class="end">止</cover-view>
        <cover-view class="line"
          >北京市昌平区回龙观街道西三旗桥东金燕龙写字楼8877号</cover-view
        >
        <cover-view class="line">河南省郑州市路北区北清路99号</cover-view>
      </cover-view>
    </cover-view>
    <cover-view class="toolbar">
      <cover-view class="button">导航</cover-view>
    </cover-view>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
