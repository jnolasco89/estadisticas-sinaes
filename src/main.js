import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Mapa from './plugins/mapaInteractivo'
import axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$http=axios

Vue.use(Vuetify,{
  theme: {
      primary: "#962082",
      secondary: "#e57373",
      accent: "#9c27b0",
      error: "#f44336",
      warning: "#ffeb3b",
      info: "#2196f3",
      success: "#4caf50"
    }
})
Vue.use(Mapa)

new Vue({
  render: h => h(App),
}).$mount('#app')
