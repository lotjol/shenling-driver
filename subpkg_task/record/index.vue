<script setup>
import { onLoad } from '@dcloudio/uni-app';
import { storeToRefs } from 'pinia';
import { useTaskStore } from '@/stores/task';

import slVehicleViolation from './components/vehicle-violation';
import slVehicleBreakdown from './components/vehicle-breakdown';
import slVehicleAccident from './components/vehicle-accident';

import taskApi from '@/apis/task';

// 登记数据
const { recordData } = storeToRefs(useTaskStore());

// 地址中的时间参数
onLoad((params) => {
  // 出车时间
  Object.assign(recordData.value, params);
});

// 提交回车登记
function onFormSubmit() {
  // 过滤掉图片多余的数据
  ['accidentImagesList', 'faultImagesList'].forEach((key) => {
    recordData.value[key] = recordData.value[key].map(({ url }) => ({ url }));
  });

  taskApi.record(recordData.value);
}
</script>
<template>
  <view class="page-container">
    <scroll-view class="scroll-view" scroll-y>
      <view class="scroll-view-wrapper">
        <uni-list class="base-info">
          <uni-list-item title="出车时间" show-arrow :right-text="recordData.startTime" />
          <uni-list-item show-arrow title="回车时间">
            <template v-slot:footer>
              <uni-datetime-picker v-model="recordData.endTime">
                <view class="picker-value">{{ recordData.endTime || '请选择' }}</view>
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
      <button @click="onFormSubmit" class="button">提交登记</button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
