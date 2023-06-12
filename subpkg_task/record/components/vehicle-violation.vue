<script setup>
  import { ref } from 'vue'

  // 选中 tab 对应的行列索引
  const tabIndex = ref('')

  // 是不显示详细的选项
  const show = ref(false)

  // 构造数据
  const initialData = ref([
    {
      title: '违章类型',
      types: ['闯红灯', '无证驾驶', '超载', '酒后驾驶', '超速驾驶'],
    },
    {
      title: '罚款金额',
      types: ['0元', '100元', '200元', '300元', '500元', '1000元', '2000元'],
    },
    {
      title: '扣分',
      types: ['0分', '1分', '2分', '3分', '6分', '12分'],
    },
  ])

  function onRadioChange(ev) {
    // 展开详细的选项
    show.value = !!parseInt(ev.detail.value)
    // 清空已选中的选项
    tabIndex.value = -1
    // 传递数据到父组件
  }

  function onOptionSelect(option, row, col) {
    // 设置选中状态
    tabIndex.value = [row, col].join('|')
    // 传递选中的数据
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
          v-for="(item, row) in initialData"
          direction="column"
          :border="false"
          :title="item.title"
        >
          <template v-slot:footer>
            <view class="vehicle-options">
              <view
                @click="onOptionSelect(option, row, col)"
                :class="{ active: tabIndex === row + '|' + col }"
                class="option"
                v-for="(option, col) in item.types"
                :key="option"
              >
                {{ option }}
              </view>
            </view>
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
