<script setup>
  import { ref, onMounted } from 'vue'
  import messageApi from '@/apis/message'

  // 任务列表数据
  const announceList = ref([])
  // 下一页页码
  const nextPage = ref(1)
  // 每页包含数据条数
  const pageSize = ref(5)
  // 是否为空列表
  const isEmpty = ref(false)
  // 是否有更多数据
  const hasMore = ref(true)
  // 是否加载完成
  const isTriggered = ref(false)

  // 生命周期
  onMounted(() => {
    getAnnounceList()
  })

  // 下拉刷新
  async function onScrollViewRefresh() {
    isTriggered.value = true
    await getAnnounceList()
    isTriggered.value = false
  }

  // 上拉分页
  function onScrollToLower() {
    if (!hasMore.value) return
    // 获取下一页数据
    getAnnounceList(nextPage.value)
  }

  // 任务列表
  async function getAnnounceList(page = 1, pageSize = 10) {
    const { code, data } = await messageApi.list(200, page, pageSize)
    // 检测接口是否调用成功
    if (code !== 200) return uni.utils.toast('获取通知失败，稍后重试!')
    if (page === 1) announceList.value = []
    // 渲染数据
    announceList.value = [...announceList.value, ...(data.items || [])]
    // 更新下一页页码
    nextPage.value = ++data.page
    // 是否为空列表
    isEmpty.value = announceList.value.length === 0
    // 是否有更多数据
    hasMore.value = nextPage.value <= data.pages
  }
</script>
<template>
  <scroll-view
    @scrolltolower="onScrollToLower"
    @refresherrefresh="onScrollViewRefresh"
    :refresher-triggered="isTriggered"
    class="scroll-view"
    refresher-enabled
    scroll-y
  >
    <view class="scroll-view-wrapper">
      <view class="message-action">
        <text class="iconfont icon-clear"></text>
        全部已读
      </view>
      <uni-list :border="false">
        <uni-list-item
          v-for="announce in announceList"
          :key="announce.id"
          :to="`/subpkg_message/content/index?id=${announce.id}`"
          ellipsis="1"
          :title="announce.title"
          :right-text="announce.created"
        >
          <template v-slot:header>
            <text class="dot"></text>
          </template>
        </uni-list-item>
      </uni-list>
      <view v-if="isEmpty" class="message-blank">暂无消息</view>
    </view>
  </scroll-view>
</template>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
