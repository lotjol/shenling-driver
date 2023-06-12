<script setup></script>

<template>
  <view class="page-container">
    <uni-list :border="false">
      <uni-list-item title="原定时间 " showArrow rightText="2022-05-04 13:00:00" />
      <uni-list-item title="延迟时间" showArrow>
        <template v-slot:footer>
          <picker class="time-picker" mode="time">
            <text>不可超过2个小时</text>
          </picker>
        </template>
      </uni-list-item>
      <uni-list-item direction="column">
        <template v-slot:body>
          <view class="textarea-wrapper">
            <textarea
              class="textarea"
              placeholder-style="color: #818181"
              placeholder="请输入延迟提货原因"
            ></textarea>
            <text class="words-count">0/50</text>
          </view>
        </template>
      </uni-list-item>
      <uni-list-item :border="false">
        <template v-slot:body>
          <button disabled class="button">提交</button>
        </template>
      </uni-list-item>
    </uni-list>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
