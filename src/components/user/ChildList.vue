<template>
  <div id="child-list">
    <ChildItem
      v-for="child in userStore.states.childList"
      :key="child.id"
      :id="child.id"
      :nickname="child.nickname"
      :balance="child.balance"
      :iconId="child.iconId"
    />
    <router-link :to="{ name: 'AddChild' }" style="text-decoration: none">
      <div id="add-child-card">
        <div id="plus">+</div>
        <div id="add-child-text">자녀 추가하기</div>
        <div id="add-child-desc">
          새 계정을 추가하여 자녀의 용돈을 관리해 보세요.
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import ChildItem from './ChildItem.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
userStore.fetchUserList();
</script>

<style scoped>
#child-list {
  display: flex;
  gap: 2em;
  /* justify-content: center; */
}
#add-child-card {
  width: 360px;
  height: 596px;
  border: 1px dashed gray;
  border-radius: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 16px;
  color: black;
}
#plus {
  width: 96px;
  height: 96px;
  background-color: white;
  border-radius: 50%;
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#add-child-text {
  font-size: 20px;
}
#add-child-desc {
  color: gray;
}
</style>
