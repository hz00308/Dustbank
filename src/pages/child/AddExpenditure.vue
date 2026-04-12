<template>
  <main class="expenditure-page">
    <ChildNav />

    <section class="hero">
      <p class="hero-label">EXPENDITURE ENTRY</p>
      <h1 class="hero-title">얼마를 썼나요?</h1>
    </section>

    <section class="content-grid">
      <article class="amount-card">
        <div class="price">
          <span class="won">&#8361;</span>
          <input
            type="number"
            id="amount"
            placeholder="0"
            pattern="[0-9]*"
            v-model.number="currentAmount"
            min="0"
          />
        </div>

        <div class="quick-amount-panel">
          <p class="quick-amount-title">빠른 금액 선택</p>
          <div class="quick-amount-grid">
            <button
              v-for="value in quickAmounts"
              :key="value"
              type="button"
              class="pill-button"
              @click="updateAmount(value)"
            >
              + {{ value.toLocaleString('ko-KR') }}
            </button>
            <button
              type="button"
              class="pill-button primary"
              @click="resetAmount"
            >
              초기화
            </button>
          </div>
        </div>

        <div class="input-row three-col">
          <div class="field">
            <span class="field-label">DATE</span>
            <input type="date" v-model="dateData.date" class="date-input" />
          </div>

          <div class="field">
            <span class="field-label">TIME</span>
            <div class="time-input-group">
              <input
                type="number"
                v-model="dateData.hour"
                min="0"
                max="23"
                placeholder="00"
                class="time-input"
              />
              <span class="time-separator">:</span>
              <input
                type="number"
                v-model="dateData.minute"
                min="0"
                max="59"
                placeholder="00"
                class="time-input"
              />
            </div>
          </div>

          <div class="field">
            <span class="field-label">MEMO</span>
            <textarea
              v-model="memo"
              class="memo-input"
              rows="1"
              maxlength="100"
              placeholder="메모를 입력하세요"
            />
          </div>
        </div>
      </article>

      <aside class="category-card">
        <section>
          <p class="panel-title">카테고리 선택</p>

          <div class="category-grid">
            <button
              v-for="category in categories"
              :key="category.name"
              type="button"
              class="category-button"
              :class="{ active: selectedCategory === category.name }"
              @click="selectedCategory = category.name"
            >
              <span class="category-icon" :class="category.color">
                {{ category.icon }}
              </span>
              <span class="category-name">{{ category.name }}</span>
            </button>
          </div>
        </section>

        <section class="need-section">
          <p class="question-title">꼭 필요한가요?</p>
          <p class="question-subtitle">소비의 성격을 선택해주세요</p>

          <div class="toggle-wrap">
            <button
              type="button"
              class="toggle-button"
              :class="{ active: selectedNeedType === 'need' }"
              @click="selectedNeedType = 'need'"
            >
              필요해요
            </button>
            <button
              type="button"
              class="toggle-button"
              :class="{ active: selectedNeedType === 'want' }"
              @click="selectedNeedType = 'want'"
            >
              원해요
            </button>
          </div>
        </section>

        <div class="action-area">
          <p v-if="statusMessage" class="status-text" :class="statusType">
            {{ statusMessage }}
          </p>
          <button
            type="button"
            class="submit-button"
            @click="submitExpenditure"
          >
            지출 기록하기
          </button>
        </div>
      </aside>
    </section>
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ChildNav from '@/components/common/ChildNav.vue';
import { useTransactionStore } from '@/stores/transaction';

const categories = [
  { name: '식사', icon: '🍚', color: 'orange' },
  { name: '간식', icon: '🍪', color: 'yellow' },
  { name: '장난감', icon: '🧸', color: 'beige' },
  { name: '취미', icon: '🎨', color: 'sky' },
  { name: '준비물', icon: '✏️', color: 'green' },
  { name: '기타', icon: '✨', color: 'gray' },
];

const route = useRoute();
const router = useRouter();
const transactionStore = useTransactionStore();

const quickAmounts = [100, 1000, 2000, 5000, 10000];
const currentAmount = ref(0);
const selectedCategory = ref('식사');
const selectedNeedType = ref('need');
const memo = ref('');
const statusMessage = ref('');
const statusType = ref('');

