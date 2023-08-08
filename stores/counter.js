import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // 状态数据（相当于 state）
  const count = ref(0)
  // 定义方法（相当于 actions）
  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  // 一定要将定义的数据和方法返回
  return { count, increment, decrement }
}, {
  persist: {
    paths: ['count'],
  }
})