import Vue from 'vue'
import axios from 'axios'
import router from '../router'
//import https from 'https'

Vue.http = axios;

Vue.use( axios)

const instance = axios.create({
    baseURL: 'https://api.test.phoodsolutions.com',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const state = {
    feedback: null,
    sessionId: null,
    userId: null, 
    locationId: null,
  }

  const mutations = {
    // change feedback value
    Setfeedback(state,payload){
        state.feedback = payload
      },
      userAuth (state, payload) {
        state.sessionId = payload.sessionId
        state.userId = payload.userId
        state.locationId = payload.locationId
        
      },
      // for logout the user
      clearAuth (state) {
        state.sessionId = null
        state.userId = null
      },
  }

  const actions = {
    userLogin({commit}, payload){
      
      
        if (payload.username && payload.password){
          axios.post('https://api.test.phoodsolutions.com/auth/login', {
           
            headers: {
              'Content-Type': 'application/json',
            },
            //httpsAgent: new https.Agent({ rejectUnauthorized: false }),
            username: payload.username,
            password: payload.password
          
           }).then((res) => {
             //console.log (res)
              commit('userAuth', {
              userId: res.data.user.id,
              sessionId: res.headers.authorization,
              locationId: res.data.roles[0].locationEntityId //instead of typing it
              },
            instance.defaults.headers.common['authorization'] = res.headers.authorization
            
            )
                
                router.push({ name: 'Home'})
                commit('Setfeedback', null)
            }).catch((err) => {
                console.log(err.message)
            })
  
            
        }else{
          commit('Setfeedback', 'All the fields are required') 
        }  
      },
      
       userLogout({commit}) {
         
        instance.post('/auth/logout')
        .then (() => {
              commit('clearAuth')
              router.push ('/login')
        })
       }
    }

  const getters = {
    feedback (state) {
        return state.feedback
      },
      // check if the user is authenticated (for navbar)
      isauthenticated (state) {
        return state.userId !== null
      },
  }

  export default {
    instance,
    state,
    mutations,
    actions,
    getters
}