<script setup>
  import { ref } from 'vue'
  import slVehicleViolation from './components/vehicle-violation'
  import slVehicleBreakdown from './components/vehicle-breakdown'
  import slVehicleAccident from './components/vehicle-accident'

  // 回车时间
  const dataTimePicker = ref('')
</script>
<template>
  <view class="page-container">
    <scroll-view class="scroll-view" scroll-y>
      <view class="scroll-view-wrapper">
        <uni-list class="base-info">
          <uni-list-item
            title="出车时间"
            show-arrow
            right-text="2022-05-04 13:00:00"
          />
          <uni-list-item show-arrow title="回车时间">
            <template v-slot:footer>
              <uni-datetime-picker v-model="dataTimePicker">
                <view class="picker-value">{{
                  dataTimePicker || '请选择'
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
      <button class="button">提交登记</button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
