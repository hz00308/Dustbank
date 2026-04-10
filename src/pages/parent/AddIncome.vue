<template>
  <ParentNav />
  <div class="main">
    <div class="contents">
      <div class="titleGroup">
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
      <form @submit.prevent="submitForm" class="inputForm">
        <div class="left">
          <div class="left-top box">
            <p>금액 입력</p>
            <div class="price">
              <span class="won">&#8361</span>
              <input type="number" id="amount" placeholder="0" pattern="[0-9]*" v-model.number="transactionData.amount" min="0"/>
            </div>
            <div class="priceBtn">
              <div class="btn" @click="addNum(100)"><p>+ 100</p></div>
              <div class="btn" @click="addNum(1000)"><p>+ 1000</p></div>
              <div class="btn" @click="addNum(10000)"><p>+ 10,000</p></div>
              <div class="btn" @click="addNum(100000)"><p>+ 100,000</p></div>
            </div>
          </div>
          <div class="left-bottom box">
            <div class="inputBox">
              <div class="categoryBox inputGroup">
                <label for="category">분류</label>
                <select name="category" id="category" class="category" v-model="transactionData.category3">
                  <option value="정기용돈">정기용돈</option>
                  <option value="보너스">보너스</option>
                  <option value="세뱃돈">세뱃돈</option>
                  <option value="기타">기타</option>
                </select>
              </div>
              <div class="date inputGroup">
                <label for="date">날짜</label>
                <input type="date" id="date" v-model="dateData.date"/>
              </div>
              <div class="time inputGroup">
                <label for="time">시간</label>
                <div class="time" id="time">
                  <input type="number" id="hour" min="0" max="24" placeholder="00" v-model="dateData.hour">
                  <span> : </span>
                  <input type="number" id="minute" min="0" max="59" placeholder="00" v-model="dateData.minute">
                </div>
              </div>
            </div>
            <div class="memoBox">
              <label for="memo">메모</label>
              <input
                type="text"
                placeholder="칭찬 한마디를 남겨주세요."
                id="memo"
                v-model="transactionData.memo"
              />
            </div>
          </div>
        </div>
        <div class="right">
          <div class="right-top box">
            <div class="childInfo">
              <img id="profileImg" :src="getIconPath(childData.iconId)"/>
              <div class="info">
                <p id="childName">{{ childData.nickname }}</p>
                <div class="currentBalanceBox">
                  <span>현재 잔액 : </span>
                  &#8361<span id="currentBalance">{{ childData.balance }}</span>
                </div>
              </div>
            </div>
            <div class="money">
              <div id="sendAmount">
                <span class="moneyTitle">금액</span>
                <span>&#8361{{ transactionData.amount }}</span>
              </div>
            </div>
            <div class="sendBtnBox">
              <button id="sendBtn" type="submit">용돈 주기</button>
            </div>
          </div>
          <div class="right-bottom box">
            <img src="@/assets/images/idea.png" alt="idea">
            <div class="tip">
              <p><b>Financial Tip</b></p>
              <p>
                아이와 함께 이번 용돈의 사용 계획을 세워보세요
                저축 목표를 함께 설정하면 경제 관념이 더욱 뚜렷해집니다.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import ParentNav from '@/components/common/ParentNav.vue';
import { useTransactionStore } from '@/stores/transaction';
import { useRoute } from 'vue-router';
import {reactive} from 'vue';

const getIconPath = (iconId) => {
  return new URL(`../../assets/icons/icon${iconId}.png`, import.meta.url).href;
};

const addNum = (num) => { 
  // console.log(input);
  const currentAmount = Number(transactionData.amount) || 0;
  transactionData.amount = currentAmount + num;
};

const route = useRoute();
const transactionStore = useTransactionStore();
const childId = route.params.id;

const childData = reactive({
  id: '',
  parentId: '',
  nickname: '',
  iconId: null,
  balance: 0
})

const transactionData = reactive({
  childId: '',
  parentId: '',
  type: "I",
  category1: null,
  category2: null,
  category3: "정기용돈",
  amount: 0,
  date : "",
  createdAt: "",
  memo: "",
});

const dateData = reactive({
  date: '',
  hour: 0,
  minute: 0
});

