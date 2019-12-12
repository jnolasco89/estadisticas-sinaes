import Vue from 'vue'
import App from './App.vue'
import Mapa from './plugins/mapaInteractivo'
import vuetify from './vuetify'
import store from './store'

Vue.config.productionTip = false

Vue.use(Mapa)

new Vue({
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
