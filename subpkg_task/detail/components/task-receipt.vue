<script setup>
  import { reactive } from 'vue'

  // 图片预览
  const imageValue = reactive([{ name: 'file.txt', extname: 'txt' }])
</script>

<template>
  <view class="content">
    <uni-file-picker v-model="imageValue" limit="3" title="请拍照上传回单凭证"></uni-file-picker>
    <uni-file-picker v-model="imageValue" limit="3" title="请拍照上传货品照片"></uni-file-picker>
  </view>
</template>

<style lang="scss" scoped>
  @import 'styles/task-receipt.scss';
</style>
