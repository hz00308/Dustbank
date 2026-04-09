<template>
  <main class="expenditure-page">
    <ChildNav />

    <section class="hero">
      <p class="hero-label">NEW TRANSACTION</p>
      <h1 class="hero-title">얼마를 썼나요?</h1>
  
    </section>

    <section class="content-grid">
      <article class="amount-card">
        <p class="amount-caption">CURRENT AMOUNT</p>
        <div class="amount-display">
          <Transition name="amount-change" mode="out-in">
            <strong :key="amountAnimationKey" class="amount-number">
              {{ formattedAmount }}
            </strong>
          </Transition>
        </div>

        <div class="quick-amount-panel">
          <p class="quick-amount-title">↩ 빠른 금액 선택</p>
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
            <button type="button" class="pill-button primary" @click="resetAmount">
              초기화
            </button>
          </div>
        </div>

        <div class="input-row">
          <div class="field">
            <span class="field-label">DATE</span>
            <div class="field-box date-box">
              <span class="field-icon">◦</span>
              <span>{{ currentDateLabel }}</span>
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
          <p class="panel-title">⌂ 카테고리 선택</p>

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
          <p v-if="statusMessage" class="status-text">{{ statusMessage }}</p>
          <button type="button" class="submit-button" @click="submitTransaction">
            지출 기록하기
          </button>
          <button type="button" class="cancel-button">취소</button>
        </div>
      </aside>
    </section>

    <footer class="footer-quote">
      "계획적인 소비는 미래의 나를 위한 가장 큰 투자입니다."
    </footer>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import ChildNav from '@/components/common/ChildNav.vue';
import { useTransactionStore } from '@/stores/transaction';

const route = useRoute();
const transactionStore = useTransactionStore();
const categories = [
  { name: '식사', icon: '🍚', color: 'orange' },
  { name: '간식', icon: '🍪', color: 'yellow' },
  { name: '장난감', icon: '🧸', color: 'beige' },
  { name: '취미', icon: '🎨', color: 'sky' },
  { name: '학용품', icon: '✏️', color: 'green' },
  { name: '기타', icon: '✨', color: 'gray' },
];

const quickAmounts = [500, 1000, 2000, 5000, 10000];
const currentAmount = ref(5500);
const amountAnimationKey = ref(0);
const selectedCategory = ref('장난감');
const selectedNeedType = ref('need');
const memo = ref('');
const statusMessage = ref('');

const formattedAmount = computed(() => currentAmount.value.toLocaleString('ko-KR'));
const currentDateLabel = computed(() => {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, '0');
  const date = `${now.getDate()}`.padStart(2, '0');
  const hours = `${now.getHours()}`.padStart(2, '0');
  const minutes = `${now.getMinutes()}`.padStart(2, '0');

  return `${year}.${month}.${date} ${hours}:${minutes}`;
});

function updateAmount(value) {
  currentAmount.value += value;
  amountAnimationKey.value += 1;
}

function resetAmount() {
  currentAmount.value = 0;
  amountAnimationKey.value += 1;
}

async function submitTransaction() {
  if (currentAmount.value <= 0) {
    statusMessage.value = '금액을 먼저 선택해주세요.';
    return;
  }

  try {
    await transactionStore.addTransaction({
      childId: route.params.id,
      amount: currentAmount.value,
      memo: memo.value,
      category1: selectedNeedType.value === 'need' ? 'N' : 'W',
      category2: selectedCategory.value,
      type: 'E',
    });

    statusMessage.value = '지출 내역이 저장되었어요.';
    memo.value = '';
    resetAmount();
  } catch (error) {
    statusMessage.value = '저장 중 문제가 생겼어요. 다시 시도해주세요.';
  }
}
</script>

<style scoped>
.expenditure-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(255, 255, 255, 0.9) 0%, rgba(242, 246, 255, 0.94) 45%, #edf2fb 100%);
  color: #24324f;
}

.hero {
  padding: 30px 20px 28px;
  text-align: center;
}

.hero-label {
  margin-bottom: 14px;
  color: #4f87ff;
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

.hero-subtitle {
  color: #a4b1c8;
  font-size: 0.92rem;
}

.content-grid {
  width: min(1180px, calc(100% - 48px));
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 2.2fr) minmax(300px, 1fr);
  gap: 18px;
}

.amount-card,
.category-card,
.footer-quote {
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 22px 45px rgba(90, 116, 173, 0.08);
}

.amount-card {
  padding: 58px 30px 34px;
}

.amount-caption {
  text-align: center;
  color: #b0bdd3;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.amount-number {
  display: block;
  text-align: center;
  color: #345ea7;
  font-size: clamp(3rem, 5vw, 4.4rem);
  font-weight: 800;
  letter-spacing: -0.04em;
}

