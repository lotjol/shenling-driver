<script setup>
  import { reactive, ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import userApi from '@/apis/user'
  import dayjs from 'dayjs'

  const year = ref(dayjs().get('year'))
  const month = ref(dayjs().get('month'))
  const taskData = ref({})
  const selected = reactive([
    { date: '2023-06-03', info: '32' },
    { date: '2023-06-06', info: '128' },
    { date: '2023-06-09', info: '128' },
    { date: '2023-06-14', info: '342' },
    { date: '2023-06-18', info: '249' },
    { date: '2023-06-22', info: '317' },
    { date: '2023-06-24', info: '362' },
    { date: '2023-06-27', info: '213' },
    { date: '2023-06-26', info: '112' },
  ])

  // 生命周期（页面加载完成）
  onLoad(() => {
    // 获取任务数据
    getTaskData()
  })

  // 任务数据接口
  async function getTaskData() {
    const { code, data } = await userApi.task(year.value, month.value)
    if (code !== 200) return uni.$utils.toast()
    taskData.value = data
  }

  function oncalendarChange({ year, month }) {
    getTaskData(year, month)
  }
</script>

<template>
  <view class="page-container">
    <sl-uni-calendar @change="oncalendarChange" :selected="selected" :show-month="false">
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
