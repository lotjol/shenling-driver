<script>
  import { useUserStore } from '@/stores/user'
  import { tabBar } from './pages.json'
  export default {
    onLaunch: function () {
      const tabBarPagePaths = tabBar.list.map(({ pagePath }) => pagePath)
      // 简易的登录检测
      const userState = useUserStore()
      const isLogin = !!userState.token
      const pageStack = getCurrentPages()
      const currentPage = pageStack[pageStack.length - 1]
      const redirectURL = currentPage ? currentPage.route : 'pages/task/index'
      const routeType = tabBarPagePaths.includes(redirectURL) ? 'switchTab' : 'redirectTo'
      if (!isLogin) {
        uni.redirectTo({
          url: `/pages/login/index?redirectURL=/${redirectURL}&routeType=${routeType}`,
        })
      }
    },
    onShow: function () {
      // console.log('App Show')
    },
    onHide: function () {
      // console.log('App Hide')
    },
  }
</script>

<style lang="scss">
  @import './fonts.scss';

  button::after {
    border: none;
  }

  cover-view {
    white-space: pre-wrap;
    /* #ifndef APP-PLUS */
    overflow: visible;
    /* #endif */
  }

  /*每个页面公共css */
  .page-container {
    box-sizing: border-box;
    background-color: $uni-bg-color;
  }

  .uni-nav-bar-text {
    /* #ifndef APP-PLUS */
    font-size: 16px !important;
    font-weight: 700;
    /* #endif */
  }

  .uni-list-item__container {
    padding-top: 32rpx !important;
    padding-bottom: 32rpx !important;
  }

  .uni-list--border::after {
    left: 30rpx !important;
    right: 30rpx !important;
    background-color: $uni-border-1 !important;
  }

  .uni-list-item__content-title {
    font-size: $uni-font-size-base !important;
    color: $uni-main-color !important;
  }

  .uni-list-item__extra-text {
    font-size: $uni-font-size-base !important;
    color: $uni-secondary-color !important;
  }
</style>
