import { checkTokenValidity } from '@/services/user-service'
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
      },
    },
    {
      path: '/panier',
      name: 'panier',
      component: PanierView,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/gestion-client',
      name: 'gestion-client',
      component: GestionClientView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/gestion-commande',
      name: 'gestion-commande',
      component: GestionCommandeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/gestion-plats',
      name: 'gestion-plats',
      component: GestionPlatView,
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach(async (to, from) => {
  console.log('hey')
  if (to.meta.requiresAuth) {
    const cookies = document.cookie.split(';')
    const sidCookie = cookies.find((cookie) => cookie.trim().startsWith('connection.sid='))
    const sid = sidCookie ? sidCookie.split('=')[1] : null

    console.log('SID', sid)

    if (await checkTokenValidity(sid)) {
      return true
    } else {
      router.push('/')
    }
  }

  return true
})

export default router
