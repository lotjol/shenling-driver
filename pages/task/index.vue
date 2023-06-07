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
  // const enableFilter = computed(())

  // 切换 Tab 标签页
  function onTabChange(index) {
    tabIndex.value = index
  }

  // function onPickerChange(ev, key) {
  //   tabsData.value[2][key] = ev.detail.value
  // }

  // 任务列表接口
  async function getTaskList() {
    const { code, data } = await taskApi.list(currentTabData.value)
    if (code !== 200) return uni.$utils.toast()
    tabsData.value[tabIndex.value].items = data.items
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
      <view class="task-card">
        <view class="header">
          <text class="no">任务编号: dddd</text>
          <text class="status">已延迟</text>
        </view>
        <view class="body">
          <view class="timeline">
            <view class="line">ddddd</view>
            <view class="line">dddddd</view>
          </view>
        </view>
        <view class="footer">
          <view class="label">提货时间</view>
          <view class="time">2022.05.04 13:00</view>
          <button disabled class="action">提货</button>
        </view>
      </view>
      <view v-if="false" class="task-blank">无待提货物</view>
    </scroll-view>
    <scroll-view
      refresher-background="#f4f4f4"
      scroll-y
      refresher-enabled
      class="task-list"
      v-show="tabIndex === 1"
    >
      <view class="task-card">
        <view class="header"><text class="no">任务编号: XAHH1234567</text></view>
        <view class="body">
          <view class="timeline">
            <view class="line">dddd</view>
            <view class="line">ddddd</view>
          </view>
        </view>
        <view class="footer">
          <view class="label">提货时间</view>
          <view class="time">2022.05.04 13:00</view>
          <button class="action">交付</button>
          <button v-if="false" class="action">回车登记</button>
        </view>
      </view>
      <view v-if="false" class="task-blank">无在途货物</view>
    </scroll-view>
    <view v-show="tabIndex === 2" class="task-search">
      <view class="search-bar">
        <text class="iconfont icon-search"></text>
        <input class="input" type="text" placeholder="输入任务编号" />
      </view>
      <view class="filter-bar">
        <picker class="picker" mode="date">2023.05.20</picker>
        <text class="text">至</text>
        <picker class="picker" mode="date">结束时间</picker>
        <button disabled class="button">筛选</button>
      </view>
    </view>
    <scroll-view
      refresher-background="#f4f4f4"
      scroll-y
      refresher-enabled
      class="task-list"
      v-show="tabIndex === 2"
    >
      <view v-if="false" class="task-card">
        <view class="header"><text class="no">任务编号: XAHH1234567</text></view>
        <view class="body">
          <view class="timeline">
            <view class="line">北京市昌平区回龙观街道西三旗桥东金燕龙写字楼8877号</view>
            <view class="line">河南省郑州市路北区北清路99号</view>
          </view>
        </view>
        <view class="footer flex">
          <view class="label">提货时间</view>
          <view class="time">2022.05.04 13:00</view>
        </view>
      </view>
      <view class="task-blank">无完成货物</view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
