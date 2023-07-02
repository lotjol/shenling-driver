<script></script>
<template>
  <scroll-view scroll-y refresher-enabled class="scroll-view">
    <view class="scroll-view-wrapper">
      <view class="task-card">
        <navigator hover-class="none" url="/subpkg_task/detail/index?id=001">
          <view class="header">
            <text class="no">任务编号: XAHH1234567</text>
          </view>
          <view class="body">
            <view class="timeline">
              <view class="line"
                >北京市昌平区回龙观街道西三旗桥东金燕龙写字楼8877号</view
              >
              <view class="line">河南省郑州市路北区北清路99号</view>
            </view>
          </view>
        </navigator>
        <view class="footer">
          <view class="label">提货时间</view>
          <view class="time">2022.05.04 13:00</view>
          <navigator
            hover-class="none"
            url="/subpkg_task/delivery/index"
            class="action"
          >
            交付
          </navigator>
        </view>
      </view>
      <view class="task-card">
        <navigator hover-class="none" url="/subpkg_task/detail/index?id=001">
          <view class="header">
            <text class="no">任务编号: XAHH1234567</text>
          </view>
          <view class="body">
            <view class="timeline">
              <view class="line"
                >北京市昌平区回龙观街道西三旗桥东金燕龙写字楼8877号</view
              >
              <view class="line">河南省郑州市路北区北清路99号</view>
            </view>
          </view>
        </navigator>
        <view class="footer">
          <view class="label">提货时间</view>
          <view class="time">2022.05.04 13:00</view>
          <navigator
            hover-class="none"
            url="/subpkg_task/record/index"
            class="action"
            >回车登记</navigator
          >
        </view>
      </view>
      <view v-if="false" class="task-blank">无在途货物</view>
    </view>
  </scroll-view>
</template>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
