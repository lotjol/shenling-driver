<script>
  export default {
    onLaunch: function () {
      // console.log('App Launch')
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
    max-width: 400rpx;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: right;
    overflow: hidden;
    white-space: nowrap;
    font-size: $uni-font-size-base !important;
    color: $uni-secondary-color !important;
  }

  .uni-checkbox-input:hover {
    border-color: #d1d1d1 !important;
  }

  .uni-card {
    margin-top: 0 !important;
  }
</style>
