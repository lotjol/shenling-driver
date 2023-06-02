import { createUniFetch } from 'uni-app-fetch'

const uniFetch = createUniFetch({
  loading: { title: '正在加载...', mask: true },
  baseURL: 'https://slwl-api.itheima.net',
  intercept: {
    request: () => {},
    response: ({ data }) => {
      return data
    },
  },
})

export default uniFetch
