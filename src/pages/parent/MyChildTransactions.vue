<template>
  <div class="transactions-page">
    <div class="transactions-card">
      <div class="top-area">
        <div>
          <p class="sub-title">아이 거래내역</p>
          <h1>거래 내역</h1>
          <p v-if="transactionStore.states.child" class="child-name">
            자녀: {{ transactionStore.states.child.nickname }}
          </p>
        </div>

        <button @click="goBack" class="back-btn">뒤로가기</button>
      </div>

      <TransactionList :transactions="transactionStore.states.transactions" />

      <p
        v-if="transactionStore.states.transactions.length === 0"
        class="empty-text"
      >
        아직 거래 내역이 없어요.
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TransactionList from '@/components/transactions/TransactionList.vue';
import { useTransactionStore } from '@/stores/transaction';

const route = useRoute();
const router = useRouter();
const transactionStore = useTransactionStore();

const childId = route.params.id;

const goBack = () => {
  router.push('/parent');
};

onMounted(() => {
  transactionStore.fetchChild(childId);
  transactionStore.fetchTransactions(childId);
});

onUnmounted(() => {
  transactionStore.resetData();
});
</script>

<style scoped>
.transactions-page {
  min-height: 100vh;
  background: #eaeff2;
  padding: 32px 20px;
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

.back-btn {
  border: none;
  background: linear-gradient(90deg, #4466ea, #6a88ff);
  color: white;
  padding: 12px 18px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(83, 114, 243, 0.22);
}

.empty-text {
  margin-top: 20px;
  color: #8a93a1;
  font-size: 15px;
}
</style>
