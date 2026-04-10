<template>
  <div class="modal-overlay">
    <div class="modal">
      <button class="close-btn" @click="closeModal">✕</button>

      <h2 class="title">거래 정보 수정</h2>

      <div class="amount-box">
        <span>금액</span>

        <div class="amount-input">
          <span class="won">₩</span>
          <input
            v-model.number="transactionData.amount"
            type="number"
            placeholder="0"
          />
        </div>
      </div>

      <!-- v-if로 카테고리 처리 -->
      <div class="income-category" v-if="transactionData.type === 'I'">
        <div class="category-title">카테고리</div>
        <div class="category">
          <button
            :class="{ active: transactionData.category3 === '정기용돈' }"
            @click="transactionData.category3 = '정기용돈'"
          >
            💵 정기용돈
          </button>

          <button
            :class="{ active: transactionData.category3 === '보너스' }"
            @click="transactionData.category3 = '보너스'"
          >
            🎁 보너스
          </button>

          <button
            :class="{ active: transactionData.category3 === '세뱃돈' }"
            @click="transactionData.category3 = '세뱃돈'"
          >
            💰 세뱃돈
          </button>
          <button
            :class="{ active: transactionData.category3 === '기타' }"
            @click="transactionData.category3 = '기타'"
          >
            ✨ 기타
          </button>
        </div>
      </div>

      <div
        class="expenditure-category"
        v-else-if="transactionData.type === 'E'"
      >
        <div class="category-title">카테고리</div>

        <div class="category">
          <button
            :class="{ active: transactionData.category2 === '식사' }"
            @click="transactionData.category2 = '식사'"
          >
            🍚 식사
          </button>

          <button
            :class="{ active: transactionData.category2 === '간식' }"
            @click="transactionData.category2 = '간식'"
          >
            🍪 간식
          </button>

          <button
            :class="{ active: transactionData.category2 === '장난감' }"
            @click="transactionData.category2 = '장난감'"
          >
            🧸 장난감
          </button>
          <button
            :class="{ active: transactionData.category2 === '취미' }"
            @click="transactionData.category2 = '취미'"
          >
            🎨 취미
          </button>

          <button
            :class="{ active: transactionData.category2 === '학용품' }"
            @click="transactionData.category2 = '학용품'"
          >
            ✏️ 학용품
          </button>
          <button
            :class="{ active: transactionData.category2 === '기타' }"
            @click="transactionData.category2 = '기타'"
          >
            ✨ 기타
          </button>
        </div>

        <div class="expenditure-type">
          <div class="title">꼭 필요한가요?</div>
          <div class="toggle-wrap">
            <button
              type="button"
              class="toggle-button"
              :class="{ active: transactionData.category1 === 'N' }"
              @click="transactionData.category1 = 'N'"
            >
              필요해요
            </button>
            <button
              type="button"
              class="toggle-button"
              :class="{ active: transactionData.category1 === 'W' }"
              @click="transactionData.category1 = 'W'"
            >
              원해요
            </button>
          </div>
        </div>
      </div>

      <div class="dateTime">
        <div class="date">
          <p>날짜</p>
          <input class="date-input" v-model="dateData.date" type="date" />
        </div>
        <div class="inputGroup">
          <p>시간</p>
          <div class="time" id="time">
            <input
              type="number"
              id="hour"
              min="0"
              max="24"
              placeholder="00"
              v-model="dateData.hour"
            />
            <span> : </span>
            <input
              type="number"
              id="minute"
              min="0"
              max="59"
              placeholder="00"
              v-model="dateData.minute"
            />
          </div>
        </div>
      </div>

      <div class="memo">
        <p>메모</p>
        <textarea
          class="memo-box"
          v-model="transactionData.memo"
          placeholder="메모 입력"
        >
        </textarea>
      </div>

      <div class="actions">
        <button class="delete" @click="deleteTransaction">삭제</button>
        <button class="save" @click="editTransaction">수정 완료</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { useTransactionStore } from '@/stores/transaction';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const transactionId = route.params.id;
