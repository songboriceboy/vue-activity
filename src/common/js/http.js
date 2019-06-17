/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios'
import router from '../../router'
import store from '../../store/index'
import { Toast } from 'vant'

/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
  Toast({
    message: msg,
    duration: 1000,
    forbidClick: true
  })
}

/**
 * 跳转登录页
 */
const toLogin = () => {
  router.replace({
    path: '/login'
  })
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin()
      break
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      tip('授权登录失效，请重新授权登录')
      // localStorage.removeItem('token')
      store.commit('setToken', null)
      setTimeout(() => {
        toLogin()
      }, 1000)
      break
    // 404请求不存在
    case 404:
      tip('请求的资源不存在!')
      break
    default:
      console.log(other)
  }
}

// 创建axios实例
var instance = axios.create({ timeout: 1000 * 12 })
// 设置post请求头
instance.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  config => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    const token = store.state.token
    token && (config.headers.Authorization = token)
    return config
  },
  error => Promise.error(error)
)

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => (res.status === 200 ? Promise.resolve(res) : Promise.reject(res)),
  // 请求失败
  error => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message)
      return Promise.reject(response)
    }
  }
)

/**
 * 获取 token 和用户信息
 */
const postTokenInfo = (code, next) => {
  axios.post('/login', { code }).then(res => {
    const result = res.data
    if (result) {
      if (result.errorCode === 0) {
        // 设置 vuex 状态值
        let token = result.data.token.accessToken
        let openid = result.data.user.openid
        store.commit('setToken', token)
        store.commit('setOpenid', openid)
        // 设置缓存
        localStorage.setItem('token', token)
        localStorage.setItem('openid', openid)
        next()
      } else {
        tip(result.message)
        next({
          path: '/login'
        })
      }
    }
  })
}

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 获取 code
  const code = to.query.code
  if (code) {
    // 获取用户信息和 token
    postTokenInfo(code, next)
  } else {
    // 临时注释
    if (!code && to.meta.requireAuth) {
      // 判断该路由是否需要登录权限
      if (localStorage.getItem('token')) {
        next()
      } else {
        // 设置状态
        store.commit('setLoginGo', to.fullPath)
        // 设置缓存
        localStorage.setItem('afterLoginGo', to.fullPath)
        next({
          path: '/login'
        })
      }
    } else {
      next()
    }
  }
})

export default instance
