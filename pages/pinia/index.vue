<script setup>
  import { storeToRefs } from 'pinia'
  import { useCounterStore } from '@/stores/counter'

  // 获取 store 对象
  const store = useCounterStore()
  const { count } = storeToRefs(store)
  const { increment, decrement } = store
</script>
<template>
  <view class="counter">
    <button @click="decrement" class="button" type="primary">-</button>
    <input class="input" v-model="count" type="text" />
    <button @click="increment" class="button" type="primary">+</button>
  </view>
</template>

<style lang="scss" scoped>
  .counter {
    display: flex;
    padding: 100rpx;
  }

  .input {
    flex: 1;
    height: 96rpx;
    text-align: center;
    border: 2rpx solid #eee;
    box-sizing: border-box;
  }

  .button {
    width: 100rpx;
    margin: 0;

    &:first-child {
      border-start-end-radius: 0;
      border-end-end-radius: 0;
    }
    &:last-child {
      border-start-start-radius: 0;
      border-end-start-radius: 0;
    }
  }
</style>
