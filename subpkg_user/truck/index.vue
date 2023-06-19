<script setup>
  import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import userApi from '@/apis/user'

  // 车辆信息
  const truckInfo = ref({})

  // 页面加载完成
  onLoad(getTruckInfo)

  // 车辆信息接口
  async function getTruckInfo() {
    const { code, data } = await userApi.truck()
    if (code !== 200) return uni.$utils.toast()
    truckInfo.value = data
  }
</script>

<template>
  <view class="page-container">
    <image
      class="truck-picture"
      mode="aspectFill"
      :src="
        truckInfo.pictureList?.[0].url || '/static/uploads/truck_picture.jpg'
      "
    ></image>
    <view class="truck-meta">
      <uni-list :border="false">
        <uni-list-item
          :border="false"
          title="车辆编号"
          :right-text="truckInfo.id"
        />
        <uni-list-item
          :border="false"
          title="车辆号牌"
          :right-text="truckInfo.licensePlate"
        />
        <uni-list-item
          :border="false"
          title="车型"
          :right-text="truckInfo.truckType"
        />
        <uni-list-item
          :border="false"
          title="所属机构"
          right-text="北京中转站"
        />
        <uni-list-item
          :border="false"
          title="载重"
          :right-text="truckInfo.allowableLoad"
        />
      </uni-list>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
