

import Vue from 'vue'
import Vuex from 'vuex'



Vue.use(Vuex)


// modules
import auth from './modules/auth'
import menuItems from './modules/menuItems'
import foodLogs from './modules/foodLogs'

export default new Vuex.Store({
  modules: {
    auth,
    menuItems,
    foodLogs
  },
  state: {
    
  },
  mutations: {
    
  },
  actions: {
    
    
    },
  getters: {
    
    
  }
})
