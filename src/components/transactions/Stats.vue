<template>
  <div id="stats">
    <div id="money-container">
      <div class="money-card">
        <div class="money-text">총 잔액</div>
        <div id="balance" class="money-amount">&#8361 {{transactionStore.states.child.balance}}</div>
      </div>
      <div class="money-card">
        <div class="money-text">이번 주 수입</div>
        <div id="income" class="money-amount">&#8361 {{ thisWeekTotalIncome }}</div>
      </div>
      <div class="money-card">
        <div class="money-text">이번 주 지출</div>
        <div id="expenditure" class="money-amount">&#8361 {{ thisWeekTotalExpenditure }}</div>
      </div>
    </div>
    <div id="graph-container">
      <NeedWant/>
      <Category />
    </div>
  </div>
</template>

<script setup>
import NeedWant from './NeedWant.vue';
import Category from './Category.vue';
import { useTransactionStore } from '@/stores/transaction';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const transactionStore = useTransactionStore();
const currentRoute = useRoute();

transactionStore.fetchChild(currentRoute.params.id);
transactionStore.fetchTransactions(currentRoute.params.id);

// 반응성 유지를 위해 computed 사용!!
const thisWeekTotalIncome = computed(() => transactionStore.thisWeekTotalIncome);
const thisWeekTotalExpenditure = computed(() => transactionStore.thisWeekTotalExpenditure);

</script>

<style scoped>
#money-container {
  display: flex;
  gap: 2em;
}
.money-card {
  background-color: white;
  width: 347px;
  height: 180px;
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  padding: 32px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}
.money-text {
  color: gray;
}
.money-amount {
  font-size: 40px;
  font-weight: 700;
}
#balance {
  color: #2456cc;
}
#income {
  color: #256b4f;
}
#expenditure {
  color: #a83836;
}
#graph-container {
  display: flex;
  gap: 2em;
}
#stats {
  display: flex;
  flex-direction: column;
  gap: 3em;
}
</style>