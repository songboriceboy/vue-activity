import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/checkin',
      meta: {
        title: '签到',
        requireAuth: true
      }
    },
    {
      path: '/login',
      component: () => import('./view/login/Login'),
      meta: {
        title: '授权登录',
        requireAuth: false
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
            title: '签到',
            requireAuth: true
          }
        },
        {
          path: '/activity',
          component: () => import('./view/activity/Activity'),
          meta: {
            title: '活动报名',
            requireAuth: true
          }
        },
        {
          path: '/trial',
          component: () => import('./view/trial/Trial'),
          meta: {
            title: '试用',
            requireAuth: true
          }
        },
        {
          path: '/video',
          component: () => import('./view/video/Video'),
          meta: {
            title: '视频',
            requireAuth: true
          }
        },
        {
          path: '/discuss',
          component: () => import('./view/discuss/Discuss'),
          meta: {
            title: '话题讨论',
            requireAuth: true
          }
        },
        {
          path: '/mine',
          component: () => import('./view/mine/Mine'),
          meta: {
            title: '个人中心',
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/lottery',
      component: () => import('./view/checkin/Lottery'),
      meta: {
        title: '招行抽奖',
        requireAuth: true
      }
    },
    {
      path: '/activityDetail',
      component: () => import('./view/activity/Details'),
      meta: {
        title: '活动详情',
        requireAuth: true
      }
    },
    {
      path: '/activityApply',
      component: () => import('./view/activity/Apply'),
      meta: {
        title: '活动报名',
        requireAuth: true
      }
    },
    {
      path: '/trialDetail',
      component: () => import('./view/trial/Details'),
      meta: {
        title: '试用详情',
        requireAuth: true
      }
    },
    {
      path: '/lotteryDetails',
      component: () => import('./view/checkin/Details'),
      meta: {
        title: '资料详情',
        requireAuth: true
      }
    },
    {
      path: '/videoList',
      component: () => import('./view/video/VideoList'),
      meta: {
        title: '视频列表',
        requireAuth: true
      }
    },
    {
      path: '/editInfo',
      component: () => import('./view/mine/EditInfo'),
      meta: {
        title: '编辑信息',
        requireAuth: true
      }
    },
    {
      path: '/about',
      component: () => import('./view/mine/About'),
      meta: {
        title: '联系我们',
        requireAuth: true
      }
    },
    {
      path: '/suggest',
      component: () => import('./view/mine/Suggest'),
      meta: {
        title: '意见反馈',
        requireAuth: true
      }
    }
  ]
})
