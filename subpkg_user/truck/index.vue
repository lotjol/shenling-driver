<script setup></script>

<template>
  <view class="page-container">
    <swiper class="truck-pictures" indicator-active-color="#fff" circular indicator-dots>
      <swiper-item>
        <image class="picture" mode="aspectFill" src="/static/uploads/truck_picture.jpg"></image>
      </swiper-item>
      <swiper-item>
        <image class="picture" mode="aspectFill" src="/static/uploads/truck_picture.jpg"></image>
      </swiper-item>
    </swiper>
    <view class="truck-meta">
      <uni-list :border="false">
        <uni-list-item :border="false" title="车辆编号" rightText="3092889699900293" />
        <uni-list-item :border="false" title="车辆号牌" rightText="京GA8765" />
        <uni-list-item :border="false" title="车型" rightText="京厢式货车" />
        <uni-list-item :border="false" title="所属机构" rightText="北京中转站" />
        <uni-list-item :border="false" title="载重" rightText="2吨" />
      </uni-list>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>