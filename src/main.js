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

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title
  if (title) {
    document.title = title
  }

  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    if (localStorage.getItem('token')) {
      // 通过vuex state获取当前的token是否存在
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
