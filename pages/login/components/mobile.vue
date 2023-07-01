<template>
	<uni-forms class="login-form" ref="form">
		<uni-forms-item name="name">
			<input
				type="text"
				placeholder="请输入手机号"
				class="uni-input-input"
				placeholder-style="color: #818181"
			/>
		</uni-forms-item>
		<uni-forms-item name="name">
			<input
				type="text"
				placeholder="请输入验证码"
				class="uni-input-input"
				placeholder-style="color: #818181"
			/>
			<text class="text-button">获取验证码</text>
		</uni-forms-item>
		<button class="submit-button">登录</button>
	</uni-forms>
</template>

<script></script>

<style lang="scss" scoped>
	@import './styles.scss';
</style>
