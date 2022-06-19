import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect:'/CommentPage'
  },
  {
    path: '/:pathMatch(.*)',
    redirect:'/CommentPage'
  },
  {
    path: '/CommentPage',
    name: 'CommentPage',
    component: () => import('../views/CommentPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
