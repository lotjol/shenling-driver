<script setup>
  import { ref, reactive } from 'vue'
  import slVehiclePanel from './vehicle-panel'
  import slVehicleOptions from './vehicle-options'

  // 图片预览
  const imageValue = reactive([])
  // 事故类型
  const types = reactive([
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
</script>

<template>
  <sl-vehicle-panel title="车辆事件">
    <uni-list>
      <uni-list-item direction="column" :border="false" title="事故类型">
        <template v-slot:footer>
          <sl-vehicle-options :options="types"></sl-vehicle-options>
          <view class="textarea-wrapper">
            <textarea class="textarea" placeholder="请输入异常描述"></textarea>
            <view class="words-count">0/50</view>
          </view>
        </template>
      </uni-list-item>
      <uni-list-item direction="column" :border="false" title="请拍照">
        <template v-slot:footer>
          <uni-file-picker v-model="imageValue" limit="6"></uni-file-picker>
        </template>
      </uni-list-item>
    </uni-list>
  </sl-vehicle-panel>
</template>

<style lang="scss" scoped>
  @import './styles/vehicle-accident.scss';
</style>
