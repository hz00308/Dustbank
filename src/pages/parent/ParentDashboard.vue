<template>
  <div id="dashboard">
    <div>
      <h1>안녕하세요, <span class="blue">ooo님</span></h1>
      <div class="gray">티끌저금통과 함께 자녀 용돈을 손쉽게 관리하세요.</div>
    </div>

    <ChildList />
  </div>
</template>

<script setup>
import ChildList from '@/components/user/ChildList.vue';
</script>

<style scoped>
#dashboard {
  background-color: #eaeff2;
  padding: 4em;
  display: flex;
  flex-direction: column;
  gap: 50px;
}
.blue {
  color: #2456cc;
}
.gray {
  color: gray;
}
</style>
