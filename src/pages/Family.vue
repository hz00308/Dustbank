<template>
  <div class="container1">
    <!-- <Header /> -->
    <div class="header"></div>
    <div class="main">
      <div class="titleGroup">
        <p class="maintitle">Welcome,<span>Family</span>.</p>
        <p class="subtitle">
          아이와 함께 가꾸는 우리 가족의 경제지도,<br />
          작은 저축이 큰 꿈이 되는 과정을 한 곳에서 경험하세요.
        </p>
      </div>
      <div class="userGroup">
        <UserList />
      </div>
    </div>
    <!-- <Footer /> -->
    <div class="footer"></div>
  </div>
</template>

<script setup>
import Header from '@/components/common/Header.vue';
import Footer from '@/components/common/Footer.vue';
import UserList from '@/components/user/UserList.vue';
</script>

<style scoped>
.container {
  padding: 0;
  margin: 0;
}
.header {
  height: 68px;
  padding: 16px;
  background-color: black;
}
.main {
  height: calc(100vh - 148px);
}
.footer {
  height: 80px;
  padding: 32px;
  background-color: black;
}

/* css */
.main {
  padding-left: 100px;
}
.titleGroup {
  margin-bottom: 64px;
  width: 100%;
  padding-top: 90px;
}
.maintitle {
  font-weight: 900;
  font-size: 72px;
}
.maintitle > span {
  color: #2456cc;
}
.subtitle {
  margin-top: 10px;
}

.userGroup {
  width: 100%;
  height: 336px;
}
</style>
