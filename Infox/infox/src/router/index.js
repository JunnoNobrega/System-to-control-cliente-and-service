import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import OsView from '../views/OsView.vue'
import HomeView from '../views/HomeView.vue'
import UserView from '../views/UserView.vue'


const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/user',
    name: 'user',
    component: UserView
  },
  {
    path: '/os',
    name: 'os',
    component: OsView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
