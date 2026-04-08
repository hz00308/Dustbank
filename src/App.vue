<template>
  <!-- <Header />
  <ParentNav />
  <ChildNav />
  <Footer /> -->
  <MyChildStats />
  <router-view />
</template>

<script setup>
import Header from './components/common/Header.vue';
import ParentNav from './components/common/ParentNav.vue';
import ChildNav from './components/common/ChildNav.vue';
import Footer from './components/common/Footer.vue';
import Family from './pages/Family.vue';
import MyChildStats from './pages/parent/MyChildStats.vue';
</script>
