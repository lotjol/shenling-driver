<script setup>
  import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import slTaskBasic from './components/task-basic'
  import slTaskDriver from './components/task-driver'
  import slTaskTransit from './components/task-transit'
  import slTaskException from './components/task-exception'
  import slTaskOrder from './components/task-order'
  import slTaskReceipt from './components/task-receipt'

  // 记录任务的状态
  const status = ref('')
  // 弹层实例
  const popup = ref(null)

  // 获取地址参数
  onLoad((params) => {
    status.value = params.status
  })

  // 路由返回
  function goBack() {
    uni.navigateBack()
  }

  // 页面跳转
  function goExcept() {
    uni.navigateTo({
      url: '/subpkg_task/except/index',
    })
  }

  // 页面跳转
  function goDelay() {
    uni.navigateTo({
      url: '/subpkg_task/delay/index',
    })
  }

  // 取消任务
  function cancelTask() {
    popup.value.open()
  }
</script>

<template>
  <view class="page-container">
    <uni-nav-bar
      @clickLeft="goBack"
      @clickRight="cancelTask"
      :border="false"
      fixed
      statusBar
      left-icon="left"
      rightText="取消任务"
      title="任务详情"
    />
    <view class="task-detail">
      <uni-collapse>
        <uni-collapse-item open :show-animation="false" :border="false" title-border="none" title="基本信息">
          <sl-task-basic></sl-task-basic>
        </uni-collapse-item>
        <uni-collapse-item :border="false" :show-animation="false" title-border="none" title="车辆司机信息">
          <sl-task-driver></sl-task-driver>
        </uni-collapse-item>
        <uni-collapse-item :border="false" :show-animation="false" title-border="none" title="运输路线">
          <sl-task-transit></sl-task-transit>
        </uni-collapse-item>
        <uni-collapse-item :border="false" :show-animation="false" title-border="none" title="异常信息">
          <sl-task-exception></sl-task-exception>
        </uni-collapse-item>
        <uni-collapse-item :border="false" :show-animation="false" title-border="none" title="物品信息">
          <sl-task-order></sl-task-order>
        </uni-collapse-item>
        <uni-collapse-item
          :border1="false"
          :border="false"
          :show-animation="false"
          title-border="none"
          title="提货信息"
        >
          <sl-task-receipt></sl-task-receipt>
        </uni-collapse-item>
      </uni-collapse>
    </view>
    <view class="toolbar">
      <template v-if="status === '待提货'">
        <button @click="goDelay" class="button delay">延迟提货</button>
        <button class="button primary">提货</button>
      </template>
      <template v-if="status === '在途'">
        <button @click="goExcept" class="button delay">异常上报</button>
        <button class="button primary">支付</button>
      </template>
    </view>
    <uni-popup ref="popup" type="bottom">
      <view class="action-sheet">
        <text class="item">010-9987 0098</text>
        <text class="item cancel">取消</text>
      </view>
    </uni-popup>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
