import { createUniFetch } from 'uni-app-fetch'
import { tabBar } from '../pages.json'
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
    response: ({ statusCode, data }) => {
      /**
       * 判断路径是否为 tabBar 页面
       * 如果是的情况使用 switchTab 跳转
       * 否则使用 redirectTo 跳转
       */
      const tabBarPagePaths = tabBar.list.map(({ pagePath }) => pagePath)
      const pageStack = getCurrentPages()
      const redirectURL = pageStack[pageStack.length - 1].route

      const routeType = tabBarPagePaths.includes(redirectURL)
        ? 'switchTab'
        : 'redirectTo'

      if (statusCode === 401) {
        return uni.redirectTo({
          url: `/pages/login/index?routeType=${routeType}&redirectURL=/${redirectURL}`,
        })
      }

      return data
    },
  },
})

export default uniFetch
