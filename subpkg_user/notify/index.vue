<script setup></script>

<template>
  <view class="page-container">
    <view class="tips">开启后，有新的任务通知你</view>
    <uni-list :border="false">
      <uni-list-item title="允许给我推送任务通知">
        <template v-slot:footer>
          <switch checked="true" style="transform: scale(0.7)" color="#EF4F3F" @change="" />
        </template>
      </uni-list-item>
    </uni-list>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
