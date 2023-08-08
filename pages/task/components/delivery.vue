<script setup>
  import { ref, onMounted } from 'vue'
  import taskApi from '@/apis/task'

  // 在途任务列表
  const deliveryList = ref([])
  // 在途列任务列表是否为空
  const isEmpty = ref(false)

  // 生命周期（获取数据）
  onMounted(() => {
    getDeliveryList()
  })

  // 在途任务列表
  async function getDeliveryList() {
    const { code, data } = await taskApi.list(2)
    if (code !== 200) return uni.utils.toast('在途任务获取失败！')
    // 渲染数据
    deliveryList.value = data.items || []
    isEmpty.value = deliveryList.value.length === 0
  }
</script>
<template>
  <scroll-view scroll-y class="scroll-view">
    <view class="scroll-view-wrapper">
      <view
        v-for="delivery in deliveryList"
        :key="delivery.id"
        class="task-card"
      >
        <navigator
          hover-class="none"
          :url="`/subpkg_task/detail/index?id=${delivery.id}`"
        >
          <view class="header">
            <text class="no">任务编号: {{ delivery.transportTaskId }}</text>
          </view>
          <view class="body">
            <view class="timeline">
              <view class="line">{{ delivery.startAddress }}</view>
              <view class="line">{{ delivery.endAddress }}</view>
            </view>
          </view>
        </navigator>
        <view class="footer">
          <view class="label">到货时间</view>
          <view class="time">{{ delivery.planArrivalTime }}</view>
          <navigator
            v-if="delivery.status === 2"
            hover-class="none"
            :url="`/subpkg_task/delivery/index?id=${delivery.id}`"
            class="action"
          >
            交付
          </navigator>
          <navigator
            v-if="delivery.status === 4"
            hover-class="none"
            :url="`/subpkg_task/record/index?transportTaskId=${delivery.transportTaskId}&actualDepartureTime=${delivery.actualDepartureTime}`"
            class="action"
          >
            回车登记
          </navigator>
        </view>
      </view>
      <view v-if="isEmpty" class="task-blank">无在途货物</view>
    </view>
  </scroll-view>
</template>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
