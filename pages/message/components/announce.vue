<script>
  export default {
    options: {
      // virtualHost: true,
    },
  }
</script>
<template>
  <scroll-view class="scroll-view" refresher-enabled scroll-y>
    <view class="scroll-view-wrapper">
      <view class="message-action">
        <text class="iconfont icon-clear"></text>
        全部已读
      </view>
      <uni-list :border="false">
        <uni-list-item
          to="/subpkg_message/content/index"
          ellipsis="1"
          title="在营车辆年检通知，为保障车辆能在营车辆年检通知，为保障车辆能够"
          rightText="05-06 06:16"
        >
          <template v-slot:header>
            <text class="dot"></text>
          </template>
        </uni-list-item>
        <uni-list-item
          to="/subpkg_message/content/index"
          ellipsis="1"
          title="在营车辆年检通知，为保障车辆能在营车辆年检通知，为保障车辆能够"
          rightText="05-06 06:16"
        />
        <uni-list-item
          to="/subpkg_message/content/index"
          ellipsis="1"
          title="在营车辆年检通知，为保障车辆能在营车辆年检通知，为保障车辆能够"
          rightText="05-06 06:16"
        />
        <uni-list-item
          to="/subpkg_message/content/index"
          ellipsis="1"
          title="在营车辆年检通知，为保障车辆能在营车辆年检通知，为保障车辆能够"
          rightText="05-06 06:16"
        />
        <uni-list-item
          to="/subpkg_message/content/index"
          ellipsis="1"
          title="在营车辆年检通知，为保障车辆能在营车辆年检通知，为保障车辆能够"
          rightText="05-06 06:16"
        /> </uni-list
    ></view>
  </scroll-view>
</template>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
