import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useTaskStore = defineStore('task', () => {
  const recordData = ref({
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
    accidentImagesList: []
    /*** 事故 ***/
  });

  return { recordData };
});
