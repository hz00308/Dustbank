<template>
  <ParentNav />
  <div id="dashboard">
    <h1>MyChildStats</h1>
    <Stats />
  </div>
  <Footer />
</template>

<script setup>
import ParentNav from '@/components/common/ParentNav.vue';
import Stats from '@/components/transactions/Stats.vue';
import Footer from '@/components/common/Footer.vue';
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
h1 {
  margin-top: 68px;
  font-weight: 600;
}
</style>
