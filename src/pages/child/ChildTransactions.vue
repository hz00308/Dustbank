<template>
  <div>
    <ChildNav />
  </div>

  <div class="transactions-page">
    <div class="transactions-card">
      <div class="top-area">
        <div class="top-content">
          <h1>
            <span class="blue">{{
              transactionStore.states.child.nickname
            }}</span>
            - 나의 거래 내역
          </h1>

          <p v-if="transactionStore.states.child" class="child-name">
            <!-- 자녀: {{ transactionStore.states.child.nickname }} -->
          </p>

          <div class="filter-card">
            <div class="date-row">
              <input type="date" v-model="startDate" />
              <span class="date-sep">~</span>
              <input type="date" v-model="endDate" />
              <button
                v-if="startDate || endDate"
                class="date-clear"
                @click="resetDateRange"
              >
                &#x2715;
              </button>
            </div>

            <div class="type-category-row">
              <div class="segment-control">
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

              <div v-if="filterType !== 'ALL'" class="category-chips">
                <button
                  v-for="cat in filterType === 'I'
                    ? incomeCategories
                    : expenditureCategories"
                  :key="cat"
                  class="chip"
                  :class="{ active: selectedCategory === cat }"
                  @click="
                    selectedCategory = selectedCategory === cat ? '' : cat
                  "
                >
                  {{ cat }}
                </button>
              </div>
            </div>
          </div>

          <TransactionList :transactions="filteredTransactions" />
        </div>
      </div>
    </div>
  </div>
  <RouterView></RouterView>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import TransactionList from '@/components/transactions/TransactionList.vue';
import { useTransactionStore } from '@/stores/transaction';
import ChildNav from '@/components/common/ChildNav.vue';

const filterType = ref('ALL');
const startDate = ref('');
const endDate = ref('');
const selectedCategory = ref('');

const incomeCategories = ['정기용돈', '보너스', '세뱃돈', '기타'];
const expenditureCategories = [
  '식사',
  '간식',
  '장난감',
  '취미',
  '준비물',
  '기타',
];

const route = useRoute();
const transactionStore = useTransactionStore();
const childId = route.params.id;

watch(filterType, () => {
  selectedCategory.value = '';
});

const resetDateRange = () => {
  startDate.value = '';
  endDate.value = '';
};

const filteredTransactions = computed(() => {
  let result = transactionStore.states.transactions;

  if (filterType.value !== 'ALL') {
    result = result.filter((item) => item.type === filterType.value);
  }

  if (startDate.value) {
    const start = new Date(startDate.value);
    start.setHours(0, 0, 0, 0);
    result = result.filter((item) => new Date(item.date) >= start);
  }

  if (endDate.value) {
    const end = new Date(endDate.value);
    end.setHours(23, 59, 59, 999);
    result = result.filter((item) => new Date(item.date) <= end);
  }

  if (selectedCategory.value) {
    result = result.filter((item) => {
      if (filterType.value === 'I')
        return item.category3 === selectedCategory.value;
      if (filterType.value === 'E')
        return item.category2 === selectedCategory.value;
      return true;
    });
  }

  return result;
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
  /* font-size: 40px; */
  /* font-weight: 800; */
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

.filter-card {
  background: white;
  border-radius: 20px;
  padding: 20px;
  margin: 16px 0 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.date-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f1f3f7;
  justify-content: center;
}

.date-row input {
  border: 1px solid #e8eaef;
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 13px;
  color: #4a5568;
  outline: none;
  background: #f9fafb;
  width: 50%;
}

.date-row input:focus {
  border-color: #4466ea;
  background: white;
}

.date-sep {
  color: #c4c9d4;
  font-weight: 600;
  font-size: 14px;
}

.date-clear {
  border: none;
  background: #f1f3f7;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: 12px;
  color: #8b95a1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.date-clear:hover {
  background: #e8eaef;
  color: #4a5568;
}

.type-category-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: space-between;
}

.segment-control {
  display: flex;
  background: #f1f3f7;
  border-radius: 12px;
  padding: 3px;
  flex-shrink: 0;
}

.segment-control button {
  border: none;
  background: transparent;
  padding: 8px 20px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  color: #8b95a1;
  cursor: pointer;
  transition: all 0.2s;
}

.segment-control button.active {
  background: white;
  color: #4466ea;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.category-chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.chip {
  border: 1.5px solid #e8eaef;
  background: transparent;
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  color: #8b95a1;
  cursor: pointer;
  transition: all 0.2s;
}

.chip.active {
  border-color: #4466ea;
  background: #eef2ff;
  color: #4466ea;
}

.chip:hover:not(.active) {
  border-color: #c4c9d4;
  color: #4a5568;
}

.filter-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 4px;
  border-top: 1px solid #f1f3f7;
  font-size: 13px;
  color: #8b95a1;
}

.filter-summary span:first-child {
  font-weight: 700;
  color: #4466ea;
}

.active-filters {
  font-size: 12px;
  color: #a0a8b7;
}

.blue {
  color: #2456cc;
}
</style>
