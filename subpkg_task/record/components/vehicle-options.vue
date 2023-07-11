<script setup>
  import { ref } from 'vue'

  // 当前被选中选项的索引值
  const tabIndex = ref(-1)

  // 接收传入组件的数据
  const props = defineProps({
    types: Array,
  })

  // 点击选中选项
  function onOptionSelect(index) {
    // 高亮显示选中的选项
    tabIndex.value = index
  }
</script>

<template>
  <view class="vehicle-options">
    <view
      class="option"
      :class="{ active: tabIndex === index }"
      v-for="(option, index) in props.types"
      :key="option.id"
      @click="onOptionSelect(index)"
    >
      {{ option.text }}
    </view>
  </view>
</template>

<style lang="scss" scoped>
  .vehicle-options {
    display: flex;
    flex-wrap: wrap;
    font-size: $uni-font-size-small;

    .option {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 180rpx;
      height: 70rpx;
      padding-top: 1rpx;
      margin-top: 30rpx;
      margin-right: 38rpx;
      color: $uni-secondary-color;
      border: 2rpx solid $uni-bg-color;
      background-color: $uni-bg-color;
      border-radius: 20rpx;

      &:nth-child(3n) {
        margin-right: 0;
      }

      &.active {
        color: $uni-primary;
        border: 2rpx solid $uni-primary;
        background-color: #ffe0dd;
      }
    }
  }
</style>
