<script setup>
  import { ref, computed } from 'vue'
  import { useTaskStore } from '@/stores/task'
  import vehicleOptions from './vehicle-options'

  // 任务数据
  const taskStore = useTaskStore()

  // 是不显示详细的选项
  const show = ref(false)

  // 事故类型
  const types = ref([
    '直行事故',
    '追尾事故',
    '超车事故',
    '左转弯事故',
    '右转弯事故',
    '弯道事故',
    '坡道事故',
    '会车事故',
    '其他',
  ])

  // 字数统计
  const wordsCount = computed(() => {
    return taskStore.recordData.faultDescription.length
  })

  function onRadioChange(ev) {
    // 展开详细的选项
    show.value = !!parseInt(ev.detail.value)
    // 传递数据到父组件
    taskStore.recordData.isAccident = show.value
  }
</script>

<template>
  <view class="vehicle-panel">
    <view class="vehicle-panel-header">
      <view class="label">车辆事故</view>
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
        <uni-list-item direction="column" :border="false" title="事故类型">
          <template v-slot:footer>
            <vehicle-options data-key="accidentType" :types="types" />
            <view class="textarea-wrapper">
              <textarea
                v-model="taskStore.recordData.accidentDescription"
                class="textarea"
                placeholder="请输入事故描述"
              ></textarea>
              <view :class="{ error: wordsCount > 50 }" class="words-count"
                >{{ wordsCount }}/50</view
              >
            </view>
          </template>
        </uni-list-item>
        <uni-list-item direction="column" :border="false" title="请拍照">
          <template v-slot:footer>
            <uni-file-picker
              v-model="taskStore.recordData.accidentImages"
              file-extname="jpg,webp,gif,png"
              limit="3"
            ></uni-file-picker>
          </template>
        </uni-list-item>
      </uni-list>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  @import './styles/vehicle-panel.scss';
  @import './styles/vehicle-accident.scss';
</style>
