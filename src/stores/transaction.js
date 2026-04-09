import { defineStore } from 'pinia';
import { reactive, computed } from 'vue';
import axios from 'axios';

export const useTransactionStore = defineStore('transaction', () => {
  const BASE_CHILDREN = '/api/children';
  const BASE_TRANSACTIONS = '/api/transactions';

  const states = reactive({
    child: null,
    transaction: {},
    transactions: [],
  });

  const fetchChild = async (childId) => {
    try {
      const response = await axios.get(`${BASE_CHILDREN}/${childId}`);
      states.child = response.data;
      return response.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const fetchTransaction = async (transactionId) => {
    try {
      const response = await axios.get(`${BASE_TRANSACTIONS}/${transactionId}`);
      states.transaction = response.data;
      return response.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const fetchTransactions = async (childId) => {
    try {
      const response = await axios.get(
        `${BASE_TRANSACTIONS}?childId=${childId}`,
      );
      states.transactions = response.data;
      return response.data;
    } catch (e) {
      console.log(e);
      return [];
    }
  };

  const editTransaction = async (prevAmount, transaction) => {
    try {
      const childId = transaction.childId;
      await fetchChild(childId);
      const child = states.child;
      const transactionId = transaction.id;

      const response = await axios.put(
        `/api/transactions/${transactionId}`,
        transaction,
      );

      const currentAmount = Number(transaction.amount);
      const previousAmount = Number(prevAmount);

      if (response.status === 201 || response.status === 200) {
        let updatedBalance;
        if (transaction.type === 'I') {
          updatedBalance = child.balance - previousAmount + currentAmount;
        } else {
          updatedBalance = child.balance + previousAmount - currentAmount;
        }

        await axios.patch(`/api/children/${childId}`, {
          balance: updatedBalance,
        });
        states.child = { ...child, balance: updatedBalance };
        await fetchTransactions();
        alert('거래 내역을 성공적으로 수정했습니다.');
        return true;
      } else {
        alert('거래 내역 수정에 실패했습니다.');
        return false;
      }
    } catch (error) {
      console.error(error);
      alert('거래 내역 수정에 실패했습니다.');
      return false;
    }
  };

  const deleteTransaction = async (prevAmount, transaction) => {
    try {
      const childId = transaction.childId;
      const transactionId = transaction.id;
      await fetchChild(childId);
      const child = states.child;

      const response = await axios.delete(`/api/transactions/${transactionId}`);
      if (response.status === 200 || response.status === 204) {
        const previousAmount = Number(prevAmount);
        let updatedBalance;
        if (transaction.type === 'I') {
          updatedBalance = child.balance - previousAmount;
        } else {
          updatedBalance = child.balance + previousAmount;
        }
        await axios.patch(`/api/children/${childId}`, {
          balance: updatedBalance,
        });
        alert('거래 내역을 성공적으로 삭제했습니다.');
        return true;
      } else {
        alert('거래 내역 삭제에 실패했습니다.');
        return false;
      }
    } catch (error) {
      console.error(error);
      alert('거래 내역 삭제에 실패했습니다.');
      return false;
    }
  };

  const postIncome = async (transaction) => {
    try {
      const childId = transaction.childId;
      const amount = transaction.amount;
      const child = states.child;

      const response = await axios.post('/api/transactions', transaction);

      if (response.status === 201 || response.status === 200) {
        const updatedBalance = child.balance + amount;

        await axios.patch(`/api/children/${childId}`, {
          balance: updatedBalance,
        });
        states.child = { ...child, balance: updatedBalance };
        await fetchTransactions();
        alert('용돈을 성공적으로 보냈습니다.');
        return true;
      } else {
        alert('용돈 보내기에 실패했습니다.');
        return false;
      }
    } catch (error) {
      console.error(error);
      alert('용돈 보내기에 실패했습니다.');
      return false;
    }
  };

  const createExpenditure = async ({
    childId,
    amount,
    category2,
    needType,
    memo,
  }) => {
    const child = await fetchChild(childId);

    if (!child) {
      throw new Error('자녀 정보를 불러오지 못했습니다.');
    }

    if (amount <= 0) {
      throw new Error('지출 금액은 0보다 커야 합니다.');
    }

    if (child.balance < amount) {
      throw new Error('잔액이 부족합니다.');
    }

    const now = new Date().toISOString();
    const transactionPayload = {
      childId,
      parentId: child.parentId,
      type: 'E',
      category1: needType === 'need' ? 'N' : 'W',
      category2,
      category3: null,
      amount,
      date: now,
      createdAt: now,
      memo: memo?.trim() || '',
    };

    const response = await axios.post(BASE_TRANSACTIONS, transactionPayload);
    const updatedBalance = child.balance - amount;

    await axios.patch(`${BASE_CHILDREN}/${childId}`, {
      balance: updatedBalance,
    });

    states.child = { ...child, balance: updatedBalance };
    states.transactions = [response.data, ...states.transactions];

    return response.data;
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
    fetchTransaction,
    fetchTransactions,
    createExpenditure,
    resetData,
    postIncome,
    editTransaction,
    deleteTransaction,
    thisWeekTotalIncome,
    thisWeekTotalExpenditure,
    needWantCount,
    categoryAmount,
  };
});
