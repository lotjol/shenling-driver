<script setup>
  import { ref, computed } from 'vue'
  // 组件 ref
  const popup = ref(null)
  // 文件提示
  const exceptTime = computed(() => {
    return timePicker.value || '请选择'
  })
  // 异常日期
  const timePicker = ref('')

  // 打开地图
  function onLocationChoose() {
    uni.chooseLocation({})
  }

  // 点击类型弹层确认按钮
  function onPopupConfirm() {
    popup.value.close()
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
                <view class="picker-value">{{ exceptTime }}</view>
              </uni-datetime-picker>
            </template>
          </uni-list-item>

          <uni-list-item
            show-arrow
            clickable
            ellipsis="1"
            @click="onLocationChoose"
            title="上报位置"
            rightText="请选择"
          />
          <uni-list-item
            show-arrow
            clickable
            @click="onPopupOpen"
            title="异常类型"
            rightText="请选择"
          />
          <uni-list-item direction="column" title="异常描述">
            <template v-slot:footer>
              <view class="textarea-wrapper">
                <textarea
                  class="textarea"
                  placeholder="请输入异常描述"
                ></textarea>
                <view class="words-count">0/50</view>
              </view>
            </template>
          </uni-list-item>
          <uni-list-item
            :border="false"
            style="margin-top: -30rpx"
            direction="column"
            title="上传图片（最多6张）"
          >
            <template v-slot:footer>
              <uni-file-picker limit="6"></uni-file-picker>
            </template>
          </uni-list-item>
        </uni-list>
      </view>
    </scroll-view>
    <view class="fixbar">
      <button class="button disable">提交</button>
    </view>
    <!-- 异常类型弹层 -->
    <uni-popup ref="popup" :mask-click="false" type="bottom">
      <uni-list class="popup-action-sheet">
        <uni-list-item>
          <template v-slot:header>
            <view class="header">选择类型</view>
          </template>
        </uni-list-item>
        <uni-list-item title="发动机启动困难">
          <template v-slot:footer>
            <checkbox-group class="checkbox">
              <checkbox color="#EF4F3F" />
            </checkbox-group>
          </template>
        </uni-list-item>
        <uni-list-item title="不着车，漏油">
          <template v-slot:footer>
            <checkbox-group class="checkbox">
              <checkbox color="#EF4F3F" />
            </checkbox-group>
          </template>
        </uni-list-item>
        <uni-list-item title="照明失灵">
          <template v-slot:footer>
            <checkbox-group class="checkbox">
              <checkbox color="#EF4F3F" />
            </checkbox-group>
          </template>
        </uni-list-item>
        <uni-list-item title="排烟异常、温度异常">
          <template v-slot:footer>
            <checkbox-group class="checkbox">
              <checkbox color="#EF4F3F" />
            </checkbox-group>
          </template>
        </uni-list-item>
        <uni-list-item title="其他问题">
          <template v-slot:footer>
            <checkbox-group class="checkbox">
              <checkbox color="#EF4F3F" />
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
