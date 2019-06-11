import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import './common/js/utils'
import api from './common/js/api'
import store from './store'
import HeadNav from '@/components/headNav/HeadNav'

Vue.config.productionTip = false

Vue.component('HeadNav', HeadNav)
// 将 axios api 挂载到 vue 的原型上
Vue.prototype.$axios = axios
Vue.prototype.$api = api

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
