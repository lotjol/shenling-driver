<script setup>
  import { ref, computed } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import taskApi from '@/apis/task'

  onLoad(getTaskList)

  // 标签页索引
  const tabIndex = ref(0)

  // 定义标签页相关的数据
  const tabsData = ref([
    {
      text: '待提货',
      status: 1,
      startTime: '',
      endTime: '',
      transportTaskId: '',
      page: 1,
      pageSize: 10,
      items: [],
      empty: false,
      done: false,
    },
    {
      text: '在途',
      status: 2,
      startTime: '',
      endTime: '',
      transportTaskId: '',
      page: 1,
      pageSize: 10,
      items: [],
      empty: false,
      done: false,
    },
    {
      text: '已完成',
      status: 6,
      startTime: '',
      endTime: '',
      transportTaskId: '',
      page: 1,
      pageSize: 10,
      items: [],
      empty: false,
      done: false,
    },
  ])

  // 当前选中标签页的数据
  const currentTabData = computed(() => {
    const temp = tabsData.value[tabIndex.value]
    const obj = {}
    for (let key in temp) {
      // 过滤多余的数据
      if (['text', 'items', 'done'].includes(key)) continue
      if (temp[key]) obj[key] = temp[key]
    }
    return obj
  })

  // 是否禁止筛选
  const enableFilter = computed(() => {
    const { transportTaskId, startTime, endTime } = currentTabData.value
    return transportTaskId || startTime || endTime
  })

  // 切换 Tab 标签页
  function onTabChange(index) {
    tabIndex.value = index
    getTaskList()
  }

  function onPickerChange(ev, key) {
    tabsData.value[2][key] = ev.detail.value
  }

  // 任务列表接口
  async function getTaskList() {
    const { code, data } = await taskApi.list(currentTabData.value)
    if (code !== 200) return uni.$utils.toast()
    const renderData = tabsData.value[tabIndex.value]
    renderData.items = data.items || []
    console.log(renderData.items.length === 0)
    renderData.empty = renderData.items.length === 0
  }
</script>

<template>
  <view class="page-container">
    <view class="task-tabbar">
      <text
        v-for="(tab, index) in tabsData"
        @click="onTabChange(index)"
        :class="{ active: tabIndex === index }"
        class="tab"
        >{{ tab.text }}</text
      >
    </view>
    <scroll-view
      refresher-background="#f4f4f4"
      scroll-y
      refresher-enabled
      class="task-list"
      v-show="tabIndex === 0"
    >
      <view v-for="item in tabsData[0].items" :key="item.id" class="task-card">
        <navigator :url="`/subpkg_task/detail/index?id=${item.id}`">
          <view class="header">
            <text class="no">任务编号: {{ item.transportTaskId }}</text>
            <text v-if="item.actualArrivalTime > item.planArrivalTime" class="status">已延迟</text>
          </view>
          <view class="body">
            <view class="timeline">
              <view class="line">{{ item.startAddress }}</view>
              <view class="line">{{ item.endAddress }}</view>
            </view>
          </view>
        </navigator>
        <view class="footer">
          <view class="label">提货时间</view>
          <view class="time">{{ item.actualDepartureTime }}</view>
          <button :disabled="!item.enablePickUp" class="action">提货</button>
        </view>
      </view>
      <view v-if="tabsData[0].empty" class="task-blank">无待提货物</view>
    </scroll-view>
    <scroll-view
      refresher-background="#f4f4f4"
      scroll-y
      refresher-enabled
      class="task-list"
      v-show="tabIndex === 1"
    >
      <view v-for="item in tabsData[1].items" :key="item.id" class="task-card">
        <navigator :url="`/subpkg_task/detail/index?id=${item.id}`">
          <view class="header">
            <text class="no">任务编号: {{ item.transportTaskId }}</text>
          </view>
          <view class="body">
            <view class="timeline">
              <view class="line">{{ item.startAddress }}</view>
              <view class="line">{{ item.endAddress }}</view>
            </view>
          </view>
        </navigator>
        <view class="footer">
          <view class="label">提货时间</view>
          <view class="time">{{ item.actualDepartureTime }}</view>
          <button class="action">交付</button>
          <button v-if="false" class="action">回车登记</button>
        </view>
      </view>
      <view v-if="tabsData[1].empty" class="task-blank">无在途货物</view>
    </scroll-view>
    <view v-show="tabIndex === 2" class="task-search">
      <view class="search-bar">
        <text class="iconfont icon-search"></text>
        <input v-model="tabsData[2].transportTaskId" class="input" type="text" placeholder="输入任务编号" />
      </view>
      <view class="filter-bar">
        <picker @change="onPickerChange($event, 'startTime')" class="picker" mode="date">{{
          tabsData[2].startTime || '开始时间'
        }}</picker>
        <text class="text">至</text>
        <picker @change="onPickerChange($event, 'endTime')" class="picker" mode="date">{{
          tabsData[2].endTime || '结束时间'
        }}</picker>
        <button :disabled="!enableFilter" class="button">筛选</button>
      </view>
    </view>
    <scroll-view
      refresher-background="#f4f4f4"
      scroll-y
      refresher-enabled
      class="task-list"
      v-show="tabIndex === 2"
    >
      <view v-for="item in tabsData[2].items" :key="item.id" class="task-card">
        <navigator :url="`/subpkg_task/detail/index?id=${item.id}`">
          <view class="header">
            <text class="no">任务编号: {{ item.transportTaskId }}</text>
          </view>
          <view class="body">
            <view class="timeline">
              <view class="line">{{ item.startAddress }}</view>
              <view class="line">{{ item.endAddress }}</view>
            </view>
          </view>
        </navigator>
        <view class="footer flex">
          <view class="label">提货时间</view>
          <view class="time">{{ item.actualDepartureTime }}</view>
        </view>
      </view>
      <view v-if="tabsData[2].empty" class="task-blank">无完成货物</view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
