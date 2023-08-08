import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', () => {
  // 这里定义的数据全部是接口所需要的数据
  const recordData = ref({
    id: '',
    startTime: '',
    endTime: '',
    /*** 违章 ***/
    isBreakRules: false,
    breakRulesType: null,
    penaltyAmount: null,
    deductPoints: null,
    /*** 违章 ***/

    /*** 故障 ***/
    isFault: false,
    faultType: null,
    faultDescription: '',
    faultImagesList: [],
    /*** 故障 ***/

    /*** 事故 ***/
    isAccident: false,
    accidentType: null,
    accidentDescription: '',
    accidentImagesList: [],
    /*** 事故 ***/
  })

  return { recordData }
})
