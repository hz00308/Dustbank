<template>
  <main class="register-page">
    <section class="card">
      <div class="title-wrap">
        <h1>회원가입</h1>
        <p>티끌저금통에 가입하고 자녀의 용돈을 관리해보세요!</p>
      </div>

      <form class="form" @submit.prevent="submitRegister">
        <label class="field-label" for="regId">아이디</label>
        <input
          id="regId"
          v-model.trim="formId"
          type="text"
          class="text-input"
          maxlength="20"
          placeholder="사용할 아이디를 입력해주세요"
        />

        <label class="field-label" for="regNickname">닉네임</label>
        <input
          id="regNickname"
          v-model.trim="formNickname"
          type="text"
          class="text-input"
          maxlength="12"
          placeholder="닉네임을 입력해주세요"
        />

        <div class="field-group">
          <span class="field-label">아바타 선택</span>
          <div class="icon-list">
            <button
              v-for="icon in parentIcons"
              :key="icon.id"
              type="button"
              class="icon-button"
              :class="{ selected: selectedIconId === icon.id }"
              @click="selectedIconId = icon.id"
            >
              <img :src="icon.src" :alt="`아이콘 ${icon.id}`" />
            </button>
          </div>
        </div>

        <p v-if="errorMessage" class="message error">{{ errorMessage }}</p>

        <div class="action-row">
          <button type="button" class="cancel-btn" @click="goBack">취소</button>
          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            {{ isSubmitting ? '가입 중...' : '가입하기' }}
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const userStore = useUserStore();

const formId = ref('');
const formNickname = ref('');
const selectedIconId = ref(5);
const isSubmitting = ref(false);
const errorMessage = ref('');

const parentIcons = [5, 6, 7, 8].map((id) => ({
  id,
  src: new URL(`../assets/icons/icon${id}.png`, import.meta.url).href,
}));

const goBack = () => {
  router.push({ name: 'Home' });
};

const submitRegister = async () => {
  if (!formId.value) {
    errorMessage.value = '아이디를 입력해주세요.';
    return;
  }
  if (!formNickname.value) {
    errorMessage.value = '닉네임을 입력해주세요.';
    return;
  }

  errorMessage.value = '';
  isSubmitting.value = true;

  try {
    const existing = await userStore.fetchParent(formId.value);
    if (existing) {
      errorMessage.value = '이미 존재하는 아이디입니다.';
      return;
    }

    await userStore.createParent({
      id: formId.value,
      nickname: formNickname.value,
      iconId: selectedIconId.value,
    });

    alert('회원가입이 완료되었습니다! 로그인해주세요.');
    router.push({ name: 'Home' });
  } catch (error) {
    errorMessage.value = error.message || '회원가입 중 문제가 발생했습니다.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f9fb;
}

.card {
  width: min(100%, 560px);
  padding: 42px 32px 36px;
  border-radius: 36px;
  background-color: rgba(255, 255, 255, 0.96);
  box-shadow: 0 24px 50px rgba(101, 123, 151, 0.18);
}

.title-wrap {
  text-align: center;
  margin-bottom: 30px;
}

.title-wrap h1 {
  margin: 0 0 10px;
  color: #303949;
  font-size: clamp(1.7rem, 4vw, 2.1rem);
  font-weight: 800;
  letter-spacing: -0.04em;
}

.title-wrap p {
  margin: 0;
  color: #8a93a3;
  font-size: 0.96rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.field-label {
  color: #5f9ee9;
  font-size: 0.92rem;
  font-weight: 700;
}

.text-input {
  width: 100%;
  border: none;
  border-radius: 999px;
  padding: 18px 22px;
  background-color: #eef2f6;
  color: #2f3644;
  font-size: 1rem;
  outline: none;
}

.text-input::placeholder {
  color: #b0b8c5;
}

.text-input:focus {
  box-shadow: 0 0 0 3px rgba(85, 148, 255, 0.18);
}

.icon-list {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.icon-button {
  width: 100%;
  aspect-ratio: 1 / 1;
  border: none;
  border-radius: 50%;
  background-color: #f1f4f8;
  cursor: pointer;
}

.icon-button img {
  width: 70%;
  height: 80%;
  object-fit: contain;
}

.icon-button.selected {
  background-color: #ffffff;
  box-shadow:
    0 0 0 5px #e9f1ff,
    0 0 0 10px rgba(94, 156, 255, 0.35);
}

.message {
  margin: -6px 0 0;
  font-size: 0.92rem;
}

.error {
  color: #df5a5a;
}

.action-row {
  display: flex;
  gap: 14px;
  margin-top: 4px;
}

.action-row button {
  flex: 1;
  border: none;
  border-radius: 999px;
  padding: 16px 18px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
}

.cancel-btn {
  background-color: #dfe5ec;
  color: #596271;
}

.submit-btn {
  color: #ffffff;
  background: linear-gradient(90deg, #3b7fe5 0%, #69a6ff 100%);
  box-shadow: 0 12px 24px rgba(65, 132, 233, 0.28);
}

.submit-btn:disabled {
  cursor: wait;
  opacity: 0.72;
}

@media (max-width: 640px) {
  .register-page {
    padding: 20px 14px;
  }

  .card {
    padding: 34px 20px 24px;
    border-radius: 28px;
  }

  .icon-list {
    gap: 10px;
  }

  .action-row {
    flex-direction: column;
  }
}
</style>
