<script setup>
import { computed, ref } from 'vue';
import { useTaskStore } from '@/stores/task';
import vehicleOptions from './vehicle-options';

// 任务数据
const taskStore = useTaskStore();

// 是不显示详细的选项
const show = ref(false);

// 故障类型
const types = ref([
  { id: 1, text: '启动困难' },
  { id: 2, text: '不着车' },
  { id: 3, text: '漏油' },
  { id: 4, text: '漏水' },
  { id: 5, text: '照明失灵' },
  { id: 6, text: '有异响' },
  { id: 7, text: '排烟异常' },
  { id: 8, text: '温度异常' },
  { id: 9, text: '其他' }
]);

// 字数统计
const wordsCount = computed(() => {
  return taskStore.recordData.faultDescription.length;
});

function onRadioChange(ev) {
  // 展开详细的选项
  show.value = !!parseInt(ev.detail.value);
  // 传递数据到父组件
  taskStore.recordData.isFault = show.value;
  // 用户选择否时清除已填写的数据
  if (!show.value) {
    taskStore.recordData.faultDescription = '';
    taskStore.recordData.faultImagesList = [];
  }
}
</script>

<template>
  <view class="vehicle-panel">
    <view class="vehicle-panel-header">
      <view class="label">车辆故障</view>
      <radio-group class="radio-group" @change="onRadioChange">
        <label class="label">
          <radio class="radio" value="1" color="#EF4F3F" />
          <text>是</text>
        </label>
        <label class="label">
          <radio class="radio" checked value="0" color="#EF4F3F" />
          <text>否</text>
        </label>
      </radio-group>
    </view>
    <view v-show="show" class="vehicle-panel-body">
      <uni-list>
        <uni-list-item direction="column" :border="false" title="故障类型">
          <template v-slot:footer>
            <vehicle-options :reset="show" data-key="faultType" :types="types" />
            <view class="textarea-wrapper">
              <textarea class="textarea" placeholder="请输入故障描述" v-model.trim="taskStore.recordData.faultDescription"></textarea>
              <view :class="{ error: wordsCount > 50 }" class="words-count">{{ wordsCount }}/50</view>
            </view>
          </template>
        </uni-list-item>
        <uni-list-item direction="column" :border="false" title="请拍照">
          <template v-slot:footer>
            <uni-file-picker v-model="taskStore.recordData.faultImagesList" file-extname="jpg,webp,gif,png" limit="3"></uni-file-picker>
          </template>
        </uni-list-item>
      </uni-list>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import './styles/vehicle-panel.scss';
@import 'styles/vehicle-breakdown.scss';
</style>
