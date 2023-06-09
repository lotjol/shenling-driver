<script setup>
  import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import userApi from '@/apis/user'

  // 用户信息
  const userProfile = ref({})

  // 生命周期（页面加载完成）
  onLoad(getUserProfile)

  // 用户信息接口
  async function getUserProfile() {
    const { code, data } = await userApi.profile()
    if (code !== 200) return uni.$utils.toast()
    userProfile.value = data
  }
</script>

<template>
  <view class="page-container">
    <view class="user-profile">
      <image class="avatar" :src="userProfile.avatar || '/static/images/avatar_2.png'" mode=""></image>
      <text class="username">{{ userProfile.name }}</text>
      <text class="no">司机编号：{{ userProfile.number }}</text>
      <text class="mobile">手机号码：{{ userProfile.phone }}</text>
    </view>
    <view class="month-overview">
      <view class="title">本月任务</view>
      <view class="content">
        <view class="item">
          <text class="volumn">18</text>
          <text class="label">任务总量</text>
        </view>
        <view class="item">
          <text class="volumn">16</text>
          <text class="label">完成任务量</text>
        </view>
        <view class="item">
          <text class="volumn">3987</text>
          <text class="label">运输里程(km)</text>
        </view>
      </view>
    </view>
    <view class="entry-list">
      <uni-list :border="false">
        <uni-list-item to="/subpkg_user/truck/index" showArrow title="车辆信息" />
        <uni-list-item to="/subpkg_user/task/index" showArrow title="任务数据" />
        <uni-list-item to="/subpkg_user/settings/index" showArrow title="系统设置" />
      </uni-list>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
