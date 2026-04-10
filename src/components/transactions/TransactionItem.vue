<template>
  <div class="transaction-item" @click="editTrans(item.id)">
    <div class="left">
      <div class="icon-box">
        {{ item.type === 'E' ? '💸' : '💰' }}
      </div>

      <div class="info">
        <p class="category">
          {{ item.type === 'E' ? item.category2 : item.category3 }}
        </p>
        <p class="memo">{{ item.memo }}</p>
        <p class="date">{{ formatDate(item.date) }}</p>
      </div>
    </div>

    <div class="right">
      <p :class="item.type === 'E' ? 'expense' : 'income'">
        {{ item.type === 'E' ? '-' : '+' }}{{ item.amount.toLocaleString() }}원
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

const props = defineProps(['item']);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', { hour: '2-digit' }); // 시간까지 표시하려면 { hour: '2-digit' } 옵션이 필요함.
};

const editTrans = (id) => {
  console.log('clicked');
  // url에 따라 분기

  const path = route.fullPath;
  const segments = path.split('/');
  const userType = segments[1]; // 'parent' 또는 'child' 추출

  if (userType === 'parent') {
    router.push({ name: 'EditTransactionParent', params: { tid: id } });
  } else if (userType === 'child') {
    router.push({ name: 'EditTransactionChild', params: { tid: id } });
  }
};
</script>

<style scoped>
.transaction-item {
  background: white;
  border-radius: 28px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}

.left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.icon-box {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #eef3ff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.category {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #2f2f33;
}

.memo {
  margin: 0;
  font-size: 14px;
  color: #6f7782;
}

.date {
  margin: 0;
  font-size: 13px;
  color: #9aa3b2;
}

.right {
  display: flex;
  align-items: center;
}

.expense {
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: #f15b5b;
}

.income {
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: #4c6fff;
}
</style>
