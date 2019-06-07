import Vue from 'vue'
import App from './App'
import { router } from './router'
import HeadNav from '@/components/headNav/HeadNav'
import './common/js/utils'

Vue.component('HeadNav', HeadNav)

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