const transactionStore = useTransactionStore();
const emit = defineEmits(['close']);

const transactionData = reactive({
  id: '',
  childId: '',
  parentId: '',
  type: '',
  category1: null,
  category2: null,
  category3: null,
  amount: 0,
  date: '',
  createdAt: '',
  memo: '',
});

const dateData = reactive({
  date: '',
  hour: 0,
  minute: 0,
});

let prevAmount = 0;

// const formatAmount = (e) => {
//   let value = e.target.value;

//   value = value.replace(/[^0-9]/g, '');

//   if (value === '') {
//     amount.value = '';
//     return;
//   }

//   transactionData.amount = Number(value).toLocaleString();
// };

const initData = async () => {
  await transactionStore.fetchTransaction(transactionId);
  const transaction = transactionStore.states.transaction;
  console.log(transaction);

  prevAmount = transaction.amount;

  transactionData.id = transaction.id;
  transactionData.childId = transaction.childId;
  transactionData.parentId = transaction.parentId;
  transactionData.type = transaction.type;
  transactionData.category1 = transaction.category1;
  transactionData.category2 = transaction.category2;
  transactionData.category3 = transaction.category3;
  transactionData.amount = transaction.amount;
  transactionData.date = transaction.date;
  transactionData.createdAt = transaction.createdAt;
  transactionData.memo = transaction.memo;

  const dateObj = new Date(transaction.date);
  const date = dateObj.toISOString().split('T')[0];
  const hour = Number(dateObj.getHours());
  const minute = Number(dateObj.getMinutes());

  dateData.date = date;
  dateData.hour = hour;
  dateData.minute = minute;
};

initData();

const closeModal = () => {
  emit('close');
  router.back();
};
const formatDate = async () => {
  const hour = String(dateData.hour).padStart(2, '0');
  const minute = String(dateData.minute).padStart(2, '0');

  if (!dateData.date) {
    alert('날짜를 선택해주세요');
    return;
  }

  const localDateTime = `${dateData.date}T${hour}:${minute}:00`;
  const isoDate = new Date(localDateTime).toISOString();
  transactionData.date = isoDate;
  transactionData.createdAt = new Date().toISOString();
};

const editTransaction = async () => {
  await formatDate();
  const success = await transactionStore.editTransaction(
    prevAmount,
    transactionData,
  );
  if (success) {
    emit('close');
    router.back();
  }
};

const deleteTransaction = async () => {
  if (!confirm('정말로 삭제하시겠습니까?')) return;
  const success = await transactionStore.deleteTransaction(
    prevAmount,
    transactionData,
  );
  if (success) {
    emit('close');
    router.back();
  }
};
</script>

<style>
button {
  cursor: pointer;
}
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

.dateTime {
  display: flex;
  justify-content: space-between;
}

.date-input {
  padding: 12px;
  border-radius: 12px;
  border: none;
  background: #f3f4f6;
  width: 180px;
}

.date > p {
  margin-bottom: 8px;
}
.inputGroup > p {
  margin-bottom: 8px;
}
.inputGroup > .time {
  padding: 12px;
  border-radius: 12px;
  border: none;
  background: #f3f4f6;
  width: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
}

.inputGroup > .time > input {
  border: none;
  width: 60px;
  text-align: center;
  outline: none;
  box-sizing: border-box;
  background-color: transparent;
}
.memo {
  width: 100%;
}
.memo > p {
  margin-bottom: 8px;
}
.memo-box {
  width: 100%;
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
.category-title {
  margin-bottom: 8px;
}
.toggle-wrap {
  padding: 4px;
  border-radius: 999px;
  background: #f3f4f6;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
}

.toggle-button {
  min-height: 28px;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: #6d7f9b;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.toggle-button.active {
  background: #ffffff;
  color: #4280f5;
}

.expenditure-type > .title {
  margin: 8px 0;
}
</style>
