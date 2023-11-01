import { createRouter, createWebHistory } from 'vue-router'
import AeropressTimer from '../components/AeropressTimer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/frontend/',
      name: 'home',
      component: AeropressTimer
    },
  ]
})

export default router
