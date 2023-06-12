<script setup>
  import { ref } from 'vue'

  // 被选中标签的索引值
  const tabIndex = ref(-1)

  // 是不显示详细的选项
  const show = ref(false)

  // 故障类型
  const types = ref([
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

  function onRadioChange(ev) {
    // 展开详细的选项
    show.value = !!parseInt(ev.detail.value)
    // 清空已选中的选项
    tabIndex.value = -1
    // 传递数据到父组件
  }

  function onOptionSelect(index) {
    // 设置选中状态
    tabIndex.value = index
    // 传递选中的数据
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
            <view class="vehicle-options">
              <view
                @click="onOptionSelect(index)"
                v-for="(option, index) in types"
                :key="option"
                :class="{ active: tabIndex === index }"
                class="option"
              >
                {{ option }}
              </view>
            </view>
            <view class="textarea-wrapper">
              <textarea class="textarea" placeholder="请输入异常描述"></textarea>
              <view class="words-count">0/50</view>
            </view>
          </template>
        </uni-list-item>
        <uni-list-item direction="column" :border="false" title="请拍照">
          <template v-slot:footer>
            <uni-file-picker limit="6"></uni-file-picker>
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
