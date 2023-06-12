import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('task', () => {
  const recordData = ref({
    /*** 违章 ***/
    breakRulesType: '',
    penaltyAmount: '',
    deductPoints: '',
    /*** 违章 ***/
    /*** 故障 ***/
    faultType: '',
    faultDescription: '',
    faultImages: '',
    /*** 故障 ***/
    /*** 事故 ***/
    accidentType: '',
    accidentDescription: '',
    accidentImages: '',
    /*** 事故 ***/
  })

  return { recordData }
})
