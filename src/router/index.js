import { createRouter, createWebHistory } from 'vue-router';
import AddExpenditure from '@/pages/child/AddExpenditure.vue';
import ChildDashboard from '@/pages/child/ChildDashboard.vue';
import ChildTransactions from '@/pages/child/ChildTransactions.vue';
import AddChild from '@/pages/parent/AddChild.vue';
import AddIncome from '@/pages/parent/AddIncome.vue';
import MyChildStats from '@/pages/parent/MyChildStats.vue';
import MyChildTransactions from '@/pages/parent/MyChildTransactions.vue';
import ParentDashboard from '@/pages/parent/ParentDashboard.vue';
import Family from '@/pages/Family.vue';
import Home from '@/pages/Home.vue';
import EditTransaction from '@/pages/EditTransaction.vue';
import Register from '@/pages/Register.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/register', name: 'Register', component: Register },
    { path: '/addChild', name: 'AddChild', component: AddChild },
    {
      path: '/parent',
      name: 'ParentDashboard',
      component: ParentDashboard,
    },
    {
      path: '/parent/children/:id/stats',
      name: 'MyChildStats',
      component: MyChildStats,
    },
    {
      path: '/parent/children/:id/income',
      name: 'AddIncome',
      component: AddIncome,
    },
    {
      path: '/parent/children/:id/transactions',
      name: 'MyChildTransactions',
      component: MyChildTransactions,
      children: [
        {
          path: ':tid/edit',
          name: 'EditTransactionParent',
          component: EditTransaction,
        },
      ],
    },
    { path: '/child/:id', name: 'ChildDashboard', component: ChildDashboard },
    {
      path: '/child/:id/expenditure',
      name: 'AddExpenditure',
      component: AddExpenditure,
    },
    {
      path: '/child/:id/transactions',
      name: 'ChildTransactions',
      component: ChildTransactions,
      children: [
        {
          path: ':tid/edit',
          name: 'EditTransactionChild',
          component: EditTransaction,
        },
      ],
    },
    { path: '/:id', name: 'Family', component: Family },
  ],
});

import { getParentId } from '@/composables/useParentCookie';

// 페이지 이동 전 항상 실행
router.beforeEach((to) => {
  if (to.name === 'Home' || to.name === 'Register') return true;
  // 쿠키에 parentId가 없다면 강제로 'Home'으로 이동
  if (!getParentId()) return { name: 'Home' };
  return true;
});

export default router;
