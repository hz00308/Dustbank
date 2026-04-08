<template>
  <div>
    <div id="money-container">
      <div class="money-card">
        <div class="money-text">잔액</div>
        <div id="balance" class="money-amount">\ 40000</div>
      </div>
      <div class="money-card">
        <div class="money-text">수입</div>
        <div id="income" class="money-amount">\ 15000</div>
      </div>
      <div class="money-card">
        <div class="money-text">지출</div>
        <div id="expenditure" class="money-amount">\ 8000</div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
#money-container {
  display: flex;
  gap: 2em;
}
.money-card {
  background-color: white;
  width: 347px;
  height: 180px;
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  padding: 32px;
}
.money-text {
  color: gray;
}
.money-amount {
  font-size: 40px;
  font-weight: 700;
}
#balance {
  color: #2456cc;
}
#income {
  color: #256b4f;
}
#expenditure {
  color: #a83836;
}
</style>