const dateData = reactive({
  date: new Date().toISOString().split('T')[0],
  hour: new Date().getHours(),
  minute: new Date().getMinutes(),
});

function formatDate() {
  const hour = String(dateData.hour).padStart(2, '0');
  const minute = String(dateData.minute).padStart(2, '0');

  if (!dateData.date) {
    statusMessage.value = '날짜를 입력해주세요.';
    statusType.value = 'error';
    return null;
  }

  const localDateTime = `${dateData.date}T${hour}:${minute}:00`;
  return new Date(localDateTime).toISOString();
}

function updateAmount(value) {
  const current = Number(currentAmount.value) || 0;
  currentAmount.value = current + value;
}

function resetAmount() {
  currentAmount.value = 0;
}

async function submitExpenditure() {
  statusMessage.value = '';
  statusType.value = '';

  if (currentAmount.value <= 0) {
    statusMessage.value = '지출 금액을 먼저 입력해주세요.';
    statusType.value = 'error';
    return;
  }

  const isoDate = formatDate();
  if (!isoDate) return;

  try {
    const childId = String(route.params.id);

    const success = await transactionStore.createExpenditure({
      childId,
      amount: currentAmount.value,
      category2: selectedCategory.value,
      needType: selectedNeedType.value,
      memo: memo.value,
      date: isoDate,
    });

    if (success) {
      statusMessage.value = '지출이 저장되었습니다.';
      statusType.value = 'success';
      resetAmount();
      memo.value = '';

      dateData.date = new Date().toISOString().split('T')[0];
      dateData.hour = new Date().getHours();
      dateData.minute = new Date().getMinutes();

      router.push({ name: 'ChildTransactions', params: { id: childId } });
    }
  } catch (error) {
    statusMessage.value =
      error?.message ||
      '지출 저장 중 문제가 생겼습니다. 잠시 후 다시 시도해주세요.';
    statusType.value = 'error';
  }
}
</script>

<style scoped>
.expenditure-page {
  min-height: 100vh;
  padding-bottom: 30px;
  background-color: #f7f9fb;
  color: #2c3437;
}

.hero {
  padding: 106px 20px 30px;
  text-align: center;
}

.hero-label {
  margin-bottom: 14px;
  color: #2456cc;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.18em;
}

.hero-title {
  margin-bottom: 12px;
  font-size: clamp(2rem, 3.4vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.04em;
}

.content-grid {
  width: min(1180px, calc(100% - 48px));
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 2.2fr) minmax(300px, 1fr);
  gap: 18px;
}

.amount-card,
.category-card {
  border-radius: 32px;
  background: #ffffff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

.amount-card {
  padding: 58px 30px 34px;
}

.amount-caption {
  text-align: center;
  color: #596064;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  margin-bottom: 28px;
}

.price {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 5rem;
  margin-bottom: 24px;
}

.won {
  font-size: clamp(2.4rem, 4vw, 3rem);
  color: #2456cc;
  font-weight: 900;
  margin-right: 8px;
}

#amount {
  font-size: clamp(3rem, 5vw, 4.4rem);
  font-weight: 800;
  color: #2456cc;
  border: none;
  width: 60%;
  outline: none;
  background-color: transparent;
  text-align: center;
  letter-spacing: -0.04em;
}

#amount::placeholder {
  color: #aeb5b9;
}

.quick-amount-panel {
  margin-top: 44px;
  padding: 26px 24px;
  border-radius: 18px;
  background: #f0f4f7;
}

.quick-amount-title {
  margin-bottom: 24px;
  color: #596064;
  font-size: 0.92rem;
  font-weight: 600;
}

.quick-amount-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.pill-button {
  height: 44px;
  border: 1px solid #e0e4ea;
  border-radius: 999px;
  background: #ffffff;
  color: #145d42;
  font-size: 1rem;
  font-weight: 700;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  transition: all 0.18s ease;
}

.pill-button.primary {
  border-color: #3765d2;
  background: #3765d2;
  color: #ffffff;
  box-shadow: 0 10px 20px rgba(55, 101, 210, 0.2);
}

