<template>
  <header class="header">
    <router-link
      :to="{ name: 'Family', params: { id: parentId } }"
      class="logo"
    >
      티끌저금통
    </router-link>

    <div class="right-group">
      <div v-if="parent" class="profile">
        <img :src="parentIconSrc" alt="프로필" class="profile-img" />
        <span class="profile-name">{{ parent.nickname }}</span>
      </div>
      <div class="logout" @click="logout">
        <img
          src="@/assets/images/logout.png"
          class="logout-btn"
          alt="로그아웃"
        />
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { getParentId, clearParentId } from '@/composables/useParentCookie';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const userStore = useUserStore();
const parentId = getParentId();

const parent = computed(() => userStore.states.parentList[0]);

const parentIconSrc = computed(() => {
  const iconId = parent.value?.iconId ?? 5;
  return new URL(`../../assets/icons/icon${iconId}.png`, import.meta.url).href;
});

const logout = () => {
  clearParentId();
  router.push('/');
};
</script>

<style scoped>
.header {
  position: fixed;
  height: 68px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  z-index: 10;
}

.logo {
  font-size: 22px;
  font-weight: 700;
  text-decoration: none;
  color: #2563eb;
}

.right-group {
  display: flex;
  align-items: center;
  gap: 16px;
}

.profile {
  display: flex;
  align-items: center;
  gap: 10px;
}

.profile-img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: contain;
  background-color: #f1f4f8;
}

.profile-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: #303949;
}

.logout {
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logout-btn {
  width: 20px;
}
</style>
