<template>
  <li>
    <router-link
      :to="{ name: 'ChildDashboard', params: { id } }"
      style="text-decoration: none"
    >
      <div class="selectedImg">
        <img src="@/assets/images/bear_boy.png" alt="profile" />
      </div>
      <p class="nickname">{{ child.nickname }}</p>
      <p class="role">Children</p>
    </router-link>
  </li>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
const id = 'tyuiopk';

const userStore = useUserStore();
defineProps({
  child: { Type: Object, required: true },
});
</script>

<style scoped>
li {
  list-style: none;
  margin: 0;
  width: 180px;
  height: 260px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin-right: 50px;
}
.selectedImg {
  width: 168px;
  height: 168px;
  border-radius: 50%;
  border: 3px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}
.selectedImg > img {
  width: 152px;
  height: 152px;
  background-color: rgb(255, 218, 238);
  border-radius: 50%;
  margin: 0;
}
.nickname {
  font-size: 20px;
  font-weight: 800;
  width: 100%;
  text-align: center;
  margin-top: 24px;
  margin-bottom: 5px;
  color: black;
}
.role {
  font-size: 12px;
  text-align: center;
  color: #596064;
}
</style>
