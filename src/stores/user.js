import { defineStore } from 'pinia';
import axios from 'axios';
import { reactive } from 'vue';

export const useUserStore = defineStore('user', () => {
  const protectedChildIds = ['gildong', 'kongsun'];
  const states = reactive({
    childList: [],
    parentList: [],
  });

  const BASEParent = '/api/parents';
  const BASEChild = '/api/children';
  const BASETransaction = '/api/transactions';

  const fetchUserList = async () => {
    try {
      const responseParent = await axios.get(BASEParent);
      const responseChild = await axios.get(BASEChild);
      if (
        (responseParent.status === 200 && responseChild.status === 200) ||
        (responseParent.status === 304 && responseChild.status === 304)
      ) {
        console.log('Parent------');
        console.log(responseParent);
        console.log('Children-----');
        console.log(responseChild);
        states.childList = responseChild.data;
        states.parentList = responseParent.data;
      } else {
        console.error('Error: User 데이터 조회 실패');
      }
    } catch (error) {
      console.error('User data Error: ' + error);
    }
  };

  const createChild = async ({ nickname, iconId, parentId = 'momdad' }) => {
    const trimmedNickname = nickname?.trim();

    if (!trimmedNickname) {
      throw new Error('자녀 이름을 입력해주세요.');
    }

    const childId = `${trimmedNickname}-${Date.now()}`.replace(/\s+/g, '').toLowerCase();
    const newChild = {
      id: childId,
      parentId,
      nickname: trimmedNickname,
      iconId,
      balance: 0,
    };

    const response = await axios.post(BASEChild, newChild);

    if (response.status !== 201) {
      throw new Error('자녀 등록에 실패했습니다.');
    }

    states.childList = [...states.childList, response.data];
    return response.data;
  };

  const deleteChild = async (childId) => {
    if (!childId) {
      throw new Error('삭제할 자녀 정보가 올바르지 않습니다.');
    }

    if (protectedChildIds.includes(childId)) {
      throw new Error('길동이와 콩순이는 삭제할 수 없습니다.');
    }

    const transactionResponse = await axios.get(`${BASETransaction}?childId=${childId}`);
    const deleteTransactions = transactionResponse.data.map((transaction) =>
      axios.delete(`${BASETransaction}/${transaction.id}`)
    );

    await Promise.all(deleteTransactions);

    const response = await axios.delete(`${BASEChild}/${childId}`);

    if (response.status !== 200) {
      throw new Error('자녀 삭제에 실패했습니다.');
    }

    states.childList = states.childList.filter((child) => child.id !== childId);
  };

  console.log('states-----');
  console.log(states);
  return { states, fetchUserList, createChild, deleteChild, protectedChildIds };
});
