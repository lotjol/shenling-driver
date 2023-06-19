<script setup>
  import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import taskApi from '@/apis/task'

  // 任务详情
  const taskDetail = ref({})

  // 获取地址参数
  onLoad((params) => {
    getTaskDetail(params.id)
  })

  async function getTaskDetail(id) {
    if (!id) return
    const { code, data } = await taskApi.detail(id)
    if (code !== 200) return uni.$utils.toast()
    taskDetail.value = data
  }

  // 根据运单号搜索商品
  function onInputConfirm(ev) {
    uni.navigateTo({
      url: `/subpkg_task/orders/index?xxx=${ev.detail.value}`,
    })
  }

  // 在小程序或APP 中扫码
  function onScanCode() {
    uni.scanCode({})
  }
</script>

<template>
  <view class="page-container" v-if="taskDetail">
    <view class="search-bar">
      <!-- #ifdef APP -->
      <text @click="onScanCode" class="iconfont icon-scan"></text>
      <!-- #endif -->
      <!-- #ifndef APP -->
      <text class="iconfont icon-search"></text>
      <!-- #endif -->
      <input
        class="input"
        @confirm="onInputConfirm"
        type="text"
        placeholder="输入运单号"
      />
    </view>
    <scroll-view scroll-y class="task-detail">
      <view class="basic-info panel">
        <view class="panel-title">基本信息</view>
        <view class="timeline">
          <view class="line">{{ taskDetail.startAddress }}</view>
          <view class="line">{{ taskDetail.endAddress }}</view>
          <navigator
            hover-class="none"
            url="/subpkg_task/guide/index"
            class="guide"
          >
            <text class="iconfont icon-guide"></text>
            <text>开始导航</text>
          </navigator>
        </view>
        <view class="info-list">
          <view class="info-list-item">
            <text class="label">任务编号</text>
            <text class="value">{{ taskDetail.transportTaskId }}</text>
          </view>
          <view class="info-list-item">
            <text class="label">联系人</text>
            <text class="value">{{ taskDetail.startHandoverName }}</text>
          </view>
          <view class="info-list-item">
            <text class="label">联系电话</text>
            <text class="value">{{ taskDetail.startHandoverPhone }}</text>
          </view>
          <view class="info-list-item">
            <text class="label">预计提货时间</text>
            <text class="value">{{ taskDetail.planDepartureTime }}</text>
          </view>
          <view class="info-list-item">
            <text class="label">实际提货时间</text>
            <text class="value">{{ taskDetail.actualDepartureTime }}</text>
          </view>
          <view class="info-list-item">
            <text class="label">预计送达时间</text>
            <text class="value">{{ taskDetail.planArrivalTime }}</text>
          </view>
          <view class="info-list-item">
            <text class="label">实际送达时间</text>
            <text class="value">{{ taskDetail.actualDepartureTime }}</text>
          </view>
        </view>
      </view>
      <view class="except-info panel">
        <view class="panel-title">异常信息</view>
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

      <view class="panel pickup-info">
        <view class="panel-title">提货信息</view>
        <view class="label">提货凭证</view>
        <view class="pictures">
          <image
            v-for="picture in taskDetail.cargoPickUpPictureList"
            :key="picture.url"
            class="picture"
            :src="picture.url"
            mode="aspectFill"
          />
          <view
            v-if="!taskDetail.cargoPickUpPictureList?.length"
            class="picture-blank"
            >暂无图片</view
          >
        </view>
        <view class="label">货品照片</view>
        <view class="pictures">
          <image
            v-for="picture in taskDetail.cargoPictureList"
            :key="picture.url"
            class="picture"
            :src="picture.url"
            mode="aspectFill"
          />
          <view
            v-if="!taskDetail.cargoPictureList?.length"
            class="picture-blank"
            >暂无图片</view
          >
        </view>
      </view>

      <view class="delivery-info panel">
        <view class="panel-title">交货信息</view>
        <view class="label">交货凭证</view>
        <view class="pictures">
          <image
            v-for="picture in taskDetail.certificatePictureList"
            :key="picture.url"
            class="picture"
            :src="picture.url"
            mode="aspectFill"
          />
          <view
            v-if="!taskDetail.certificatePictureList?.length"
            class="picture-blank"
            >暂无图片</view
          >
        </view>
        <view class="label">货品照片</view>
        <view class="pictures">
          <image
            v-for="picture in taskDetail.deliverPictureList"
            :key="picture.url"
            class="picture"
            :src="picture.url"
            mode="aspectFill"
          />
          <view
            v-if="!taskDetail.deliverPictureList?.length"
            class="picture-blank"
            >暂无图片</view
          >
        </view>
      </view>
    </scroll-view>

    <view v-if="taskDetail.status === 1" class="toolbar">
      <navigator
        :url="`/subpkg_task/delay/index?id=${taskDetail.id}&planTime=${taskDetail.planDepartureTime}`"
        hover-class="none"
        class="button secondary"
        >延迟提货</navigator
      >
      <navigator
        :url="`/subpkg_task/pickup/index?id=${taskDetail.id}`"
        hover-class="none"
        class="button primary"
        >提货</navigator
      >
    </view>
    <view v-if="taskDetail.status === 2" class="toolbar">
      <navigator
        :url="`/subpkg_task/except/index?id=${taskDetail.id}`"
        hover-class="none"
        class="button secondary"
        >异常上报</navigator
      >
      <navigator
        :url="`/subpkg_task/delivery/index?id=${taskDetail.id}`"
        hover-class="none"
        class="button primary"
        >交付</navigator
      >
    </view>
    <view v-if="taskDetail.status === 4" class="toolbar">
      <navigator
        :url="`/subpkg_task/record/index?id=${taskDetail.id}&startTime=${taskDetail.actualDepartureTime}`"
        hover-class="none"
        class="button primary block"
      >
        回车登记
      </navigator>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
