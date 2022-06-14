import { createRouter, createWebHistory } from 'vue-router'
import charts from '../views/charts.vue'
import main from '../views/main.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    },
    {
      path: '/charts',
      name: 'charts',
      component: charts
    },
  ]
})

export default router
