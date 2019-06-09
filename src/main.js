import Vue from 'vue'
import App from './App'
import { router } from './router'
import HeadNav from '@/components/headNav/HeadNav'
import './common/js/utils'
import api from './common/js/api'
import store from './store'

Vue.component('HeadNav', HeadNav)
Vue.prototype.$api = api // 将api挂载到vue的原型上

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