.amount-display {
  margin-top: 16px;
  display: flex;
  justify-content: center;
  overflow: hidden;
}

.quick-amount-panel {
  margin-top: 44px;
  padding: 26px 24px;
  border-radius: 18px;
  background: #f4f7fc;
}

.quick-amount-title {
  margin-bottom: 24px;
  color: #6f7f9c;
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
  border: 1px solid #e3e9f3;
  border-radius: 999px;
  background: #ffffff;
  color: #53637f;
  font-size: 1rem;
  font-weight: 700;
  box-shadow: 0 3px 10px rgba(182, 194, 218, 0.14);
}

.pill-button.primary {
  border-color: #315fab;
  background: #355fa8;
  color: #ffffff;
  box-shadow: 0 10px 20px rgba(59, 99, 173, 0.24);
}

.pill-button {
  cursor: pointer;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    background-color 0.18s ease;
}

.pill-button:hover {
  transform: translateY(-1px);
}

.input-row {
  margin-top: 42px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.field-label {
  color: #b1bdd2;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.field-box {
  min-height: 34px;
  border-radius: 999px;
  background: #f4f7fc;
  padding: 0 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6f809d;
  font-size: 0.92rem;
}

.date-box {
  min-height: 46px;
}

.memo-input {
  min-height: 46px;
  border: none;
  border-radius: 18px;
  background: #f4f7fc;
  padding: 12px 14px;
  color: #6f809d;
  font-size: 0.92rem;
  resize: none;
  outline: none;
}

.memo-input:focus {
  box-shadow: 0 0 0 2px rgba(75, 133, 247, 0.16);
}

.field-icon {
  color: #95a5c2;
  font-size: 1rem;
}

.category-card {
  padding: 24px 24px 22px;
}

.panel-title {
  margin-bottom: 18px;
  color: #5d6e8e;
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
  background: #f7f9fd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #7d8aa3;
  transition:
    background-color 0.2s ease,
    box-shadow 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
  cursor: pointer;
}

.category-button.active {
  background: #ffffff;
  box-shadow:
    inset 0 0 0 2px #4b85f7,
    0 12px 18px rgba(85, 125, 208, 0.14);
  color: #3e74e8;
  animation: category-bounce 0.34s ease;
}

.category-button:hover {
  transform: translateY(-1px);
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

.category-icon.blue {
  color: #ffffff;
  background: #5b95ff;
}

.category-icon.purple {
  color: #8f50ff;
  background: #f7f0ff;
}

.category-icon.green {
  color: #2fa86b;
  background: #edf9f2;
}

.category-icon.gray {
  color: #b2bdd1;
  background: #f0f3f8;
}

.category-button.active .category-icon {
  background: #4b85f7;
  color: #ffffff;
}

@keyframes category-bounce {
  0% {
    transform: scale(0.94);
  }

  55% {
    transform: scale(1.06);
  }

  100% {
    transform: scale(1);
  }
}

.amount-change-enter-active,
.amount-change-leave-active {
  transition:
    transform 0.22s ease,
    opacity 0.22s ease;
}

.amount-change-enter-from {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}

.amount-change-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(1.02);
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
  color: #4f5f7d;
  font-size: 0.96rem;
  font-weight: 700;
}

.question-subtitle {
  margin-bottom: 16px;
  color: #b1bdd0;
  font-size: 0.82rem;
}

.toggle-wrap {
  padding: 4px;
  border-radius: 999px;
  background: #eef2f8;
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
    color 0.2s ease,
    box-shadow 0.2s ease;
}

.toggle-button.active {
  background: #ffffff;
  color: #4280f5;
  box-shadow: 0 6px 14px rgba(75, 133, 247, 0.14);
}

.action-area {
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid #edf1f7;
}

.status-text {
  margin-bottom: 12px;
  color: #4b6fbb;
  font-size: 0.88rem;
  text-align: center;
}

.submit-button {
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 999px;
  background: linear-gradient(90deg, #2f6be8 0%, #67a1ff 100%);
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  box-shadow: 0 14px 24px rgba(72, 122, 228, 0.24);
}

.cancel-button {
  width: 100%;
  margin-top: 12px;
  border: none;
  background: transparent;
  color: #b1b9c7;
  font-size: 0.9rem;
  font-weight: 600;
}

.footer-quote {
  width: min(1180px, calc(100% - 48px));
  margin: 24px auto 18px;
  padding: 38px 24px;
  text-align: center;
  color: #b8c3d5;
  font-size: 0.92rem;
}

@media (max-width: 960px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .content-grid,
  .footer-quote {
    width: min(100% - 24px, 100%);
  }

  .amount-card {
    padding: 34px 18px 24px;
  }

  .quick-amount-grid,
  .input-row,
  .category-grid {
    grid-template-columns: 1fr;
  }
}
</style>
