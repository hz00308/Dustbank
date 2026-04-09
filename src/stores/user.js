import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { reactive, computed } from 'vue';

export const useUserStore = defineStore('user', () => {
  const states = reactive({
    childList: [],
    parentList: [],
  });

  const BASEParent = '/api/parents';
  const BASEChild = '/api/children';

  const router = useRouter();

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

  console.log('states-----');
  console.log(states);
  return { states, fetchUserList };
});
