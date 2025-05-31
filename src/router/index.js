import useUserStore from '@/stores/user'
import AboutView from '@/views/AboutView.vue'
import HomeView from '@/views/HomeView.vue'
import ManageView from '@/views/ManageView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    name: 'home',
    path: '/',
    component: HomeView,
  },
  {
    name: 'about',
    path: '/about',
    component: AboutView,
  },
  {
    name: 'manage',
    path: '/manage-music',
    component: ManageView,
    // alias: '/manage',
    beforeEnter: (to, from, next) => {
      console.log('beforeEnter guard for manage')
      next()
    },
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: '/manage',
    redirect: { name: 'manage' },
  },

  {
    path: '/:catchAll(.*)',
    redirect: { name: 'home' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500',
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  // console.log(to.meta)
  if (to.meta.requiresAuth && !userStore.userLoggedIn) {
    next({ name: 'home' })
    return // Add return to prevent multiple next() calls
  }

  next()
})

export default router
