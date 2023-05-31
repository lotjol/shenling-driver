<script setup>
  import { reactive } from 'vue'
  import slVehiclePanel from './vehicle-panel'
  import slVehicleOptions from './vehicle-options'

  // 违章类型
  const types = reactive(['闯红灯', '无证驾驶', '超载', '酒后驾驶', '超速驾驶'])
  // 罚款金额
  const amounts = reactive(['0元', '100元', '200元', '300元', '500元', '1000元', '2000元'])
  // 罚扣分数
  const scores = reactive(['0分', '1分', '2分', '3分', '6分', '12分'])
</script>

<template>
  <sl-vehicle-panel title="车辆违章">
    <uni-list>
      <uni-list-item direction="column" :border="false" title="违章类型">
        <template v-slot:footer>
          <sl-vehicle-options :options="types"></sl-vehicle-options>
        </template>
      </uni-list-item>
      <uni-list-item direction="column" :border="false" title="罚款金额">
        <template v-slot:footer>
          <sl-vehicle-options :options="amounts"></sl-vehicle-options>
        </template>
      </uni-list-item>
      <uni-list-item direction="column" :border="false" title="扣分">
        <template v-slot:footer>
          <sl-vehicle-options :options="scores"></sl-vehicle-options>
        </template>
      </uni-list-item>
    </uni-list>
  </sl-vehicle-panel>
</template>

<style lang="scss" scoped></style>
