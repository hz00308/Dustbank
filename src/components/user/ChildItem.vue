<template>
  <div id="child-item">
    <img src="C:\fullstack\skeleton\Dustbank\public\logo.svg" alt="" />
    <div id="name">홍길동</div>
    <div id="balance">100000 원</div>
    <div id="btn-group">
      <router-link class="rlink"><div class="btn1">용돈 주기</div></router-link>
      <div id="btn-line">
        <router-link class="rlink"
          ><div class="btn2">통계 보기</div></router-link
        >
        <router-link class="rlink"
          ><div class="btn2">거래 내역</div></router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup></script>

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
