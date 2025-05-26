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

export default router
