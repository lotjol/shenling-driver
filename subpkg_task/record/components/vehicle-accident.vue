<script setup>
  import { ref } from 'vue'

  // 被选中标签的索引值
  const tabIndex = ref(-1)

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
      <view class="label">车辆事件</view>
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
            <view class="vehicle-options">
              <view
                @click="onOptionSelect(index)"
                :class="{ active: tabIndex === index }"
                class="option"
                :key="option"
                v-for="(option, index) in types"
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
  @import './styles/vehicle-accident.scss';
</style>
