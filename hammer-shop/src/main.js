import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from '@/router';
import store from '@/store';

Vue.prototype.axios = axios;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
