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
	function changeLoginType() {
		tabIndex.value = Math.abs(tabIndex.value - 1)
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
