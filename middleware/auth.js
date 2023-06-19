// import { defineMiddleware } from '../vite-plugin-uni-middleware/runtime'

import { tabBar } from '../pages.json'
import { useUserStore } from '@/stores/user'

export default (to, _from) => {
  /**
   * 读取 token 判断用户是事否登录过
   */
  const userState = useUserStore()
  const isLogin = !!userState.token

  /**
   * 判断路径是否为 tabBar 页面
   * 如果是的情况使用 switchTab 跳转
   * 否则使用 redirectTo 跳转
   */
  const tabBarPagePaths = tabBar.list.map(({ pagePath }) => pagePath)
  const redirectURL = to.redirectURL || 'pages/task/index'
  const routeType = tabBarPagePaths.includes(redirectURL)
    ? 'switchTab'
    : 'redirectTo'

  if (!isLogin) {
    return `/pages/login/index?routeType=${routeType}&redirectURL=/${redirectURL}`
  }
}
