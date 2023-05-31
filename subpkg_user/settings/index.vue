<script setup></script>

<template>
  <view class="page-container">
    <view class="settings-list">
      <uni-list :border="false">
        <uni-list-item title="换绑手机" to="/subpkg_user/mobile/index" show-arrow />
        <uni-list-item title="修改密码" to="/subpkg_user/password/index" show-arrow />
        <uni-list-item title="消息通知设置" to="/subpkg_user/notify/index" show-arrow />
        <uni-list-item title="清理缓存" show-arrow />
      </uni-list>
    </view>
    <button class="logout-button">退出</button>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
