<template>
  <div class="transaction-list-container">
    <div
      v-for="(items, date) in groupedTransactions"
      :key="date"
      class="dateGroup"
    >
      <h3 class="date">{{ date }}</h3>

      <div class="items">
        <TransactionItem v-for="item in items" :key="item.id" :item="item" />
      </div>
    </div>

    <div v-if="Object.keys(groupedTransactions).length === 0" class="noData">
      거래 내역이 없습니다.
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import TransactionItem from '@/components/transactions/TransactionItem.vue';

const props = defineProps(['transactions']);

const groupedTransactions = computed(() => {
  const groups = {};

  const sortedTransactions = [...props.transactions].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  sortedTransactions.forEach((item) => {
    const date = new Date(item.date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    });

    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
  });

  return groups;
});
</script>

<style scoped>
.transaction-list-container {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.dateGroup {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.date {
  font-size: 15px;
  font-weight: 700;
  color: #8b95a1;
  margin: 0;
  padding-left: 8px;
}

.items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.noData {
  text-align: center;
  padding: 40px 0;
  color: #9aa3b2;
}
</style>
