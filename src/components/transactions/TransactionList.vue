<template>
  <div class="transaction-list">
    <TransactionItem v-for="item in transactions" :key="item.id" :item="item" />
  </div>
</template>

<script setup>
import TransactionItem from '@/components/transactions/TransactionItem.vue';

const props = defineProps(['transactions']);
</script>

<style scoped>
.transaction-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
