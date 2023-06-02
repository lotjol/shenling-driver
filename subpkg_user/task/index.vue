<script setup>
  import { reactive } from 'vue'
  import slUniCalendar from './components/sl-uni-calendar/sl-uni-calendar'

  const selected = reactive([
    { date: '2023-03-24', info: '332 ' },
    { date: '2023-03-25', info: '249' },
    { date: '2023-03-26', info: '312' },
  ])
</script>

<template>
  <view class="page-container">
    <sl-uni-calendar :selected="selected" :show-month="false">
      <view class="data-overview">
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
    </sl-uni-calendar>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
