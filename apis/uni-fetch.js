import { createUniFetch } from 'uni-app-fetch'
import { useUserStore } from '@/stores/user'

const uniFetch = createUniFetch({
  loading: { title: '正在加载...', mask: true },
  baseURL: 'https://slwl-api.itheima.net',
  // baseURL: 'http://172.16.39.134:9527',
  intercept: {
    request: (options) => {
      const userState = useUserStore()
      // 自定义头信息（token）
      options.header = Object.assign({}, options.header, {
        Authorization: userState.token,
      })
    },
    response: ({ data }) => {
      return data
    },
  },
})

export default uniFetch
