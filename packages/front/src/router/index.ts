import { createRouter, createWebHistory } from 'vue-router';
import PanierView from '@/views/PanierView.vue';
import MenuView from '@/views/MenuView.vue';
import GestionClientView from '@/views/GestionClientView.vue';
import GestionCommandeView from '@/views/GestionCommandeView.vue';
import GestionPlatView from '@/views/GestionPlatView.vue';

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
    },
    {
      path: '/gestion-client',
      name: 'gestion-client',
      component: GestionClientView
    },
    {
      path: '/gestion-commande',
      name: 'gestion-commande',
      component: GestionCommandeView
    },
    {
      path: '/gestion-plats',
      name: 'gestion-plats',
      component: GestionPlatView
    }
  ]
});

export default router;
