<script setup>
import { ref, watch } from 'vue';
import { useTransactionStore } from '@/stores/transactionStore';

const transactionStore = useTransactionStore();

const emit = defineEmits(['close']);

const props = defineProps({
  transaction: Object,
});

const amount = ref('');
const selectedCategory = ref('');
const memo = ref('');
const date = ref('');

// 데이터 불러오기
watch(
  () => props.transaction,
  (t) => {
    if (!t) return;

    amount.value = Number(t.amount).toLocaleString();
    selectedCategory.value = t.category2;
    memo.value = t.memo;
    date.value = t.date?.slice(0, 10);
  },
  { immediate: true },
);

const selectCategory = (category) => {
  selectedCategory.value = category;
};

// 금액 콤마 처리
const formatAmount = (e) => {
  let value = e.target.value;

  value = value.replace(/[^0-9]/g, '');

  if (value === '') {
    amount.value = '';
    return;
  }

  amount.value = Number(value).toLocaleString();
};

// 삭제
const deleteTransaction = async () => {
  await transactionStore.deleteTransaction(props.transaction.id);

  emit('close');
};

// 수정
const updateTransaction = async () => {
  const newAmount = Number(amount.value.replace(/,/g, ''));

  const updatedData = {
    amount: newAmount,
    category2: selectedCategory.value,
    memo: memo.value,
    date: date.value,
  };

  await transactionStore.updateTransaction(props.transaction.id, updatedData);

  emit('close');
};
</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
      <button class="close-btn" @click="$emit('close')">✕</button>

      <h2 class="title">거래 정보 수정</h2>

      <div class="amount-box">
        <span>금액</span>

        <div class="amount-input">
          <span class="won">₩</span>

          <input
            v-model="amount"
            @input="formatAmount"
            type="text"
            placeholder="금액 입력"
          />
        </div>
      </div>

      <div class="category-title">카테고리</div>

      <div class="category">
        <button
          :class="{ active: selectedCategory === '학용품' }"
          @click="selectCategory('학용품')"
        >
          ✏️ 학용품
        </button>

        <button
          :class="{ active: selectedCategory === '간식' }"
          @click="selectCategory('간식')"
        >
          🍴 간식
        </button>

        <button
          :class="{ active: selectedCategory === '교통비' }"
          @click="selectCategory('교통비')"
        >
          🚌 교통비
        </button>
        <button
          :class="{ active: selectedCategory === '용돈' }"
          @click="selectCategory('용돈')"
        >
          💰 용돈
        </button>

        <button
          :class="{ active: selectedCategory === '장난감' }"
          @click="selectCategory('장난감')"
        >
          🧸 장난감
        </button>
        <button
          :class="{ active: selectedCategory === '기타' }"
          @click="selectCategory('기타')"
        >
          ••• 기타
        </button>
      </div>

      <div>날짜</div>

      <input class="date-input" v-model="date" type="date" />

      <div>메모</div>

      <textarea
        class="memo-box"
        v-model="memo"
        placeholder="메모 입력"
      ></textarea>

      <div class="actions">
        <button class="delete" @click="deleteTransaction">삭제</button>

        <button class="save" @click="updateTransaction">수정 완료</button>
      </div>
    </div>
  </div>
</template>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal {
  position: relative;
  width: 420px;
  background: white;
  padding: 24px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  background: white;
}

.amount-box {
  background: #f3f4f6;
  border-radius: 16px;
  padding: 16px;
  text-align: center;
}

.amount-input {
  font-size: 28px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.amount-input input {
  border: none;
  background: transparent;
  font-size: 28px;
  font-weight: bold;
  width: 200px;
  text-align: center;
  outline: none;
}

.won {
  color: #2563eb;
}

.category {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.category button {
  padding: 12px;
  border-radius: 20px;
  border: none;
  background: #f3f4f6;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.category button.active {
  border: 2px solid #2563eb;
  background: white;
  color: #2563eb;
}

.date-input {
  padding: 12px;
  border-radius: 12px;
  border: none;
  background: #f3f4f6;
}

.memo-box {
  height: 60px;
  resize: none;
  border-radius: 12px;
  border: none;
  padding: 12px;
  background: #f3f4f6;
}

.actions {
  display: flex;
  justify-content: space-between;
}

.delete {
  background: #e5e7eb;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
}

.save {
  background: #2563eb;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
}
</style>
