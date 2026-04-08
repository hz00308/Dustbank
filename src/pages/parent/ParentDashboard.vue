<template>
  <ParentNav />
  <div id="dashboard">
    <div>
      <h1>
        안녕하세요,
        <span class="blue">{{ childListStore.states.parentNickname }} 님</span>
      </h1>
      <div class="gray">티끌저금통과 함께 자녀 용돈을 손쉽게 관리하세요.</div>
    </div>

    <ChildList />
  </div>
  <Footer />
</template>

<script setup>
import ChildList from '@/components/user/ChildList.vue';
import ParentNav from '@/components/common/ParentNav.vue';
import Footer from '@/components/common/Footer.vue';
import { useChildListStore } from '@/stores/child';

const childListStore = useChildListStore();
childListStore.fetchParentNickname();
</script>

<style scoped>
#dashboard {
  background-color: #f7f9fb;
  padding: 4em;
  display: flex;
  flex-direction: column;
  gap: 50px;
  height: calc(100vh-148px);
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
