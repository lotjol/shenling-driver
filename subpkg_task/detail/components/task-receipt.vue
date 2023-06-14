<script setup>
  import { ref } from 'vue'

  // 回单凭证
  const receiptProof = ref([])
  // 货物照片
  const goodsPicture = ref([])
</script>

<template>
  <view class="content">
    <uni-file-picker v-model="receiptProof" limit="3" title="请拍照上传回单凭证"></uni-file-picker>
    <uni-file-picker v-model="goodsPicture" limit="3" title="请拍照上传货品照片"></uni-file-picker>
  </view>
</template>

<style lang="scss" scoped>
  @import 'styles/task-receipt.scss';
</style>
