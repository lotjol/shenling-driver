<script setup>
  import { ref, reactive, computed } from 'vue'

  // 表单项数据
  const user = reactive({
    account: '',
    password: '',
  })

  // 登录类型索引值
  const formIndex = ref(0)
  // 表单相关数据
  const formMetas = reactive([
    {
      active: true,
      title: '手机号登录',
      subTitle: '账号登录',
      fields: [
        {
          type: 'text',
          key: 'account',
          placeholder: '请输入账号',
        },
        {
          type: 'text',
          key: 'password',
          placeholder: '请输入密码',
          extraText: '获取验证码',
        },
      ],
      buttonText: '登录',
    },
    {
      active: false,
      title: '账号登录',
      subTitle: '手机号登陆',
      fields: [
        {
          type: 'number',
          key: 'mobile',
          placeholder: '请输入手机号',
        },
        {
          type: 'number',
          key: 'code',
          placeholder: '请输入验证码',
        },
      ],
      buttonText: '登录',
    },
  ])

  // 当前登录信息
  const formMeta = computed(() => {
    return formMetas[formIndex.value]
  })

  // 切换登录类型
  function changeLoginType() {
    formIndex.value = Math.abs(formIndex.value - 1)
  }
</script>

<template>
  <view class="user-login">
    <view class="login-type">
      <view class="title">{{ formMeta.title }}</view>
      <view class="type">
        <text @click="changeLoginType">{{ formMeta.subTitle }}</text>
        <text class="iconfont icon-caret"></text>
      </view>
    </view>

    <uni-forms :key="formIndex" class="login-form" :modelValue="user" ref="form">
      <uni-forms-item v-for="field in formMeta.fields" :key="field.key" name="name">
        <input
          v-model="user[field.key]"
          :type="field.type"
          :placeholder="field.placeholder"
          class="uni-input-input"
          placeholder-style="color: #818181"
        />
        <text v-if="field.key === 'code'" class="text-button">获取验证码</text>
      </uni-forms-item>
      <button class="submit-button">{{ formMeta.buttonText }}</button>
    </uni-forms>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
