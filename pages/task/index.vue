<script setup>
  import { ref } from 'vue'
  // 标签页索引
  const tabIndex = ref(0)

  // 切换 Tab 标签页
  const onTabChange = (index) => {
    tabIndex.value = index
  }
</script>

<template>
  <view class="page-container">
    <view class="task-tabbar">
      <text @click="onTabChange(0)" :class="{ active: tabIndex === 0 }" class="tab">待提货</text>
      <text @click="onTabChange(1)" :class="{ active: tabIndex === 1 }" class="tab">在途</text>
      <text @click="onTabChange(2)" :class="{ active: tabIndex === 2 }" class="tab">已完成</text>
    </view>
    <scroll-view
      refresher-background="#f4f4f4"
      scroll-y
      refresher-enabled
      class="task-list"
      v-show="tabIndex === 0"
    >
      <view class="task-card">
        <navigator url="/subpkg_task/detail/index?id=001">
          <view class="header">
            <text class="no">任务编号: XAHH1234567</text>
            <text class="status">已延迟</text>
          </view>
          <view class="body">
            <view class="timeline">
              <view class="line">北京市昌平区回龙观街道西三旗桥东金燕龙写字楼8877号</view>
              <view class="line">河南省郑州市路北区北清路99号</view>
            </view>
          </view>
        </navigator>
        <view class="footer">
          <view class="label">提货时间</view>
          <view class="time">2022.05.04 13:00</view>
          <button class="action">提货</button>
        </view>
      </view>
      <view class="task-card">
        <navigator url="/subpkg_task/detail/index?id=001">
          <view class="header">
            <text class="no">任务编号: XAHH1234567</text>
          </view>
          <view class="body">
            <view class="timeline">
              <view class="line">北京市昌平区回龙观街道西三旗桥东金燕龙写字楼8877号</view>
              <view class="line">河南省郑州市路北区北清路99号</view>
            </view>
          </view>
        </navigator>
        <view class="footer">
          <view class="label">提货时间</view>
          <view class="time">2022.05.04 13:00</view>
          <button disabled class="action">提货</button>
        </view>
      </view>
      <view v-if="false" class="task-blank">无待提货物</view>
    </scroll-view>
    <scroll-view
      refresher-background="#f4f4f4"
      scroll-y
      refresher-enabled
      class="task-list"
      v-show="tabIndex === 1"
    >
      <view class="task-card">
        <navigator url="/subpkg_task/detail/index?id=001">
          <view class="header">
            <text class="no">任务编号: XAHH1234567</text>
          </view>
          <view class="body">
            <view class="timeline">
              <view class="line">北京市昌平区回龙观街道西三旗桥东金燕龙写字楼8877号</view>
              <view class="line">河南省郑州市路北区北清路99号</view>
            </view>
          </view>
        </navigator>
        <view class="footer">
          <view class="label">提货时间</view>
          <view class="time">2022.05.04 13:00</view>
          <button class="action">交付</button>
        </view>
      </view>
      <view class="task-card">
        <navigator url="/subpkg_task/detail/index?id=001">
          <view class="header">
            <text class="no">任务编号: XAHH1234567</text>
          </view>
          <view class="body">
            <view class="timeline">
              <view class="line">北京市昌平区回龙观街道西三旗桥东金燕龙写字楼8877号</view>
              <view class="line">河南省郑州市路北区北清路99号</view>
            </view>
          </view>
        </navigator>
        <view class="footer">
          <view class="label">提货时间</view>
          <view class="time">2022.05.04 13:00</view>
          <button class="action">回车登记</button>
        </view>
      </view>
      <view v-if="false" class="task-blank">无在途货物</view>
    </scroll-view>
    <view v-show="tabIndex === 2" class="task-search">
      <view class="search-bar">
        <text class="iconfont icon-search"></text>
        <input class="input" type="text" placeholder="输入任务编号" />
      </view>
      <view class="filter-bar">
        <picker class="picker" mode="date">2023.05.20</picker>
        <text class="text">至</text>
        <picker class="picker" mode="date">结束时间</picker>
        <button disabled class="button">筛选</button>
      </view>
    </view>
    <scroll-view
      refresher-background="#f4f4f4"
      scroll-y
      refresher-enabled
      class="task-list"
      v-show="tabIndex === 2"
    >
      <view v-if="false" class="task-card">
        <navigator url="/subpkg_task/detail/index?id=001">
          <view class="header">
            <text class="no">任务编号: XAHH1234567</text>
          </view>
          <view class="body">
            <view class="timeline">
              <view class="line">北京市昌平区回龙观街道西三旗桥东金燕龙写字楼8877号</view>
              <view class="line">河南省郑州市路北区北清路99号</view>
            </view>
          </view>
        </navigator>
        <view class="footer flex">
          <view class="label">提货时间</view>
          <view class="time">2022.05.04 13:00</view>
        </view>
      </view>
      <view class="task-blank">无完成货物</view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
