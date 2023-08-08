<script setup>
  import { ref, computed } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import { storeToRefs } from 'pinia'
  import { useTaskStore } from '@/stores/task'
  import taskApi from '@/apis/task'

  import slVehicleViolation from './components/vehicle-violation'
  import slVehicleBreakdown from './components/vehicle-breakdown'
  import slVehicleAccident from './components/vehicle-accident'

  // 回车登记的全部数据
  const { recordData } = storeToRefs(useTaskStore())

  // 获取地址参数
  onLoad((query) => {
    // 任务ID
    recordData.value.id = query.transportTaskId
    // 发车时间
    recordData.value.startTime = query.actualDepartureTime
  })

  // 提交回车登记
  async function onFormSubmit() {
    // 过滤掉图片多余的数据，只保留 url
    const { accidentImagesList, faultImagesList } = recordData.value
    // 事故照片
    recordData.value.accidentImagesList = accidentImagesList.map(({ url }) => {
      return { url }
    })
    // 故障照片
    recordData.value.faultImagesList = faultImagesList.map(({ url }) => {
      return { url }
    })

    // 调用接口提交数据
    const { code } = await taskApi.record(recordData.value)
    // 检测接口否调用成功
    if (code !== 200) return uni.utils.toast('回车登记失败!')
    // 跳转到任务列表
    uni.reLaunch({ url: '/pages/task/index' })
  }
</script>
<template>
  <view class="page-container">
    <scroll-view class="scroll-view" scroll-y>
      <view class="scroll-view-wrapper">
        <uni-list class="base-info">
          <uni-list-item
            title="出车时间"
            show-arrow
            :right-text="recordData.startTime"
          />
          <uni-list-item show-arrow title="回车时间">
            <template v-slot:footer>
              <uni-datetime-picker v-model="recordData.endTime">
                <view class="picker-value">{{
                  recordData.endTime || '请选择'
                }}</view>
              </uni-datetime-picker>
            </template>
          </uni-list-item>
        </uni-list>
        <sl-vehicle-violation></sl-vehicle-violation>
        <sl-vehicle-breakdown></sl-vehicle-breakdown>
        <sl-vehicle-accident></sl-vehicle-accident>
      </view>
    </scroll-view>
    <view class="toolbar">
      <button @click="onFormSubmit" class="button">提交登记</button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
