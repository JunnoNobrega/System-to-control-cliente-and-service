import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import OsView from '../views/OsView.vue'
import ClientView from '../views/ClienteView.vue'
import UserView from '../views/UserView.vue'
import HomeView from '../views/HomeView.vue'
import axios from 'axios'

function AdminAuth (to, from, next){
  if (localStorage.getItem('token') != undefined) {

    var req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      },
    }
    console.log(req)
    axios.post("http://localhost:8686/validate",{},req).then(res => {
      console.log(res)
      next()
      
    }).catch(err => {
      console.log(err)
      next("/login")
    })
  } else {
    next("/login");
  }
}


const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: AdminAuth,
  },
  {
    path: '/user',
    name: 'user',
    component: UserView,
    beforeEnter: AdminAuth,
  },
  {
    path: '/os',
    name: 'os',
    component: OsView,
    beforeEnter:  AdminAuth,
  },
  {
    path: '/client',
    name: 'client',
    component: ClientView,
    beforeEnter:  AdminAuth,
  },

  

  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
