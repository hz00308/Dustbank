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
      :show-delete="editMode === 'delete'"
    />
    <button class="addChild" @click="addChild">
      <img src="@/assets/images/plus.png" />
    </button>
  </ul>
</template>

<script setup>
import UserChildItem from './UserChildItem.vue';
import UserParentItem from './UserParentItem.vue';
import { useUserStore } from '@/stores/user';
import { useRoute, useRouter } from 'vue-router';
import { getParentId } from '@/composables/useParentCookie';

defineProps({
  editMode: { type: String, default: 'default' },
});

const userStore = useUserStore();

// userStore.fetchUserList();
// console.log('**');
// console.log(userStore.states);

const route = useRoute();
const router = useRouter();
const parentId = route.params.id ?? getParentId();
userStore.fetchUserList(parentId);

const addChild = () => {
  router.push({
    name: 'AddChild',
    // query: { parentId: route.params.id ?? 'momdad' },
    query: { parentId },
  });
};
</script>

<style scoped>
.userList {
  width: 100%;
  display: flex;
  padding: 0;
}
.addChild {
  background-color: white;
  width: 168px;
  height: 168px;
  min-width: 168px;
  border-radius: 50%;
  border-style: dashed;
  border-color: rgb(201, 201, 201);
  cursor: pointer;
}
.addChild > img {
  width: 30px;
  height: 30px;
}
</style>
