import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BasicView from '../views/BasicViewNew.vue'

const routes = [
  {
    path: '/module1',
    name: 'home',
    component: HomeView
  },
  {
    path: '/',
    name: 'basic',
    component: BasicView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutViewBasic.vue')
  },
  {
    path: '/about/physics',
    name: 'aboutphysics',
    component: () => import('../views/BarChart.vue')
  },
  {
    path: '/about/logic',
    name: 'aboutlogic',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/module3',
    name: 'module3',
    component: () => import('../views/ModuleView3.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
