<script setup>
  import { ref, reactive, computed } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import { useUserStore } from '@/stores/user'
  import userApi from '@/apis/user.js'

  // 地址参数
  const redirectURL = ref('')
  const routeType = ref('')
  // 用户状态
  const userStore = useUserStore()
  // 表单项数据
  const user = ref({
    account: '',
    password: '',
    realName: '',
    idCard: '',
  })
  // 登录类型索引值
  const formIndex = ref(0)
  // 表单相关数据
  const formMetas = reactive([
    {
      active: true,
      title: '手机号登录',
      subTitle: '实人认证',
      type: 'mobile',
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
      title: '实人认证',
      subTitle: '手机号登陆',
      type: 'face',
      fields: [
        {
          type: 'text',
          key: 'realName',
          placeholder: '请输入真实姓名',
        },
        {
          type: 'number',
          key: 'idCard',
          placeholder: '请输入身份证号',
        },
      ],
      buttonText: '验证',
    },
  ])
  // 当前登录信息
  const formMeta = computed(() => {
    return formMetas[formIndex.value]
  })
  // 按钮的禁用状态
  const disabled = computed(() => {
    return (
      (user.value.account && user.value.password) ||
      (user.value.realName && user.value.idCard)
    )
  })

  // 切换登录类型
  function changeLoginType() {
    user.value = {}
    formIndex.value = Math.abs(formIndex.value - 1)
  }

  // 获取地址参数
  onLoad((query) => {
    redirectURL.value = query.redirectURL
    routeType.value = query.routeType
  })

  // 提交登录表单
  async function onSubmit(type) {
    if (type === 'face') {
      // 获取设备信息
      const metaInfo = uni.getFacialRecognitionMetaInfo()
      // 调用云函数
      uniCloud.callFunction({
        name: 'uni-face-verify',
        data: {
          realName: user.value.realName,
          idCard: user.value.idCard,
          metaInfo,
        },
        success({ result }) {
          uni.startFacialRecognitionVerify({
            certifyId: result.certifyId,
            progressBarColor: '#CC0000', //刷脸圈的颜色
            screenOrientation: 'port', //认证界面UI朝向
            success: (e) => {
              console.log(JSON.stringify(e))
            },
            fail: (e) => {
              console.log(JSON.stringify(e))
            },
            complete: (e) => {
              console.log(JSON.stringify(e))
            },
          })
        },
        fail(err) {
          console.log(err)
        },
      })

      return
    }

    // 调用登录接口
    const { code, data: token } = await userApi.login(
      user.value.account,
      user.value.password
    )
    if (code !== 200) return uni.$utils.toast()
    // 记录登录状态信息
    userStore.token = token
    // 跳回原来的页面
    uni[routeType.value]({ url: redirectURL.value })
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

    <uni-forms
      :key="formIndex"
      class="login-form"
      :modelValue="user"
      ref="form"
    >
      <uni-forms-item
        v-for="field in formMeta.fields"
        :key="field.key"
        name="name"
      >
        <input
          v-model="user[field.key]"
          :type="field.type"
          :placeholder="field.placeholder"
          class="uni-input-input"
          placeholder-style="color: #818181"
        />
        <!-- <text v-if="field.key === 'code'" class="text-button">获取验证码</text> -->
      </uni-forms-item>
      <button
        class="submit-button"
        :disabled="!disabled"
        @click="onSubmit(formMeta.type)"
      >
        {{ formMeta.buttonText }}
      </button>
    </uni-forms>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
