<script setup>
  import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import taskApi from '@/apis/task'

  // 弹层实例
  const popup = ref(null)
  // 任务详情数据
  const taskDetail = ref({})

  // 获取地址参数
  onLoad((params) => {
    getTaskDetail(params.id)
  })

  // 任务详情
  async function getTaskDetail(id) {
    id = undefined // 测试阶段
    const { code, data } = await taskApi.detail(id)
    if (code !== 200) return uni.$utils.toast()
    taskDetail.value = data
  }

  // 延迟提货
  function delayPickUp(id, planTime) {
    planTime = planTime || '2023-06-10 13:10'
    if (!id) return
    uni.navigateTo({ url: `/subpkg_task/delay/index?id=${id}&planTime=${planTime}` })
  }

  // 提货
  function pickUp(id) {
    if (!id) return
    uni.$utils.toast('变更任务状态...')
  }

  // 路由返回
  function goBack() {
    uni.navigateBack()
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
          <view class="content">
            <view class="timeline">
              <view class="line">{{ taskDetail.startAddress }}</view>
              <view class="line">{{ taskDetail.endAddress }}</view>
            </view>
            <view class="info-list">
              <view class="info-list-item">
                <text class="label">任务编号</text>
                <text class="value">{{ taskDetail.transportTaskId }}</text>
              </view>
              <view class="info-list-item">
                <text class="label">联系人</text>
                <text class="value">{{ taskDetail.finishHandover }}</text>
              </view>
              <view class="info-list-item">
                <text class="label">联系电话</text>
                <text class="value">{{ taskDetail.finishHandoverPhone }}</text>
              </view>
              <view class="info-list-item">
                <text class="label">提货时间</text>
                <text class="value">{{ 'xxxx' }}</text>
              </view>
              <view class="info-list-item">
                <text class="label">预计送达时间</text>
                <text class="value">{{ 'dddddd' }}</text>
              </view>
            </view>
          </view>
        </uni-collapse-item>
        <uni-collapse-item :border="false" :show-animation="false" title-border="none" title="车辆司机信息">
          <view class="content driver-info">
            <view class="info-list">
              <view class="info-list-item">
                <text class="label">车牌号</text>
                <text class="value">{{ taskDetail.licensePlate }}</text>
              </view>
              <view class="info-list-item">
                <text class="label">司机姓名</text>
                <text class="value">{{ taskDetail.driverName }}</text>
              </view>
            </view>
          </view>
        </uni-collapse-item>
        <uni-collapse-item :border="false" :show-animation="false" title-border="none" title="运输路线">
          <view class="content transit-info">
            <view class="transit-line">
              <view class="start">
                <text class="lead">{{ taskDetail.startProvince }}</text>
                <text class="normal">{{ taskDetail.startCity }}</text>
              </view>
              <view class="end">
                <text class="lead">{{ taskDetail.endProvince }}</text>
                <text class="normal">{{ taskDetail.endCity }}</text>
              </view>
            </view>
            <navigator hover-class="none" url="/subpkg_task/guide/index" class="guide">
              <text class="iconfont icon-guide"></text>
              <text>开始导航</text>
            </navigator>
          </view>
        </uni-collapse-item>
        <uni-collapse-item
          v-if="false"
          :border="false"
          :show-animation="false"
          title-border="none"
          title="异常信息"
        >
          <view class="content except-info">
            <view class="info-list">
              <view class="info-list-item">
                <text class="label">上报时间</text>
                <text class="value">2022.05.04 13:00</text>
              </view>
              <view class="info-list-item">
                <text class="label">异常类型</text>
                <text class="value">有异常响动</text>
              </view>
              <view class="info-list-item">
                <text class="label">处理结果</text>
                <text class="value">继续运输</text>
              </view>
            </view>
            <view class="info-list">
              <view class="info-list-item">
                <text class="label">上报时间</text>
                <text class="value">2022.05.04 13:00</text>
              </view>
              <view class="info-list-item">
                <text class="label">异常类型</text>
                <text class="value">有异常响动</text>
              </view>
              <view class="info-list-item">
                <text class="label">处理结果</text>
                <text class="value">继续运输</text>
              </view>
            </view>
          </view>
        </uni-collapse-item>
        <uni-collapse-item :border="false" :show-animation="false" title-border="none" title="物品信息">
          <view class="content order-info">
            <view class="search-bar">
              <text class="iconfont icon-search"></text>
              <input class="input" type="text" placeholder="输入运单号" />
            </view>
            <view class="transit-order">
              <uni-row>
                <uni-col :span="14">SD1234567890123</uni-col>
                <uni-col :span="6">1件</uni-col>
                <uni-col style="text-align: right" :span="4">5kg</uni-col>
              </uni-row>
              <uni-row>
                <uni-col :span="14">SD1234567890123</uni-col>
                <uni-col :span="6">1件</uni-col>
                <uni-col style="text-align: right" :span="4">5kg</uni-col>
              </uni-row>
              <uni-row>
                <uni-col :span="14">SD1234567890123</uni-col>
                <uni-col :span="6">1件</uni-col>
                <uni-col style="text-align: right" :span="4">5kg</uni-col>
              </uni-row>
              <uni-row>
                <uni-col :span="14">SD1234567890123</uni-col>
                <uni-col :span="6">1件</uni-col>
                <uni-col style="text-align: right" :span="4">5kg</uni-col>
              </uni-row>
            </view>
          </view>
        </uni-collapse-item>
        <uni-collapse-item :border="false" :show-animation="false" title-border="none" title="提货信息">
          <view class="content receipt-info">
            <uni-file-picker limit="3" title="请拍照上传回单凭证"></uni-file-picker>
            <uni-file-picker limit="3" title="请拍照上传货品照片"></uni-file-picker>
          </view>
        </uni-collapse-item>
      </uni-collapse>
    </view>
    <view class="toolbar">
      <template v-if="taskDetail.status === 1">
        <button @click="delayPickUp(taskDetail.id, taskDetail.planDepartureTime)" class="button delay">
          延迟提货
        </button>
        <button @click="pickUp(taskDetail.id)" class="button primary">提货</button>
      </template>
      <template v-if="taskDetail.status === 2">
        <button class="button delay">异常上报</button>
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
