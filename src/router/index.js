import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'

Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = new Router({
  mode: 'history',
  routes
})
export default router
