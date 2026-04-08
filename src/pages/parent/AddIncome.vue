<template>
  <ParentNav />
  <div class="main">
    <div class="contents">
      <div class="title">
        <div class="subTitle">
          <img src="@/assets/images/plus2.png" alt="plus" />
          <p>INCOME ENTRY</p>
        </div>
        <div class="title">
          <p>용돈 주기</p>
        </div>
        <div class="info">
          <p>올바른 경제 관념의 시작, 지금 자녀에게 용돈을 보내보세요.</p>
        </div>
      </div>

      <div class="left">
        <div class="left-top">
          <p>금액 입력</p>
          <div class="price">
            <span class="won">\</span>
            <input type="number" id="num" placeholder="0" pattern="[0-9]*" />
          </div>
          <div class="priceBtn">
            <div class="btn" @click="addNum(100)"><p>+ 100</p></div>
            <div class="btn" @click="addNum(1000)"><p>+ 1000</p></div>
            <div class="btn" @click="addNum(10000)"><p>+ 10,000</p></div>
            <div class="btn" @click="addNum(100000)"><p>+ 100,000</p></div>
          </div>
        </div>
        <div class="left-bottom">
          <div class="inputBox">
            <div class="categoryBox inputGroup">
              <label for="category">분류</label>
              <select name="category" id="category" class="category">
                <option value="allowance">정기용돈</option>
                <option value="reward">심부름</option>
                <option value="newYearGift">세뱃돈</option>
                <option value="other">기타</option>
              </select>
            </div>
            <div class="date inputGroup">
              <label for="date">날짜</label>
              <input type="date" id="date" />
            </div>
          </div>
          <div class="memoBox">
            <label for="memo">메모</label>
            <input
              type="text"
              placeholder="칭찬 한마디를 남겨주세요."
              id="memo"
            />
          </div>
        </div>
      </div>
      <div class="right">
        <div class="right-top"></div>
        <div class="right-bottom"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ParentNav from '@/components/common/ParentNav.vue';

const addNum = (num) => {
  let input = document.getElementById('num');
  console.log(input);

  let value = Number(input.value) + num;
  input.value = value;
};
</script>

<style scoped>
.body {
}
.main {
  width: 100%;
  padding: 150px 100px;
  background-color: #f7f9fb;
}
.contents {
  width: 1024px;
  margin: 0 auto;
  background-color: gold;
}
.subTitle {
  display: flex;
  flex-direction: row;
}
.subTitle > img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.subTitle > p {
  font-weight: bold;
  color: #2456cc;
}
.title > p {
  font-size: 48px;
}

.left-top {
  width: 560px;
  height: 280px;
  background-color: #ffffff;
  border-radius: 32px;
  padding: 32px;
  margin-bottom: 24px;
}

.left-top > p {
  color: #596064;
  font-weight: 500;
  margin-bottom: 24px;
}

.price {
  height: 100px;
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}
.won {
  font-size: 40px;
  color: #2456cc;
  font-weight: 900;
  margin-right: 15px;
}

#num {
  font-size: 45px;
  font-weight: 900;
  color: #aeb5b9;
  border: none;
  width: 80%;
  outline: none;
  background-color: none;
}

.btn {
  width: 110px;
  height: 40px;
  border-radius: 50px;
  background-color: #f0f4f7;
  margin-right: 10px;
}

.btn > p {
  font-weight: 800;
  font-size: 16px;
  color: #145d42;
}

.left-bottom {
  width: 560px;
  height: 315px;
  background-color: #f0f4f7;
  padding: 32px;
  border-radius: 32px;
}
.inputBox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.inputGroup {
  width: 235px;
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
}

.inputGroup > label {
  font-size: 12px;
  color: #596064;
  margin-bottom: 10px;
}
.inputGroup > select,
.inputGroup > input {
  border: none;
  width: 100%;
  height: 56px;
  border-radius: 30px;
  padding: 5px 20px;
  outline: none;
}

.memoBox {
  width: 495px;
  display: flex;
  flex-direction: column;
}

.memoBox > label {
  font-size: 12px;
  color: #596064;
  margin-bottom: 10px;
}

.memoBox > input {
  border: none;
  width: 100%;
  height: 105px;
  border-radius: 30px;
  padding: 5px 20px;
  outline: none;
}
</style>
