<script setup>
  import { reactive } from 'vue'
  import slVehiclePanel from './vehicle-panel'
  import slVehicleOptions from './vehicle-options'

  // 图片预览
  const imageValue = reactive([])
  // 故障类型
  const types = reactive([
    '启动困难',
    '不着车',
    '漏油',
    '漏水',
    '照明失灵',
    '有异响',
    '排烟异常',
    '温度异常',
    '其他',
  ])
</script>

<template>
  <sl-vehicle-panel title="车辆故障">
    <uni-list>
      <uni-list-item direction="column" :border="false" title="故障类型">
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
  @import 'styles/vehicle-breakdown.scss';
</style>
