<template>
  <div class="container">
    <ParentNav />
    <div id="dashboard">
      <div>
        <h1>
          안녕하세요,
          <span class="blue">
            {{ userStore.states.parentList[0]?.nickname }} 님
          </span>
        </h1>
        <div class="gray">티끌저금통과 함께 자녀 용돈을 손쉽게 관리하세요.</div>
      </div>

      <ChildList class="child-list" />
    </div>
  </div>
</template>

<script setup>
import ChildList from '@/components/user/ChildList.vue';
import ParentNav from '@/components/common/ParentNav.vue';
import { useUserStore } from '@/stores/user';
import { getParentId } from '@/composables/useParentCookie';

const userStore = useUserStore();
userStore.fetchUserList(getParentId());
</script>

<style scoped>
.container {
  background-color: #f7f9fb;
}
#dashboard {
  background-color: #f7f9fb;
  padding: 4em 8em;
  display: flex;
  flex-direction: column;
  gap: 50px;
  height: calc(100vh-148px);
}
.child-list {
  overflow-x: auto;
  white-space: nowrap;
}
.blue {
  color: #2456cc;
}
.gray {
  color: gray;
}
h1 {
  margin-top: 68px;
  font-weight: 600;
}
</style>
