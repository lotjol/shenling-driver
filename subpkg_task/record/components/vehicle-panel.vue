<script setup>
  import { ref, defineProps } from 'vue'

  // 是否选中
  const show = ref(true)

  // 组件自定义属性
  defineProps({
    title: String,
  })

  // 显示/隐藏
  function change() {
    show.value = !this.show
  }
</script>

<template>
  <view class="vehicle-panel">
    <view class="vehicle-panel-header">
      <view class="label">{{ title }}</view>
      <radio-group class="radio-group" @click="change">
        <label class="label">
          <radio class="radio" color="#EF4F3F" />
          <text>是</text>
        </label>
        <label class="label">
          <radio class="radio" color="#EF4F3F" />
          <text>否</text>
        </label>
      </radio-group>
    </view>
    <view v-show="show" class="vehicle-panel-body">
      <slot></slot>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  @import 'styles/vehicle-panel.scss';
</style>
