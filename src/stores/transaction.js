import { defineStore } from 'pinia';
import { reactive } from 'vue';
import axios from 'axios';

export const useTransactionStore = defineStore('transaction', () => {
  const BASE_CHILDREN = '/api/children';
  const BASE_TRANSACTIONS = '/api/transactions';

  const states = reactive({
    child: null,
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

  const fetchTransactions = async (childId) => {
    try {
      const response = await axios.get(`${BASE_TRANSACTIONS}?childId=${childId}`);
      states.transactions = response.data;
      return response.data;
    } catch (e) {
      console.log(e);
      return [];
    }
  };

  const createExpenditure = async ({ childId, amount, category2, needType, memo }) => {
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

  return {
    states,
    fetchChild,
    fetchTransactions,
    createExpenditure,
    resetData,
  };
});
