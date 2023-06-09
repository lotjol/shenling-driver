<script setup>
  import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import slUniCalendar from './components/sl-uni-calendar/sl-uni-calendar'
  import dayjs from 'dayjs'
  import userApi from '@/apis/user'

  // 任务数据
  const taskData = ref({})

  // 页面加载完毕
  onLoad(() => {
    const year = dayjs().get('year')
    const month = dayjs().get('month')
    getTaskData(year, month)
  })

  // 切换日期
  function onCalendarChange({ year, month }) {
    getTaskData(year, month)
  }

  // 任务数据接口
  async function getTaskData(year, month) {
    const { code, data } = await userApi.task(year, month)
    if (code !== 200) return uni.$utils.toast()
    taskData.value = data
  }
</script>

<template>
  <view class="page-container">
    <sl-uni-calendar @change="onCalendarChange" :show-month="false">
      <view class="data-overview">
        <view class="item">
          <text class="volumn">{{ taskData.taskAmounts }}</text>
          <text class="label">任务总量</text>
        </view>
        <view class="item">
          <text class="volumn">{{ taskData.completedAmounts }}</text>
          <text class="label">完成任务量</text>
        </view>
        <view class="item">
          <text class="volumn">{{ taskData.transportMileage }}</text>
          <text class="label">运输里程(km)</text>
        </view>
      </view>
    </sl-uni-calendar>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
