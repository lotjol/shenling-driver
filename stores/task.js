import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useTaskStore = defineStore('task', () => {
  const recordData = ref({
    /*** 违章 ***/
    isBreakRules: false,
    breakRulesType: '',
    penaltyAmount: '',
    deductPoints: '',
    /*** 违章 ***/

    /*** 故障 ***/
    isAvailable: false,
    faultType: '',
    faultDescription: '',
    faultImages: [],
    /*** 故障 ***/

    /*** 事故 ***/
    isAccident: false,
    accidentType: '',
    accidentDescription: '',
    accidentImages: []
    /*** 事故 ***/
  });

  return { recordData };
});
