<script setup>
  import { ref, reactive } from 'vue'

  import slNotify from './components/notify'
  import slAnnounce from './components/announce'

  // Tab 标签页索引
  const tabIndex = ref(0)
  const tabMetas = reactive([
    {
      title: '任务通知',
      rendered: true,
    },
    {
      title: '公告',
      rendered: false,
    },
  ])
  // 切换标签页
  function onTabChange(index) {
    tabMetas[index].rendered = true
    tabIndex.value = index
  }
</script>

<template>
  <view class="page-container">
    <view class="message-tabbar">
      <text
        v-for="(tabMeta, index) in tabMetas"
        :key="tabMeta.title"
        @click="onTabChange(index)"
        :class="{ active: tabIndex === index }"
        class="tab"
        >{{ tabMeta.title }}</text
      >
    </view>
    <view
      class="message-list"
      v-show="tabIndex === 0"
      v-if="tabMetas[0].rendered"
    >
      <sl-notify></sl-notify>
    </view>
    <view
      class="message-list"
      v-show="tabIndex === 1"
      v-if="tabMetas[1].rendered"
    >
      <sl-announce></sl-announce>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
