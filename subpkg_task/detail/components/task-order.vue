<script setup></script>

<template>
  <view class="content">
    <view class="search-bar">
      <text class="iconfont icon-search"></text>
      <input class="input" type="text" placeholder="输入运单号" />
    </view>
    <view class="transit-order">
      <uni-row>
        <uni-col :span="14">SD1234567890123</uni-col>
        <uni-col :span="6">1件</uni-col>
        <uni-col style="text-align: right" :span="4">5kg</uni-col>
      </uni-row>
      <uni-row>
        <uni-col :span="14">SD1234567890123</uni-col>
        <uni-col :span="6">1件</uni-col>
        <uni-col style="text-align: right" :span="4">5kg</uni-col>
      </uni-row>
      <uni-row>
        <uni-col :span="14">SD1234567890123</uni-col>
        <uni-col :span="6">1件</uni-col>
        <uni-col style="text-align: right" :span="4">5kg</uni-col>
      </uni-row>
      <uni-row>
        <uni-col :span="14">SD1234567890123</uni-col>
        <uni-col :span="6">1件</uni-col>
        <uni-col style="text-align: right" :span="4">5kg</uni-col>
      </uni-row>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  @import 'styles/task-order.scss';
</style>
