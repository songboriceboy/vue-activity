import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '*',
    redirect: '/checkin'
  },
  {
    path: '/login',
    component: () => import('./view/login/Login'),
    meta: {
      title: '授权登录'
    }
  },
  {
    path: '',
    component: () => import('./view/content/Index.vue'),
    children: [
      {
        path: '/checkin',
        component: () => import('./view/checkin/Checkin.vue'),
        meta: {
          title: '签到'
        }
      },
      {
        path: '/activity',
        component: () => import('./view/activity/Activity'),
        meta: {
          title: '活动报名'
        }
      },
      {
        path: '/trial',
        component: () => import('./view/trial/Trial'),
        meta: {
          title: '试用'
        }
      },
      {
        path: '/video',
        component: () => import('./view/video/Video'),
        meta: {
          title: '视频'
        }
      },
      {
        path: '/discuss',
        component: () => import('./view/discuss/Discuss'),
        meta: {
          title: '话题讨论'
        }
      },
      {
        path: '/mine',
        component: () => import('./view/mine/Mine'),
        meta: {
          title: '个人中心'
        }
      }
    ]
  },
  {
    path: '/lottery',
    component: () => import('./view/checkin/Lottery'),
    meta: {
      title: '招行抽奖'
    }
  },
  {
    path: '/lotteryDetails',
    component: () => import('./view/checkin/Details'),
    meta: {
      title: '资料详情'
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

  // 登录状态
  // const token = localStorage.getItem()
  next()
})

export { router }
