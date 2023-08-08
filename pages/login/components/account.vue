<script setup>
  import { ref, reactive } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import userApi from '@/apis/user'
  import { useUserStore } from '@/stores/user'
  const userStore = useUserStore()

  // 表单元素节点
  const accountForm = ref()

  // 表单数据
  const formData = reactive({
    account: 'ithema',
    password: '123456',
  })

  // 表单数据验证规则
  const accountRules = reactive({
    account: {
      rules: [
        { required: true, errorMessage: '请输入登录账号' },
        { pattern: '^[a-zA-Z0-9]{6,8}$', errorMessage: '登录账号格式不正确' },
      ],
    },
    password: {
      rules: [
        { required: true, errorMessage: '请输入登录密码' },
        { pattern: '^\\d{6}$', errorMessage: '登录密码格式不正确' },
      ],
    },
  })

  // 回跳地址
  const redirectURL = ref('')
  // 跳转地址方式
  const routeType = ref('')

  // 获取地址中的参数
  onLoad((query) => {
    redirectURL.value = query.redirectURL
    routeType.value = query.routeType
  })

  // 监听表单提交
  async function onFormSubmit() {
    try {
      // 验证表单数据且通过
      const formData = await accountForm.value.validate()
      // 调用登录接口
      const { code, data } = await userApi.login(formData)
      // 检测接口是否调用成功
      if (code !== 200) return uni.utils.toast('登录失败，请重试！')
      // 持久化存储用户登录状态
      userStore.token = data
      // 地址重定向或switchTab
      if (routeType.value === 'switchTab') {
        uni.switchTab({ url: redirectURL.value })
      } else {
        uni.redirectTo({ url: redirectURL.value })
      }
    } catch (err) {
      // 验证失败
      console.log(err)
    }
  }
</script>

<template>
  <uni-forms
    class="login-form"
    :model="formData"
    :rules="accountRules"
    ref="accountForm"
  >
    <uni-forms-item name="account">
      <input
        type="text"
        v-model="formData.account"
        placeholder="请输入账号"
        class="uni-input-input"
        placeholder-style="color: #818181"
      />
    </uni-forms-item>
    <uni-forms-item name="password">
      <input
        type="text"
        v-model="formData.password"
        placeholder="请输入密码"
        class="uni-input-input"
        placeholder-style="color: #818181"
      />
    </uni-forms-item>
    <button @click="onFormSubmit" class="submit-button">登录</button>
  </uni-forms>
</template>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
