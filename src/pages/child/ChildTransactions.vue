<template>
  <main>
    <ChildNav />

    <section class="transactions-page">
      <div class="transactions-card">
        <div class="top-area">
          <div>
            <p class="sub-title">MY LEDGER</p>
            <h1>내 지출 내역</h1>
            <p v-if="transactionStore.states.child" class="child-name">
              {{ transactionStore.states.child.nickname }}의 현재 잔액:
              {{ transactionStore.states.child.balance.toLocaleString() }}원
            </p>
          </div>
        </div>

        <TransactionList :transactions="transactionStore.states.transactions" />

        <p v-if="transactionStore.states.transactions.length === 0" class="empty-text">
          아직 기록된 거래 내역이 없어요.
        </p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import ChildNav from '@/components/common/ChildNav.vue';
import TransactionList from '@/components/transactions/TransactionList.vue';
import { useTransactionStore } from '@/stores/transaction';

const route = useRoute();
const transactionStore = useTransactionStore();
const childId = String(route.params.id);

onMounted(async () => {
  await transactionStore.fetchChild(childId);
  await transactionStore.fetchTransactions(childId);
});

onUnmounted(() => {
  transactionStore.resetData();
});
</script>

<style scoped>
.transactions-page {
  min-height: 100vh;
  background: #eaeff2;
  padding: 100px 20px 32px;
  box-sizing: border-box;
}

.transactions-card {
  max-width: 820px;
  margin: 0 auto;
}

.top-area {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 28px;
}

.sub-title {
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 700;
  color: #7b8190;
}

h1 {
  margin: 0;
  font-size: 40px;
  font-weight: 800;
  color: #2f2f33;
}

.child-name {
  margin-top: 12px;
  font-size: 18px;
  font-weight: 700;
  color: #2456cc;
}

.empty-text {
  margin-top: 20px;
  color: #8a93a1;
  font-size: 15px;
}
</style>
