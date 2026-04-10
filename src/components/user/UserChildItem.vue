<template>
  <li>
    <img
      src="@/assets/images/X.png"
      alt="X"
      type="button"
      class="delete-btn"
      :disabled="isDeleting"
      @click="handleDelete"
    />

    <!--
    <button
      v-if="canDelete"
      type="button"
      class="delete-btn"
      :disabled="isDeleting"
      @click="handleDelete"
    >
      x
    </button>
    -->

    <router-link
      class="child-link"
      :to="{ name: 'ChildDashboard', params: { id: child.id } }"
    >
      <div class="imgBox">
        <img :src="getIconPath(child.iconId)" />
      </div>
      <p class="nickname">{{ child.nickname }}</p>
      <p class="role">Children</p>
    </router-link>
  </li>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const isDeleting = ref(false);

const props = defineProps({
  child: { Type: Object, required: true },
});

// const canDelete = computed(
//   () => !userStore.protectedChildIds.includes(props.child.id)
// );

const handleDelete = async () => {
  // if (!canDelete.value) {
  //   window.alert('길동이와 콩순이는 삭제할 수 없습니다.');
  //   return;
  // }

  const confirmed = window.confirm(
    `"${props.child.nickname}" 자녀를 정말 삭제하시겠습니까?\n삭제하면 관련 정보가 유실되며 되돌릴 수 없습니다.`,
  );

  if (!confirmed) {
    return;
  }

  isDeleting.value = true;

  try {
    await userStore.deleteChild(props.child.id);
    window.alert('성공적으로 삭제가 완료됐습니다.');
  } catch (error) {
    window.alert(error.message || '자녀 삭제 중 문제가 발생했습니다.');
  } finally {
    isDeleting.value = false;
  }
};

const getIconPath = (iconId) => {
  return new URL(`../../assets/icons/icon${iconId}.png`, import.meta.url).href;
};
</script>

<style scoped>
li {
  position: relative;
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
.child-link {
  text-decoration: none;
}
.delete-btn {
  position: absolute;
  top: 20px;
  right: 5px;
  z-index: 2;
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 50%;
  background-color: #ffffff;
  color: #79808b;
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
  box-shadow: 0 8px 18px rgba(42, 52, 70, 0.14);
  cursor: pointer;
}

.delete-btn:disabled {
  cursor: wait;
  opacity: 0.7;
}
.imgBox {
  width: 168px;
  height: 168px;
  border-radius: 50%;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}
.imgBox > img {
  width: 152px;
  height: 152px;
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
