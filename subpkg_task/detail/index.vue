<script setup>
  import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import taskApi from '@/apis/task'

  // 任务的 ID
  const id = ref('')
  // 任务详情
  const taskDetail = ref({})

  // 获取地址参数
  onLoad((params) => {
    // 获取任务 ID 并获取详情数据
    getTaskDetail((id.value = params.id))
  })

  // 获取任务详情数据
  async function getTaskDetail(id) {
    if (!id) return
    const { code, data } = await taskApi.detail(id)
    if (code !== 200) return uni.utils.toast('获取数据失败, 稍后重试 !')
    // 渲染数据
    taskDetail.value = data
  }
</script>

<template>
  <view class="page-container">
    <view class="search-bar">
      <!-- #ifdef H5 -->
      <text class="iconfont icon-search"></text>
      <!-- #endif -->

      <!-- #ifdef APP-PLUS | MP -->
      <text class="iconfont icon-scan"></text>
      <!-- #endif -->
      <input class="input" type="text" placeholder="输入运单号" />
    </view>
    <scroll-view scroll-y class="task-detail">
      <view class="scroll-view-wrapper">
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

            <!-- 待提货展示数据 -->
            <template v-if="taskDetail.status >= 1">
              <view class="info-list-item">
                <text class="label">提供联系人</text>
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
            </template>

            <!-- 在途展示数据 -->
            <template v-if="taskDetail.status >= 2">
              <view class="hr"></view>
              <view class="info-list-item">
                <text class="label">交付联系人</text>
                <text class="value">{{ taskDetail.finishHandoverName }}</text>
              </view>
              <view class="info-list-item">
                <text class="label">联系电话</text>
                <text class="value">{{ taskDetail.finishHandoverPhone }}</text>
              </view>
              <view class="info-list-item">
                <text class="label">预计送达时间</text>
                <text class="value">{{ taskDetail.planArrivalTime }}</text>
              </view>
              <view class="info-list-item">
                <text class="label">实际送达时间</text>
                <text class="value">{{ taskDetail.actualArrivalTime }}</text>
              </view>
            </template>
          </view>
        </view>

        <view v-if="taskDetail.exceptionList?.length" class="except-info panel">
          <view class="panel-title">异常信息</view>
          <view
            v-for="exception in taskDetail.exceptionList"
            :key="exception.exceptionType"
            class="info-list"
          >
            <view class="info-list-item">
              <text class="label">上报时间</text>
              <text class="value">{{ exception.exceptionTime }}</text>
            </view>
            <view class="info-list-item">
              <text class="label">异常类型</text>
              <text class="value">{{ exception.exceptionType }}</text>
            </view>
            <view class="info-list-item">
              <text class="label">处理结果</text>
              <text class="value">{{ exception.handleResult }}</text>
            </view>
          </view>
        </view>

        <view v-if="taskDetail.status >= 2" class="panel pickup-info">
          <view class="panel-title">提货信息</view>
          <view class="label">提货凭证</view>
          <view class="pictures">
            <image
              v-for="receipt in taskDetail.cargoPictureList"
              :key="receipt.url"
              class="picture"
              :src="receipt.url"
            />
            <view v-if="false" class="picture-blank">暂无图片</view>
          </view>
          <view class="label">货品照片</view>
          <view class="pictures">
            <image
              v-for="goods in taskDetail.cargoPickUpPictureList"
              :key="goods.url"
              class="picture"
              :src="goods.url"
            />
            <view v-if="false" class="picture-blank">暂无图片</view>
          </view>
        </view>

        <view
          v-if="taskDetail.status === 4 || taskDetail.status === 6"
          class="delivery-info panel"
        >
          <view class="panel-title">交货信息</view>
          <view class="label">交货凭证</view>
          <view class="pictures">
            <image
              v-for="certificate in taskDetail.certificatePictureList"
              :key="certificate.url"
              class="picture"
              :src="certificate.url"
            ></image>
            <view v-if="false" class="picture-blank">暂无图片</view>
          </view>
          <view class="label">货品照片</view>
          <view class="pictures">
            <image
              v-for="deliver in taskDetail.deliverPictureList"
              :key="deliver.url"
              class="picture"
              :src="deliver.url"
            ></image>
            <view v-if="false" class="picture-blank">暂无图片</view>
          </view>
        </view>
      </view>
    </scroll-view>

    <view class="toolbar" v-if="taskDetail.status === 1">
      <navigator
        :url="`/subpkg_task/delay/index?id=${taskDetail.id}&planDepartureTime=${taskDetail.planDepartureTime}`"
        hover-class="none"
        class="button secondary"
      >
        延迟提货
      </navigator>
      <navigator
        :url="`/subpkg_task/pickup/index?id=${taskDetail.id}`"
        hover-class="none"
        class="button primary"
      >
        提货
      </navigator>
    </view>

    <view class="toolbar" v-if="taskDetail.status === 2">
      <navigator
        :url="`/subpkg_task/except/index?transportTaskId=${taskDetail.transportTaskId}`"
        hover-class="none"
        class="button secondary"
      >
        异常上报
      </navigator>
      <navigator
        :url="`/subpkg_task/delivery/index?id=${taskDetail.id}`"
        hover-class="none"
        class="button primary"
      >
        支付
      </navigator>
    </view>
    <view class="toolbar" v-if="taskDetail.status === 4">
      <navigator
        :url="`/subpkg_task/record/index?transportTaskId=${taskDetail.transportTaskId}&actualDepartureTime=${taskDetail.actualDepartureTime}`"
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
