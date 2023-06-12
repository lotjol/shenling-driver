<script setup>
  import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'

  // 弹层实例
  const popup = ref(null)

  // 获取地址参数
  onLoad((params) => {
    console.log(params.id)
  })

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
    <scroll-view scroll-y class="task-detail">
      <uni-collapse>
        <uni-collapse-item open :show-animation="false" :border="false" title-border="none" title="基本信息">
          <view class="content">
            <view class="timeline">
              <view class="line">北京市昌平区回龙观街道西三旗桥东金燕龙写字楼8877号</view>
              <view class="line">河南省郑州市路北区北清路99号</view>
            </view>
            <view class="info-list">
              <view class="info-list-item">
                <text class="label">任务编号</text>
                <text class="value">1557211886558850</text>
              </view>
              <view class="info-list-item">
                <text class="label">联系人</text>
                <text class="value">张三</text>
              </view>
              <view class="info-list-item">
                <text class="label">联系电话</text>
                <text class="value">13212345678</text>
              </view>
              <view class="info-list-item">
                <text class="label">提货时间</text>
                <text class="value">2022.05.04 13:00</text>
              </view>
              <view class="info-list-item">
                <text class="label">预计送达时间</text>
                <text class="value">2022.05.05 10:00</text>
              </view>
            </view>
          </view>
        </uni-collapse-item>
        <uni-collapse-item :border="false" :show-animation="false" title-border="none" title="车辆司机信息">
          <view class="content driver-info">
            <view class="info-list">
              <view class="info-list-item">
                <text class="label">任务编号</text>
                <text class="value">1557211886558850</text>
              </view>
              <view class="info-list-item">
                <text class="label">联系人</text>
                <text class="value">张三</text>
              </view>
            </view>
          </view>
        </uni-collapse-item>
        <uni-collapse-item :border="false" :show-animation="false" title-border="none" title="运输路线">
          <view class="content transit-info">
            <view class="transit-line">
              <view class="start">
                <text class="lead">北京市</text>
                <text class="normal">北京市</text>
              </view>
              <view class="end">
                <text class="lead">河南省</text>
                <text class="normal">郑州市</text>
              </view>
            </view>
            <navigator hover-class="none" url="/subpkg_task/guide/index" class="guide">
              <text class="iconfont icon-guide"></text>
              <text>开始导航</text>
            </navigator>
          </view>
        </uni-collapse-item>
        <uni-collapse-item :border="false" :show-animation="false" title-border="none" title="异常信息">
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
        <uni-collapse-item
          :border1="false"
          :border="false"
          :show-animation="false"
          title-border="none"
          title="提货信息"
        >
          <view class="content receipt-info">
            <uni-file-picker limit="3" title="请拍照上传回单凭证"></uni-file-picker>
            <uni-file-picker limit="3" title="请拍照上传货品照片"></uni-file-picker>
          </view>
        </uni-collapse-item>
      </uni-collapse>
    </scroll-view>
    <view class="toolbar">
      <template v-if="true">
        <button class="button delay">延迟提货</button>
        <button class="button primary">提货</button>
      </template>
      <template v-if="false">
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
