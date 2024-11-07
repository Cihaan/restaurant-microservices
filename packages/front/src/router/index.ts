import { isAdmin, isAuthenticated } from '@/services/user-service'
import GestionClientView from '@/views/GestionClientView.vue'
import GestionCommandeView from '@/views/GestionCommandeView.vue'
import GestionPlatView from '@/views/GestionPlatView.vue'
import MenuView from '@/views/MenuView.vue'
import PanierView from '@/views/PanierView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MenuView,
      meta: {
        requiresAuth: false,
        requiresAdmin: false,
      },
    },
    {
      path: '/panier',
      name: 'panier',
      component: PanierView,
      meta: {
        requiresAuth: false,
        requiresAdmin: false,
      },
    },
    {
      path: '/gestion-client',
      name: 'gestion-client',
      component: GestionClientView,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: '/gestion-commande',
      name: 'gestion-commande',
      component: GestionCommandeView,
      meta: {
        requiresAuth: true,
        requiresAdmin: false,
      },
    },
    {
      path: '/gestion-plats',
      name: 'gestion-plats',
      component: GestionPlatView,
      meta: {
        requiresAuth: true,
        requiresAdmin: false,
      },
    },
  ],
})

router.beforeEach(async (to, from) => {
  if (to.meta.requiresAdmin) {
    if (await isAdmin()) {
      return true
    } else {
      router.push('/')
    }
  }

  if (to.meta.requiresAuth) {
    if (await isAuthenticated()) {
      return true
    } else {
      router.push('/')
    }
  }

  return true
})

export default router
