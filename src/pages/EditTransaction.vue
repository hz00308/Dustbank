<script setup>
import { ref } from 'vue';

const amount = ref('');

const selectedCategory = ref('전자기기');

const selectCategory = (category) => {
  selectedCategory.value = category;
};
const formatAmount = (e) => {
  let value = e.target.value;

  // 숫자만 남기기
  value = value.replace(/[^0-9]/g, '');

  // 콤마 추가
  value = Number(value).toLocaleString();

  amount.value = value;
};
// 삭제 버튼
const emit = defineEmits(['close']);
const deleteTransaction = () => {
  emit('close');
};

// 수정 완료 버튼
const updateTransaction = () => {
  emit('close');
};
</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
      <button class="close-btn" @click="$emit('close')">✕</button>

      <h2 class="title">거래 정보 수정</h2>

      <!-- 금액 -->
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
      <!-- 카테고리 -->
      <div class="category">
        <button
          :class="{ active: selectedCategory === '전자기기' }"
          @click="selectCategory('전자기기')"
        >
          💻 전자기기
        </button>

        <button
          :class="{ active: selectedCategory === '식비' }"
          @click="selectCategory('식비')"
        >
          🍴 식비
        </button>

        <button
          :class="{ active: selectedCategory === '교통비' }"
          @click="selectCategory('교통비')"
        >
          🚌 교통비
        </button>

        <button
          :class="{ active: selectedCategory === '기타' }"
          @click="selectCategory('기타')"
        >
          ••• 기타
        </button>
      </div>
      <!-- 날짜 -->
      <div>날짜</div>
      <input class="date-input" placeholder="YYYY. MM. DD." />

      <!-- 메모 -->
      <div>메모</div>
      <textarea class="memo-box" placeholder="메모 입력"></textarea>

      <!-- 버튼 -->
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
  font-weight: 500;

  display: flex;
  align-items: center;
  justify-content: flex-start;
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
  height: 50px;
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
  border: none;
}

.won {
  color: #2563eb;
}
</style>
