<template>
  <div class="background">
    <FamilyNav />
    <!-- <div class="header"></div> -->
    <div class="contents">
      <div class="top">
        <div class="titleGroup">
          <p class="maintitle">Welcome, <span>Family</span></p>
          <p class="subtitle">
            아이와 함께 가꾸는 우리 가족의 경제지도,<br />
            작은 저축이 큰 꿈이 되는 과정을 한 곳에서 경험하세요.
          </p>
        </div>
        <div class="mode-toggle">
          <button
            :class="{ active: editMode === 'default' }"
            @click="editMode = 'default'"
          >
            기본
          </button>
          <button
            :class="{ active: editMode === 'delete' }"
            @click="editMode = 'delete'"
          >
            삭제
          </button>
        </div>
      </div>
      <div class="userGroup">
        <UserList :edit-mode="editMode" />
      </div>
      <div class="msg">
        <div class="msgBox">
          <img src="@/assets/images/notofication.png" alt="alert" />
          <span>10대들의 평균 용돈은 <b>100,000원</b>입니다!</span>
        </div>
      </div>
    </div>

    <Footer />
    <!-- <div class="footer"></div> -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
import FamilyNav from '@/components/common/FamilyNav.vue';
import Footer from '@/components/common/Footer.vue';
import UserList from '@/components/user/UserList.vue';

const editMode = ref('default');
</script>

<style scoped>
.background {
  background-color: #f7f9fb;
}
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.contents {
  width: 1260px;
  margin: 0 auto;
  padding: 100px;
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

.mode-toggle {
  display: flex;
  background: #e9ecf1;
  border-radius: 12px;
  padding: 3px;
  width: fit-content;
  margin-bottom: 24px;
}

.mode-toggle button {
  border: none;
  background: transparent;
  padding: 8px 24px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  color: #8b95a1;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.mode-toggle button.active {
  background: white;
  color: #2f2f33;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.mode-toggle button:last-child.active {
  color: #e74c3c;
}

.userGroup {
  width: 100%;
  margin-bottom: 50px;
  overflow-x: auto;
  white-space: nowrap;
}

.msg {
  width: 100%;
  display: flex;
  justify-content: center;
}
.msgBox {
  width: 70vw;
  height: 80px;
  background-color: rgba(185, 185, 185, 0.2);
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.msgBox > img {
  width: 20px;
  margin-right: 30px;
}
</style>
