<template>
  <div>
    <ParentNav />
  </div>

  <div class="transactions-page">
    <div class="transactions-card">
      <div class="top-area">
        <div class="top-content">
          <h1>
            우리
            <span class="blue">{{
              transactionStore.states.child.nickname
            }}</span
            >의 거래 내역
          </h1>

          <p v-if="transactionStore.states.child" class="child-name">
            <!-- 자녀: {{ transactionStore.states.child.nickname }} -->
          </p>

          <div class="filter-btns">
            <button
              :class="{ active: filterType === 'ALL' }"
              @click="filterType = 'ALL'"
            >
              전체
            </button>

            <button
              :class="{ active: filterType === 'I' }"
              @click="filterType = 'I'"
            >
              수입
            </button>

            <button
              :class="{ active: filterType === 'E' }"
              @click="filterType = 'E'"
            >
              지출
            </button>
          </div>

          <TransactionList :transactions="filteredTransactions" />
        </div>
      </div>
    </div>
  </div>
  <RouterView></RouterView>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import TransactionList from '@/components/transactions/TransactionList.vue';
import { useTransactionStore } from '@/stores/transaction';
import ParentNav from '@/components/common/ParentNav.vue';

const filterType = ref('ALL');
const route = useRoute();
const transactionStore = useTransactionStore();

const childId = route.params.id;

const filteredTransactions = computed(() => {
  if (filterType.value === 'ALL') {
    return transactionStore.states.transactions;
  }

  return transactionStore.states.transactions.filter(
    (item) => item.type === filterType.value,
  );
});

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
  background: #f7f9fb;
  padding: 32px 20px;
  padding-top: 80px;
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

.top-content {
  width: 100%;
}

h1 {
  margin: 0;
  /* font-size: 40px;
  font-weight: 800; */
  color: #2f2f33;
  padding-top: 40px;
  padding-bottom: 20px;
}

.child-name {
  margin-top: 12px;
  font-size: 18px;
  font-weight: 700;
  color: #2456cc;
}

.filter-btns {
  display: flex;
  gap: 12px;
  margin: 16px 0 20px;
}

.filter-btns button {
  border: none;
  background: white;
  padding: 10px 18px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.filter-btns button.active {
  background: #4466ea;
  color: white;
}
.blue {
  color: #2456cc;
}
</style>
