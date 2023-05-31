<script setup>
  import { ref, computed } from 'vue'
  import slVehicleViolation from './components/vehicle-violation'
  import slVehicleBreakdown from './components/vehicle-breakdown'
  import slVehicleAccident from './components/vehicle-accident'

  // 异常日期
  const timePicker = ref('')
  // 文件提示
  const exceptTime = computed(() => {
    return timePicker.value || '请选择'
  })
</script>
<template>
  <view class="page-container">
    <uni-list class="base-info">
      <uni-list-item title="出车时间" rightText="2022.05.04 13:00" />
      <uni-list-item show-arrow title="回车时间">
        <template v-slot:footer>
          <uni-datetime-picker v-model="timePicker">
            <view class="picker-value">{{ exceptTime }}</view>
          </uni-datetime-picker>
        </template>
      </uni-list-item>
    </uni-list>
    <sl-vehicle-violation></sl-vehicle-violation>
    <sl-vehicle-breakdown></sl-vehicle-breakdown>
    <sl-vehicle-accident></sl-vehicle-accident>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
