<script setup>
  import { reactive } from 'vue'

  // 表单项数据
  const user = reactive({
    mobile: '18612345678',
    code: '2468',
    password: '123456',
  })
</script>

<template>
  <view class="modify-password">
    <uni-forms ref="form" auto-complete="off">
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
      <uni-forms-item name="passsword">
        <input
          type="number"
          password
          v-model="user.password"
          placeholder-style="color: #818181"
          placeholder="请输入新密码"
        />
      </uni-forms-item>
      <button class="submit-button">确定修改</button>
    </uni-forms>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
