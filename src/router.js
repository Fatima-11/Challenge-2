import Vue from 'vue'
import Router from 'vue-router'


import Login from './views/Login'
import Home from './views/Home'
import Tracker from './views/Tracker.vue'
import Report from './views/Report.vue'

import auth from './modules/auth'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/tracker',
      name: 'Tracker',
      component: Tracker,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/report',
      name: 'Report',
      component: Report,
      meta: {
        requiresAuth: true
      }
    }
    
  ]
})

router.beforeEach((to, from, next) => {
  // check to see if route requires Auth
  if(to.matched.some(rec => rec.meta.requiresAuth)){
    
    if(auth.state.userId){
      // user signed in, proceed to route
      next()
    }else{
      // no user signed in redirect to login page
      next({name: 'Login'})
    }
  }else {
    next()
  }
})

export default router