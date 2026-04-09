import { defineStore } from 'pinia';
import { reactive } from 'vue';
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
      } else {
        alert('용돈 보내기에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      alert('용돈 보내기에 실패했습니다.');
    }
  };

  const resetData = () => {
    states.child = null;
    states.transactions = [];
  };

  return {
    states,
    fetchChild,
    fetchTransactions,
    resetData,
    postIncome,
  };
});