.input-row {
  margin-top: 42px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.input-row.three-col {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.date-input {
  min-height: 46px;
  border: none;
  border-radius: 999px;
  background: #f0f4f7;
  padding: 0 14px;
  color: #596064;
  font-size: 0.92rem;
  outline: none;
  width: 100%;
}

.date-input:focus {
  box-shadow: 0 0 0 2px rgba(55, 101, 210, 0.16);
}

.time-input-group {
  min-height: 46px;
  border-radius: 999px;
  background: #f0f4f7;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 14px;
  gap: 4px;
}

.time-input {
  width: 50px;
  border: none;
  background: transparent;
  text-align: center;
  color: #596064;
  font-size: 0.92rem;
  outline: none;
}

.time-separator {
  color: #596064;
  font-weight: 700;
  font-size: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.field-label {
  color: #596064;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.memo-input {
  min-height: 46px;
  border: none;
  border-radius: 18px;
  background: #f0f4f7;
  padding: 12px 14px;
  color: #596064;
  font-size: 0.92rem;
  resize: none;
  outline: none;
}

.memo-input:focus {
  box-shadow: 0 0 0 2px rgba(55, 101, 210, 0.16);
}

.category-card {
  padding: 24px 24px 22px;
}

.panel-title {
  margin-bottom: 18px;
  color: #2c3437;
  font-size: 0.94rem;
  font-weight: 700;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.category-button {
  min-width: 0;
  min-height: 84px;
  border: none;
  border-radius: 16px;
  background: #f0f4f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #596064;
  transition: all 0.2s ease;
  cursor: pointer;
}

.category-button.active {
  background: #ffffff;
  box-shadow:
    inset 0 0 0 2px #3765d2,
    0 10px 20px rgba(55, 101, 210, 0.12);
  color: #2456cc;
}

.category-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 1.1rem;
  font-weight: 700;
}

.category-icon.orange {
  color: #ff9800;
  background: #fff8ef;
}

.category-icon.yellow {
  color: #e1a700;
  background: #fff9e8;
}

.category-icon.beige {
  color: #d4a574;
  background: #fef5f0;
}

.category-icon.sky {
  color: #5dade2;
  background: #eaf4fb;
}

.category-icon.green {
  color: #2fa86b;
  background: #edf9f2;
}

.category-icon.gray {
  color: #8b95a1;
  background: #f0f4f7;
}

.category-button.active .category-icon {
  background: #3765d2;
  color: #ffffff;
}

.category-name {
  font-size: 0.9rem;
  font-weight: 600;
}

.need-section {
  margin-top: 26px;
  padding-top: 6px;
}

.question-title {
  margin-bottom: 8px;
  color: #2c3437;
  font-size: 0.96rem;
  font-weight: 700;
}

.question-subtitle {
  margin-bottom: 16px;
  color: #8b95a1;
  font-size: 0.82rem;
}

.toggle-wrap {
  padding: 4px;
  border-radius: 999px;
  background: #f0f4f7;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
}

.toggle-button {
  min-height: 28px;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: #8b95a1;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toggle-button.active {
  background: #ffffff;
  color: #3765d2;
  box-shadow: 0 4px 12px rgba(55, 101, 210, 0.14);
}

.action-area {
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid #f0f4f7;
}

.status-text {
  margin-bottom: 12px;
  padding: 12px 14px;
  border-radius: 14px;
  font-size: 0.88rem;
  font-weight: 700;
  text-align: center;
}

.status-text.success {
  background: #e7f8ed;
  color: #287548;
}

.status-text.error {
  background: #fdecec;
  color: #c24747;
}

.submit-button {
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 999px;
  background: #3765d2;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  box-shadow: 0 10px 20px rgba(55, 101, 210, 0.2);
  cursor: pointer;
}

@media (max-width: 960px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .content-grid {
    width: min(100% - 24px, 100%);
  }

  .amount-card {
    padding: 34px 18px 24px;
  }

  .quick-amount-grid,
  .input-row,
  .input-row.three-col,
  .category-grid {
    grid-template-columns: 1fr;
  }
}
</style>
