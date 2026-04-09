<template>
  <div id="child-item">
    <img :src="getIconPath(iconId)" />
    <div id="name">{{ nickname }}</div>
    <div id="balance">{{ balance }} 원</div>
    <div id="btn-group">
      <!-- 아직 router 수정 중이라 to 속성 없음 -->
      <router-link :to="{ name: 'AddIncome', params: { id } }" class="rlink"
        ><div class="btn1">용돈 주기</div></router-link
      >
      <div id="btn-line">
        <router-link
          :to="{ name: 'MyChildStats', params: { id } }"
          class="rlink"
          ><div class="btn2">통계 보기</div></router-link
        >
        <router-link class="rlink" :to="`/parent/children/${id}/transactions`"
          ><div class="btn2">거래 내역</div></router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['id', 'nickname', 'balance', 'iconId']);

const getIconPath = (iconId) => {
  return new URL(`../../assets/icons/icon${iconId}.png`, import.meta.url).href;
};
</script>

<style scoped>
#child-item {
  background-color: white;
  width: 360px;
  height: 596px;
  border-radius: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}
img {
  width: 150px;
  height: 150px;
  border: 6px double lightgray;
  border-radius: 50%;
}
#name {
  font-size: 2em;
  font-weight: 600;
}
#balance {
  font-size: 2.5em;
  font-weight: 800;
}
#btn-group {
  display: flex;
  flex-direction: column;
  gap: 1em;
}
.btn1 {
  width: 277px;
  height: 56px;
  background-color: #e3e9ed;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn2 {
  width: 130px;
  height: 54px;
  background-color: #f7f9fb;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#btn-group {
  display: flex;
  gap: 16px;
}
#btn-line {
  display: flex;
  gap: 16px;
}
.rlink {
  text-decoration: none;
  color: black;
}
</style>
