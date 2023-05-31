<script setup>
  import { ref, defineProps } from 'vue'

  // 被选中选项的索引
  const activeIndex = ref(-1)

  // 切换选中的选项
  function select(index) {
    activeIndex.value = index
  }

  // 组件自定义属性
  const props = defineProps({
    options: {
      type: Array,
      default: [],
    },
  })
</script>

<template>
  <view class="vehicle-options">
    <view
      @click="select(index)"
      v-for="(option, index) in props.options"
      :key="option"
      :class="{ active: index === activeIndex }"
      class="option"
    >
      {{ option }}
    </view>
  </view>
</template>

<style lang="scss" scoped>
  @import 'styles/vehicle-options.scss';
</style>
