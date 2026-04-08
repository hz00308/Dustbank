<template>
  <ul class="userList">
    <UserParentItem
      v-for="parent in userStore.states.parentList"
      :key="parent.id"
      :parent="parent"
    />
    <UserChildItem
      v-for="child in userStore.states.childList"
      :key="child.id"
      :child="child"
    />
  </ul>
</template>

<script setup>
import UserChildItem from './UserChildItem.vue';
import UserParentItem from './UserParentItem.vue';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();

userStore.fetchUserList();
console.log('**');
console.log(userStore.states);
</script>

<style scoped>
.userList {
  width: 100%;
  display: flex;
}
</style>
