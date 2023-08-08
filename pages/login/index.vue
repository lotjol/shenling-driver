<script setup>
  import { ref, reactive, computed } from 'vue'
  import slAccount from './components/account'
  import slMobile from './components/mobile'

  // 登录类型索引值
  const tabIndex = ref(0)
  // 表单相关数据
  const tabMetas = reactive([
    {
      title: '账号登录',
      subTitle: '手机号登陆',
    },
    {
      title: '手机号登录',
      subTitle: '账号登录',
    },
  ])

  // 当前登录信息
  const tabMeta = computed(() => {
    return tabMetas[tabIndex.value]
  })

  // 切换登录类型
  async function changeLoginType() {
    // #ifdef APP-PLUS
    try {
      const { authResult } = await uni.login({
        provider: 'univerify',
        univerifyStyle: {
          fullScreen: true,
          icon: {
            path: 'static/logo.png', // 自定义显示在授权框中的logo，仅支持本地图片 默认显示App logo
          },
          authButton: {
            normalColor: '#ef4f3f', // 授权按钮正常状态背景颜色 默认值：#3479f5
            highlightColor: '#ef4f3f', // 授权按钮按下状态背景颜色 默认值：#2861c5（仅ios支持）
          },
          privacyTerms: {
            defaultCheckBoxState: false,
            uncheckedImage: 'static/images/uncheckedImage.png',
            checkedImage: 'static/images/checkedImage.png',
            termsColor: '#ef4f3f',
          },
        },
      })
      // 关闭授权登录
      uni.closeAuthView()

      // 调用云函数获取手机号码
      uniCloud.callFunction({
        name: 'uni-login',
        data: authResult,
        success({ message }) {
          uni.utils.toast(message)
        },
      })
    } catch (err) {}
    // #endif

    // #ifndef APP-PLUS
    uniCloud.callFunction({
      name: 'uni-login',
      data: { name: '小明', age: 18 },
    })
    tabIndex.value = Math.abs(tabIndex.value - 1)
    // #endif
  }
</script>

<template>
  <view class="user-login">
    <view class="login-type">
      <view class="title">{{ tabMeta.title }}</view>
      <view class="type">
        <text @click="changeLoginType">{{ tabMeta.subTitle }}</text>
        <text class="iconfont icon-caret"></text>
      </view>
    </view>
    <sl-account v-if="tabIndex === 0"></sl-account>
    <sl-mobile v-else></sl-mobile>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
