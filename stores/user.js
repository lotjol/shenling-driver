import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    // 登录状态
    const token = ref('')
    // 更新登录状态
    function setToken(token) {
      token.value = token
    }

    return { token }
  },
  { persist: true }
)
