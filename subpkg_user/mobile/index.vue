<script setup>
  import { reactive } from 'vue'

  // 表单项数据
  const user = reactive({
    mobile: '',
    code: '',
  })
</script>

<template>
  <view class="bind-mobile">
    <uni-forms ref="form" :modelValue="user">
      <uni-forms-item name="mobile">
        <input
          type="number"
          v-model="user.mobile"
          placeholder-style="color: #818181"
          placeholder="请输入手机号"
        />
      </uni-forms-item>
      <uni-forms-item name="code">
        <input
          type="number"
          v-model="user.code"
          placeholder-style="color: #818181"
          placeholder="请输入验证码"
        />
        <text class="text-button">获取验证码</text>
      </uni-forms-item>
      <button class="submit-button">下一步</button>
    </uni-forms>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
