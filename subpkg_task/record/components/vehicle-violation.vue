<script setup>
  import { ref } from 'vue'
  import vehicleOptions from './vehicle-options'

  // 是不显示详细的选项
  const show = ref(false)
  // 构造数据
  const initialData = ref([
    {
      title: '违章类型',
      key: 'breakRulesType',
      types: [
        { id: 1, text: '闯红灯' },
        { id: 2, text: '无证驾驶' },
        { id: 3, text: '超载' },
        { id: 4, text: '酒后驾驶' },
        { id: 5, text: '超速驾驶' },
        { id: 6, text: '其它' },
      ],
    },
    {
      title: '罚款金额',
      key: 'penaltyAmount',
      types: [
        { id: '0', text: '0元' },
        { id: '100', text: '100元' },
        { id: '200', text: '200元' },
        { id: '300', text: '300元' },
        { id: '500', text: '500元' },
        { id: '1000', text: '1000元' },
        { id: '2000', text: '2000元' },
      ],
    },
    {
      title: '扣分',
      key: 'deductPoints',
      types: ['0分', '1分', '2分', '3分', '6分', '12分'],
      types: [
        { id: '0', text: '0分' },
        { id: '1', text: '1分' },
        { id: '2', text: '2分' },
        { id: '3', text: '3分' },
        { id: '6', text: '6分' },
        { id: '12', text: '12分' },
      ],
    },
  ])

  // 显示/隐藏选项
  function onRadioChange(ev) {
    // 展开详细的选项
    show.value = !!parseInt(ev.detail.value)
  }
</script>

<template>
  <view class="vehicle-panel">
    <view class="vehicle-panel-header">
      <view class="label">交通违章</view>
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
            <vehicle-options :types="item.types" />
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
