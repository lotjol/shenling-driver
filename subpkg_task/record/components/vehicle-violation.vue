<script setup>
  import { ref } from 'vue'
  import { useTaskStore } from '@/stores/task'
  import vehicleOptions from './vehicle-options'

  // 任务数据
  const taskStore = useTaskStore()

  // 是不显示详细的选项
  const show = ref(false)

  // 构造数据
  const initialData = ref([
    {
      title: '违章类型',
      key: 'breakRulesType',
      types: ['闯红灯', '无证驾驶', '超载', '酒后驾驶', '超速驾驶'],
    },
    {
      title: '罚款金额',
      key: 'penaltyAmount',
      types: ['0元', '100元', '200元', '300元', '500元', '1000元', '2000元'],
    },
    {
      title: '扣分',
      key: 'deductPoints',
      types: ['0分', '1分', '2分', '3分', '6分', '12分'],
    },
  ])

  function onRadioChange(ev) {
    // 展开详细的选项
    show.value = !!parseInt(ev.detail.value)
    // 传递数据到父组件
    taskStore.recordData.isBreakRules = show.value
  }
</script>

<template>
  <view class="vehicle-panel">
    <view class="vehicle-panel-header">
      <view class="label">车辆违章</view>
      <radio-group class="radio-group" @change="onRadioChange">
        <label class="label">
          <radio class="radio" value="1" color="#EF4F3F" />
          <text>是</text>
        </label>
        <label class="label">
          <radio class="radio" checked value="0" color="#EF4F3F" />
          <text>否</text>
        </label>
      </radio-group>
    </view>
    <view v-show="show" class="vehicle-panel-body">
      <uni-list>
        <uni-list-item
          v-for="item in initialData"
          direction="column"
          :border="false"
          :title="item.title"
        >
          <template v-slot:footer>
            <vehicle-options :data-key="item.key" :types="item.types" />
          </template>
        </uni-list-item>
      </uni-list>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  @import './styles/vehicle-panel.scss';
  @import './styles/vehicle-violation.scss';
</style>
