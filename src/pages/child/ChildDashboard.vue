<template>
  <div id="container">
    <ChildNav />
    <div id="dashboard">
      <h1>ChildDashboard</h1>
      <Stats />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import ChildNav from '@/components/common/ChildNav.vue';
import Stats from '@/components/transactions/Stats.vue';
import Footer from '@/components/common/Footer.vue';
</script>

<style scoped>
#dashboard {
  background-color: #f7f9fb;
  padding: 4em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  height: calc(100vh-148px);
  margin: 0 auto;
  width: 1260px;
}
h1 {
  margin-top: 68px;
  font-weight: 600;
  width: 100%;
  padding-left: 40px;
}
#container {
  background-color: #f7f9fb;
}
</style>
