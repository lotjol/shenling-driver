<script setup>
  import { ref } from 'vue'
  const richtext = `
          <p style="margin: 10px 0">据交通厅发布信息称：从2012年5.1国际劳动节开始，各类大型客车、中型客车、大型货车(A1,A2,B1,B2)等驾驶证人或校车工作人员的驾驶证年审由原来的两年一审，改为一年一审。有不少市民得知消息后纷纷致电或前往车管所咨询具体驾驶证年审的办理流程。</p>
          <p style="margin: 10px 0">交通部门提醒，以上提到的相关驾驶人应该核查自己的驾驶证，如果符合驾驶证年审要求的要及时办理驾驶证年审手续，以免出现不必要的损失造成驾驶证被注销了。</p>
          <p style="margin: 10px 0">宝安车管家小编咨询了市车管所工作人员，车管所工作人员告诉我们，以上驾驶证年审的日期为初次领证日期。即2012年5月1日后，新考领的以上驾驶证，一律可以顺延迟一年时间，必须进行驾驶证年审。对于2012年5月1日前的驾驶证年审，A1,A2,B1,B2驾驶证已经年审过的可以下次年审日期顺推迟一年，原来规定的2年一审有效期作废。</p>
        `
</script>
<template>
  <view class="page-container">
    <view class="title">系统公告</view>
    <view class="time">05-06 06:16</view>
    <rich-text class="content" :nodes="richtext"></rich-text>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
