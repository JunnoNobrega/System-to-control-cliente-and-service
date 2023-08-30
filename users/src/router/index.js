import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from '../views/RegisterView.vue'
import Login from '../views/LoginView.vue'
import Users from '../views/UsersView'
import axios from 'axios';

import Edit from '../views/EditView'


function AdminAuth(to, from, next){

  if(localStorage.getItem('token') != undefined){

    var req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
        
      }
    }

    console.log(req);
    axios.post("http://localhost:8686/validate", {},req).then(res =>{
    
      console.log(res);
      next();

    }).catch(err =>{
      next("/login");
      console.log(err.response);
    });

  }else{
    next("/login");
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/admin/users',
    name: 'Users',
    component: Users,
    beforeEnter: AdminAuth
  },
  {
     path: '/register',
     name: "Register",
     component: Register,
     beforeEnter: AdminAuth
  },
  {
      path: '/login',
      name: 'login',
      component: Login,
      
  },
  {
    path: '/admin/users/edit/:id',
    name: 'UserEdit',
    component: Edit,
    beforeEnter: AdminAuth
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
