<script setup>
  import { ref, computed } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import taskApi from '@/apis/task'

  import dayjs from 'dayjs'
  import isBetween from 'dayjs/plugin/isBetween'
  dayjs.extend(isBetween)

  const planTime = ref('')
  const delayTime = ref('')
  const delayReason = ref('')
  
  // 统计输入的字数
  const wordsCount = computed(() => delayReason.value.length)
  // 按钮状态
  const buttonEnable = computed(() => {
    return delayTime.value.length && delayReason.value.length
  })

  // 验证延迟时间
  const delayTimeValid = computed(() => {
    // 延迟时间不超过2小时
    const maxTime = dayjs(planTime.value).add(2, 'hour')
    return dayjs(delayTime.value).isBetween(planTime.value, maxTime)
  })

  // 验证延迟原因
  const delayReasonValid = computed(() => {
    return wordsCount.value <= 50 && wordsCount.value > 0
  })

  // 任务ID
  let id = ''

  // 选择日期
  function onPickerChange(ev) {
    delayTime.value = dayjs(planTime.value).format('YYYY-MM-DD ') + ev.detail.value + ':00'
  }

  // 延迟交货接口
  async function onSubmitForm() {
    // 验证接口参数是否合法
    if (!delayTimeValid.value) return uni.$utils.toast('时间不能超过2小时!')
    if (!delayReasonValid.value) return uni.$utils.toast('字数不超过50字!')
    // 调用接口
    const { code } = await taskApi.delay({ id, delayReason: delayReason.value, delayTime: delayTime.value })
    if (code !== 200) return uni.$utils.toast()
  }

  // 获取地址参数
  onLoad((params) => {
    // 原定提货时间
    planTime.value = params.planTime
    // 任务的ID
    id = params.id
  })
</script>

<template>
  <view class="page-container">
    <uni-list :border="false">
      <uni-list-item title="原定时间 " show-arrow :right-text="planTime" />
      <uni-list-item title="延迟时间" show-arrow>
        <template v-slot:footer>
          <picker @change="onPickerChange" class="time-picker" mode="time">
            <text v-if="!delayTime">不可超过2个小时</text>
            <text :class="{ error: !delayTimeValid }">{{ delayTime }}</text>
          </picker>
        </template>
      </uni-list-item>
      <uni-list-item direction="column">
        <template v-slot:body>
          <view class="textarea-wrapper">
            <textarea
              class="textarea"
              placeholder-style="color: #818181"
              placeholder="请输入延迟提货原因"
              v-model="delayReason"
            ></textarea>
            <text :class="{ error: delayReason.length > 50 }" class="words-count">{{ wordsCount }}/50</text>
          </view>
        </template>
      </uni-list-item>
      <uni-list-item :border="false">
        <template v-slot:body>
          <button @click="onSubmitForm" :disabled="!buttonEnable" class="button">提交</button>
        </template>
      </uni-list-item>
    </uni-list>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
