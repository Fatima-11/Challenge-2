import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate from 'vee-validate'
import Vuetify from 'vuetify'

import DatetimePicker from 'vuetify-datetime-picker'
import 'vuetify-datetime-picker/src/stylus/main.styl'


 

Vue.use(DatetimePicker)





import navbar from './components/Navbar'


Vue.use(VeeValidate)
Vue.use(Vuetify)


  

Vue.component('navbar', navbar)






Vue.config.productionTip = false


    new Vue({
      router,
      store,
      render: h => h(App),
      }).$mount('#app')

   
