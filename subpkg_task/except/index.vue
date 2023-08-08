<script setup>
  import { ref, computed, reactive } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import taskApi from '@/apis/task'

  // 组件 ref
  const popup = ref(null)

  // 运输任务ID
  const transportTaskId = ref('')
  onLoad((query) => {
    transportTaskId.value = query.transportTaskId
  })

  // 获取异常时间
  const exceptionTime = computed(() => {
    return timePicker.value || '请选择'
  })
  // 扩展组件时间初始值
  const timePicker = ref('')

  // 上报位置数据
  const exceptionPlace = ref('')

  // 打开地图，选择位置
  async function onLocationChoose() {
    try {
      // 获取位置
      const { address } = await uni.chooseLocation({})
      exceptionPlace.value = address
    } catch (err) {}
  }

  // 定义 popup 组件展示的数据
  const exceptionTypes = reactive([
    { text: '发动机启动困难', checked: true },
    { text: '不着车，漏油', checked: false },
    { text: '照明失灵', checked: false },
    { text: '排烟异常、温度异常', checked: false },
    { text: '其他问题', checked: false },
  ])

  // 异常类型，多个选项间使用 | 拼接
  const exceptionType = ref('')

  // 监听用户的选择操作
  function onCheckboxChange(index) {
    // 切换选中状态
    exceptionTypes[index].checked = !exceptionTypes[index].checked
  }

  // 用户点击 popup 确定按钮
  function onPopupConfirm() {
    // 关闭 popup 弹层
    popup.value.close()

    // 获取用户选择的类型并回显到页面，即将 checked 属性为 true 单元取出
    exceptionType.value = exceptionTypes
      .filter((type) => {
        return type.checked // 过滤出选中的类型
      })
      .map((type) => {
        return type.text // 只保留 text 属性
      })
      .join('|') // 将选择的类型用 | 拼接并回显
  }

  // 异常描述
  const exceptionDescribe = ref('')
  // 异常描述字数统计
  const wordsCount = computed(() => {
    return exceptionDescribe.value.length
  })

  // 货品图片
  const goodsPictrues = ref([])
  // 数据二次处理，只保留 url 属性
  const exceptionImagesList = computed(() => {
    return goodsPictrues.value.map(({ url }) => {
      return { url }
    })
  })

  // 提交数据
  async function onFormSubmit() {
    // 待提交的数据
    const formData = {
      transportTaskId: transportTaskId.value,
      exceptionTime: exceptionTime.value,
      exceptionPlace: exceptionPlace.value,
      exceptionType: exceptionType.value,
      exceptionDescribe: exceptionDescribe.value,
      exceptionImagesList: exceptionImagesList.value,
    }
    const { code } = await taskApi.except(formData)
    // 检测接口是否调用成功
    if (code !== 200) return uni.utils.toast('上报数据失败！')
    // 跳转到任务列表页面
    uni.reLaunch({ url: '/pages/task/index' })
  }

  // 打开弹层
  function onPopupOpen() {
    popup.value.open()
  }
</script>

<template>
  <view class="page-container">
    <scroll-view class="scroll-view" scroll-y>
      <view style="margin: 30rpx" class="scroll-view-wrapper">
        <uni-list :border="false">
          <uni-list-item show-arrow title="异常时间">
            <template v-slot:footer>
              <uni-datetime-picker v-model="timePicker">
                <view class="picker-value">{{ exceptionTime }}</view>
              </uni-datetime-picker>
            </template>
          </uni-list-item>
          <uni-list-item
            show-arrow
            clickable
            ellipsis="1"
            @click="onLocationChoose"
            title="上报位置"
            :right-text="exceptionPlace || '请选择'"
          />
          <uni-list-item
            show-arrow
            clickable
            @click="onPopupOpen"
            title="异常类型"
            :right-text="exceptionType || '请选择'"
          />
          <uni-list-item direction="column" title="异常描述">
            <template v-slot:footer>
              <view class="textarea-wrapper">
                <textarea
                  v-model="exceptionDescribe"
                  class="textarea"
                  placeholder="请输入异常描述"
                ></textarea>
                <view class="words-count">{{ wordsCount }}/50</view>
              </view>
            </template>
          </uni-list-item>
          <uni-list-item
            style="margin-top: -30rpx"
            :border="false"
            direction="column"
            title="上传图片（最多3张）"
          >
            <template v-slot:footer>
              <uni-file-picker
                v-model="goodsPictrues"
                file-extname="jpg,webp,gif,png"
                limit="3"
              ></uni-file-picker>
            </template>
          </uni-list-item>
        </uni-list>
      </view>
    </scroll-view>
    <view class="fixbar">
      <button @click="onFormSubmit" class="button disable">提交</button>
    </view>

    <uni-popup ref="popup" :mask-click="false" type="bottom">
      <uni-list class="popup-action-sheet">
        <uni-list-item>
          <template v-slot:header>
            <view class="header"> 选择类型 </view>
          </template>
        </uni-list-item>
        <uni-list-item
          v-for="(exceptionType, index) in exceptionTypes"
          :key="exceptionType.text"
          :title="exceptionType.text"
        >
          <template v-slot:footer>
            <checkbox-group @change="onCheckboxChange(index)" class="checkbox">
              <checkbox :checked="exceptionType.checked" color="#EF4F3F" />
            </checkbox-group>
          </template>
        </uni-list-item>
        <uni-list-item>
          <template v-slot:body>
            <button @click="onPopupConfirm" class="button">确定</button>
          </template>
        </uni-list-item>
      </uni-list>
    </uni-popup>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
