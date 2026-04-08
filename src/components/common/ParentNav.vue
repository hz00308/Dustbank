<template>
  <header class="header">
    <div class="logo">티끌저금통</div>

    <nav class="nav">
      <router-link :to="{ name: 'Home' }">Home</router-link>
      <router-link :to="{ name: 'ParentDashboard' }">Dashboard</router-link>
    </nav>

    <div class="logout">
      <button class="logout-btn">⎋</button>
    </div>
  </header>
</template>

<script setup></script>

<style scoped>
.header {
  position: fixed;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
}

.logo {
  font-size: 22px;
  font-weight: 700;
}

.nav {
  display: flex;
  gap: 40px;
}

.nav a {
  text-decoration: none;
  color: #6b7280;
  font-weight: 500;
}

.nav a.router-link-active {
  color: #2563eb;
  border-bottom: 2px solid #2563eb;
  padding-bottom: 4px;
}

.logout-btn {
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
}
</style>
