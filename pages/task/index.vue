<script setup>
  import { ref, reactive } from 'vue'

  import slPickup from './components/pickup.vue'
  import slDelivery from './components/delivery.vue'
  import slComplete from './components/complete.vue'

  // 标签页索引
  const tabIndex = ref(0)
  const tabMetas = reactive([
    {
      title: '待提货',
      rendered: true,
    },
    {
      title: '在途',
      rendered: false,
    },
    {
      title: '已完成',
      rendered: false,
    },
  ])

  // 切换 Tab 标签页
  const onTabChange = (index) => {
    tabMetas[index].rendered = true
    tabIndex.value = index
  }
</script>

<template>
  <view class="page-container">
    <view class="task-tabbar">
      <text
        v-for="(tabMeta, index) in tabMetas"
        :key="tabMeta.title"
        @click="onTabChange(index)"
        :class="{ active: tabIndex === index }"
        class="tab"
      >
        {{ tabMeta.title }}
      </text>
    </view>
    <view v-if="tabMetas[0].rendered" v-show="tabIndex === 0" class="task-list">
      <sl-pickup></sl-pickup>
    </view>
    <view v-if="tabMetas[1].rendered" v-show="tabIndex === 1" class="task-list">
      <sl-delivery></sl-delivery>
    </view>
    <view v-if="tabMetas[2].rendered" v-show="tabIndex === 2" class="task-list">
      <sl-complete></sl-complete>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
