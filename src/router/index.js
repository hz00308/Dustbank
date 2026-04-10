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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/add-child', name: 'AddChild', component: AddChild },
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
          name: 'EditTransaction',
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
          name: 'EditTransaction',
          component: EditTransaction,
        },
      ],
    },
    { path: '/:id', name: 'Family', component: Family },
  ],
});

export default router;
