<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import slVehicleViolation from './components/vehicle-violation';
import slVehicleBreakdown from './components/vehicle-breakdown';
import slVehicleAccident from './components/vehicle-accident';

// 出车时间
const startTime = ref('');
// 回车时间
const endTime = ref('');

onLoad((params) => {
  // 出车时间
  startTime.value = params.departureTime;
});
</script>
<template>
  <view class="page-container">
    <scroll-view class="scroll-view" scroll-y>
      <view class="scroll-view-wrapper">
        <uni-list class="base-info">
          <uni-list-item title="出车时间" show-arrow :right-text="startTime" />
          <uni-list-item show-arrow title="回车时间">
            <template v-slot:footer>
              <uni-datetime-picker v-model="endTime">
                <view class="picker-value">{{ endTime || '请选择' }}</view>
              </uni-datetime-picker>
            </template>
          </uni-list-item>
        </uni-list>

        <!-- 车辆违章 -->
        <sl-vehicle-violation></sl-vehicle-violation>
        <!-- 车辆故障 -->
        <sl-vehicle-breakdown></sl-vehicle-breakdown>
        <!-- 车辆事件 -->
        <sl-vehicle-accident></sl-vehicle-accident>
      </view>
    </scroll-view>
    <view class="toolbar">
      <button class="button">提交登记</button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import './index.scss'
</style>
