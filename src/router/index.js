import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },

  {
    path: '/catalog',
    name: 'Catalog',
    component: () => import('../views/catalog')
  },

  {
    path: '/game',
    name: 'Game',
    component: () => import('../views/game.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
