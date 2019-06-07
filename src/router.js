import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '*',
    redirect: '/index'
  },
  {
    name: 'index',
    component: () => import('./view/checkin/Index'),
    meta: {
      title: '签到'
    }
  },
  {
    name: 'login',
    component: () => import('./view/checkin/Login'),
    meta: {
      title: '授权登录'
    }
  },
  {
    name: 'lottery',
    component: () => import('./view/checkin/Lottery'),
    meta: {
      title: '招行抽奖'
    }
  }
]

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '')
})

const router = new Router({ routes })

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title
  if (title) {
    document.title = title
  }
  next()
})

export { router }
