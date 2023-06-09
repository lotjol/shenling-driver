<script setup>
  import { ref, computed } from 'vue'
  import { onShow } from '@dcloudio/uni-app'
  import messageApi from '@/apis/message'

  // Tab 标签页索引
  const tabIndex = ref(0)
  // 标签页相关数据
  const tabsData = ref([
    { text: '任务通知', contentType: 201, page: 1, pageSize: 10, items: [], done: false },
    { text: '公告', contentType: 200, page: 1, pageSize: 10, items: [], done: false },
  ])
  // 当前标签页的数据
  const currentTabData = computed(() => tabsData.value[tabIndex.value])

  // 获取消息列表
  onShow(getMessageList)

  // 切换标签页
  function onTabChange(index) {
    tabIndex.value = index
    !currentTabData.done && getMessageList()
    currentTabData.done = true
  }

  // 消息列表
  async function getMessageList() {
    const { contentType, page, pageSize } = currentTabData.value
    const { code, data } = await messageApi.list({ contentType, page, pageSize })
    if (code !== 200) return uni.$utils.toast()
    /**************/
    data.items.forEach((item) => {
      item.content = item.content.replace('\n', '')
    })
    /**************/
    currentTabData.value.items = data.items
  }

  // 全部已读
  async function readAll(contentType) {
    const { code } = await messageApi.readall(contentType)
    if (code !== 200) return uni.$utils.toast()
    currentTabData.value.items.forEach((item) => (item.isRead = 1))
  }
</script>

<template>
  <view class="page-container">
    <view class="message-tabbar">
      <text
        v-for="(tab, index) in tabsData"
        @click="onTabChange(index)"
        :class="{ active: tabIndex === index }"
        class="tab"
        >{{ tab.text }}</text
      >
    </view>
    <scroll-view refresher-enabled scroll-y class="message-list" v-show="tabIndex === 0">
      <view @click="readAll(currentTabData.contentType)" class="message-action">
        <text class="iconfont icon-clear"></text>
        全部已读
      </view>
      <uni-card v-for="item in tabsData[0].items" :key="item.id" :border="false" :is-shadow="false">
        <view class="brief">{{ item.content }}</view>
        <view class="extra">
          <text class="time">{{ item.created }}</text>
          <navigator hover-class="none" class="link" :url="`/subpkg_message/content/index?id=${item.id}`">
            查看详情
          </navigator>
        </view>
        <template v-slot:title>
          <view :class="{ unread: !item.isRead }" class="title">您有新的运输任务</view>
        </template>
      </uni-card>
      <view v-if="false" class="message-blank">暂无消息</view>
    </scroll-view>
    <scroll-view refresher-enabled scroll-y class="message-list" v-show="tabIndex === 1">
      <view @click="readAll(currentTabData.contentType)" class="message-action">
        <text class="iconfont icon-clear"></text>
        全部已读
      </view>
      <uni-list :border="false">
        <uni-list-item
          v-for="item in tabsData[1].items"
          :key="item.id"
          :to="`/subpkg_message/content/index?id=${item.id}`"
          ellipsis="1"
          :title="item.content"
          :right-text="item.created"
        >
          <template v-slot:header>
            <text v-if="!item.isRead" class="dot"></text>
          </template>
        </uni-list-item>
      </uni-list>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
