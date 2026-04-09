import { defineStore } from 'pinia';
import { reactive, computed } from 'vue';
import axios from 'axios';

export const useTransactionStore = defineStore('transaction', () => {
  const states = reactive({
    child: null,
    transactions: [],
  });

  const fetchChild = async (childId) => {
    try {
      const response = await axios.get(`/api/children/${childId}`);
      states.child = response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const fetchTransactions = async (childId) => {
    try {
      const response = await axios.get(`/api/transactions?childId=${childId}`);
      states.transactions = response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const resetData = () => {
    states.child = null;
    states.transactions = [];
  };

  // 오늘 날짜가 속한 월요일 구하기
  function getMonday() {
    const date = new Date();
    const day = date.getDay(); // 0: 일, 1: 월, ...
    const diff = day === 0 ? 6 : day - 1; // 월요일과의 차이 (0이면 6, 1이면 0... )
    date.setDate(date.getDate() - diff); // date를 월요일 날짜로 설정
    date.setHours(0, 0, 0, 0); // date의 시간을 자정으로 설정
    return date; // 월요일 리턴
  }

  // 월요일 ~ 오늘까지의 거래 내역을 필터링한 배열
  const thisWeekTransactions = computed(() => {
    const monday = getMonday();
    const today = new Date();

    return states.transactions.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= monday && itemDate <= today;
    });
  });

  // 필터링된 배열을 type I인 것, E인 것으로 나누기
  const thisWeekIncomeList = computed(() => {
    return thisWeekTransactions.value.filter((item) => item.type === 'I'); // computed 한 값을 script에서 접근할 때는 .value가 필요하다고 함
  });
  const thisWeekExpenditureList = computed(() => {
    return thisWeekTransactions.value.filter((item) => item.type === 'E');
  });

  // --> 각각 합계 구하면 이번 주 수입, 이번 주 지출
  const thisWeekTotalIncome = computed(() => {
    let sum = 0;
    for (const item of thisWeekIncomeList.value) {
      sum += item.amount;
    }
    return sum;
  });
  const thisWeekTotalExpenditure = computed(() => {
    let sum = 0;
    for (const item of thisWeekExpenditureList.value) {
      sum += item.amount;
    }
    return sum;
  });

  // type E인 것들에서 다시 필터링 (1. N/W  2. 카테고리별)
  const needWantCount = computed(() => {
    let need = 0;
    let want = 0;
    for (const item of thisWeekExpenditureList.value) {
      if (item.category1 === 'N') need++;
      else if (item.category1 === 'W') want++;
    }
    return [need, want];
  });
  const categoryAmount = computed(() => {
    let food = 0;
    let snack = 0;
    let toy = 0;
    let hobby = 0;
    let school = 0;
    let etc = 0;
    for (const item of thisWeekExpenditureList.value) {
      if (item.category2 === '식사') food += item.amount;
      else if (item.category2 === '간식') snack += item.amount;
      else if (item.category2 === '장난감') toy += item.amount;
      else if (item.category2 === '취미') hobby += item.amount;
      else if (item.category2 === '준비물') school += item.amount;
      else if (item.category2 === '기타') etc += item.amount;
    }
    return [food, snack, toy, hobby, school, etc];
  });

  return {
    states,
    fetchChild,
    fetchTransactions,
    resetData,
    thisWeekTotalIncome,
    thisWeekTotalExpenditure,
    needWantCount,
    categoryAmount,
  };
});
