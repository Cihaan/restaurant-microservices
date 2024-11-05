import { createRouter, createWebHistory } from 'vue-router';
import PanierView from '@/views/PanierView.vue';
import MenuView from '@/views/MenuView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MenuView
    },
    {
      path: '/panier',
      name: 'panier',
      component: PanierView
    }
  ]
});

export default router;
