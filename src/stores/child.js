import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';
import axios from 'axios';

export const useChildListStore = defineStore('childList', () => {
  const states = reactive({
    parentNickname: '',
    childList: [],
  });

  const BASEURI1 = '/api/children';
  const BASEURI2 = '/api/parents?id=34ee7fwh'; // 일단 부모 한명이므로 아이디 하드코딩

  const fetchChildList = async () => {
    try {
      let response = await axios.get(BASEURI1);
      if (response.status == 200 || response.status == 304) {
        console.log(response.data);
        states.childList = response.data;
      } else {
        console.log('데이터 조회 실패');
      }
    } catch (e) {
      console.log('[ERROR] ', e);
    }
  };

  const fetchParentNickname = async () => {
    try {
      let response = await axios.get(BASEURI2);
      if (response.status == 200 || response.status == 304) {
        console.log(response.data);
        states.parentNickname = response.data[0].nickname;
      } else {
        console.log('데이터 조회 실패');
      }
    } catch (e) {
      console.log('[ERROR] ', e);
    }
  };

  return { states, fetchChildList, fetchParentNickname };
});