const initData = async () => {
  await transactionStore.fetchChild(childId);
  await transactionStore.fetchTransactions(childId);
  const child = transactionStore.states.child;

  childData.id = child.id;
  childData.parentId = child.parentId;
  childData.nickname = child.nickname;
  childData.iconId = child.iconId;
  childData.balance = child.balance;

  transactionData.childId = child.id;
  transactionData.parentId = child.parentId;
};
initData();

const formatDate = async () => {
  const hour = String(dateData.hour).padStart(2,'0');
  const minute = String(dateData.minute).padStart(2,'0');

  if(!dateData.date) {
    alert("날짜를 입력해주세요.");
    return false;
  }

  const localDateTime = `${dateData.date}T${hour}:${minute}:00`;
  const isoDate = new Date(localDateTime).toISOString();
  transactionData.date = isoDate;
  transactionData.createdAt = new Date().toISOString();
  return true;
}

const isValid = () => {
  if(!transactionData.amount || transactionData.amount <=0 ) {
    alert("보낼 금액을 정확히 입력해주세요.");
    return false;
  }
  if(!transactionData.category3) {
    alert("카테고리를 선택해주세요.");
    return false;
  }
  return true;
}

const submitForm = async () => {
  const isDateValid = await formatDate();
  if(isValid() && isDateValid){
    const success = await transactionStore.createIncome(transactionData);
    if(success) {
      transactionData.amount = 0;
      transactionData.memo = "";
      transactionData.category = "정기용돈";
      transactionData.date = "";
      transactionData.createdAt = "";

      dateData.date = new Date().toISOString().split('T')[0];
      dateData.hour = 0;
      dateData.minute = 0;
    }
  }
}
</script>

<style scoped>
.main {
  width: 100%;
  background-color: #f7f9fb;
  padding-top: 100px;
  padding-bottom: 50px;
}
.contents {
  width: 1024px;
  margin: 0 auto;
  padding: 48px 24px;
}
.titleGroup {
  margin-bottom: 24px;
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

.inputForm {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.left {
  width: 560px;
  margin: 0;
  padding: 0;
}
.left-top {
  width: 100%;
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

#amount {
  font-size: 45px;
  font-weight: 900;
  color: #aeb5b9;
  border: none;
  width: 80%;
  outline: none;
  background-color: none;
}
.priceBtn {
  display: flex;
  flex-direction: row;
}
.btn {
  width: 110px;
  height: 40px;
  border-radius: 50px;
  background-color: #f0f4f7;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.btn > p {
  font-weight: 800;
  font-size: 16px;
  color: #145d42;
}

.left-bottom {
  width: 100%;
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
  width: 150px;
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
.inputGroup > input
{
  border: none;
  width: 100%;
  height: 56px;
  border-radius: 30px;
  padding: 0 20px;
  outline: none;
  box-sizing: border-box;
}

.inputGroup > .time {
  background-color: #ffffff;
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
}

.inputGroup > .time > input {
  border: none;
  width: 60px;
  text-align: center;
  outline: none;
  box-sizing: border-box;
}
.memoBox {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.memoBox > label {
  font-size: 12px;
  color: #596064;
  margin-bottom: 10px;
}

#memo {
  border: none;
  width: 100%;
  height: 105px;
  border-radius: 30px;
  padding: 5px 20px;
  outline: none;
}

.right-top {
  width: 390px;
  height: 290px;
  background-color: #ffffff;
  border-radius: 32px;
  padding: 32px;
}
.childInfo {
  display: flex;
  align-items: center;
  height: 64px;
  width: 100%;
  margin-bottom: 24px;
}
#profileImg {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 3px solid black;
  margin-right: 16px;
}

#sendAmount {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
}
.moneyTitle {
  color: #596064;
  font-size: 16px;
}
#sendAmount:last-child {
  color: #2C3437;
  font-weight: 700;
  font-size: 20px;
}

#sendBtn {
  background-color: #3765d2;
  color: white;
  width: 325px;
  height: 70px;
  font-size: 18px;
  border-radius: 35px;
  border: none;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.box {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

.right-bottom {
  width: 100%;
  background-color: #feb14623;
  padding: 24px;
  margin-top: 24px;
  border-radius: 32px;
  display: flex;
  justify-content: space-around;
}
.right-bottom > img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.tip {
  width: 290px;
  color: #563500;
}
</style>
