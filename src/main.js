import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Flicking from "@egjs/vue-flicking";
import "@egjs/vue-flicking/dist/flicking.css";

Vue.use(Flicking);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

window.axios = axios
window.axios.defaults.baseURL = 'https://api.rawg.io/api/'

window.rawgApiKey = '6ed5fc40052e4c73b71b3461ba00d484'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
