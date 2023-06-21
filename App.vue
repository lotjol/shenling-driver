<script>
  import { useUserStore } from '@/stores/user'
  export default {
    onLaunch: function () {
      // #ifdef APP
      uni.login({
        provider: 'univerify',
        univerifyStyle: {
          icon: {
            path: 'static/logo.png',
          },
          authButton: {
            normalColor: '#ef4f3f', // 授权按钮正常状态背景颜色 默认值：#3479f5
            highlightColor: '#ef4f3f', // 授权按钮按下状态背景颜色 默认值：#2861c5（仅ios支持）
            disabledColor: '#fadcd9', // 授权按钮不可点击时背景颜色 默认值：#73aaf5（仅ios支持）
            textColor: '#ffffff', // 授权按钮文字颜色 默认值：#ffffff
            title: '本机号码一键登录1', // 授权按钮文案 默认值：“本机号码一键登录”
            borderRadius: '24px', // 授权按钮圆角 默认值："24px" （按钮高度的一半）
          },
          fullScreen: true,
          privacyTerms: {
            defaultCheckBoxState: false, // 条款勾选框初始状态 默认值： true
            isCenterHint: false, //未勾选服务条款时点击登录按钮的提示是否居中显示 默认值: false (3.7.13+ 版本支持)
            checkBoxSize: 12, // 可选 条款勾选框大小，仅android支持
            textColor: '#BBBBBB', // 文字颜色 默认值：#BBBBBB
            termsColor: '#ef4f3f', //  协议文字颜色 默认值： #5496E3
            prefix: '我已阅读并同意', // 条款前的文案 默认值：“我已阅读并同意”
            suffix: '并使用本机号码登录', // 条款后的文案 默认值：“并使用本机号码登录”
          },
        },
      })
      // #endif
    },
    onShow: function () {},
    onHide: function () {
      // console.log('App Hide')
    },
  }
</script>

<style lang="scss">
  @import './fonts.scss';

  button::after {
    display: none;
  }

  cover-view {
    white-space: pre-wrap;
    /* #ifndef APP-PLUS */
    overflow: visible;
    /* #endif */
  }

  /*每个页面公共css */
  .page-container {
    height: 100vh;
    /* #ifdef H5 */
    height: calc(100vh - 44px);
    /* #endif  */
    overflow-y: auto;
    box-sizing: border-box;
    background-color: $uni-bg-color;
  }

  .error {
    color: $uni-primary !important;
  }

  .uni-textarea-placeholder {
    font-size: $uni-font-size-base;
  }

  .uni-scroll-view-content {
    height: auto !important;
  }

  .uni-scroll-view-refresher {
    margin-top: 15rpx;
    transform: scale(0.9);
    background-color: transparent !important;
  }

  .scroll-view-wrapper {
    overflow: hidden;
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

  .uni-checkbox-input:hover {
    border-color: #d1d1d1 !important;
  }
</style>
