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

  const resetData = () => {
    states.child = null;
    states.transactions = [];
  };

  return {
    states,
    fetchChild,
    fetchTransactions,
    resetData,
  };
});
