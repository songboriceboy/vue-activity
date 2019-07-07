/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios'
import router from '../../router'
import store from '../../store/index'
import { Toast } from 'vant'
import qs from 'qs'

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
  store.commit('setToken', '')
  store.commit('setUserInfo', '')
  try {
    setTimeout(() => {
      router.replace({
        path: '/login'
      })
    }, 1500)
  } catch (e) {
    tip(e)
  }
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
      toLogin()
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
var instance = axios.create({
  baseURL: 'https://merchants.lzdu.com/api',
  timeout: 1000 * 12,
  withCredentials: true
})
// 设置post请求头
instance.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=utf-8'

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
    // 测试
    // const token =
    //   'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbWVyY2hhbnRzLmx6ZHUuY29tXC9hcGlcL2NoZWNrX2luIiwiaWF0IjoxNTYyNDgyODUzLCJleHAiOjE1NjI1MTIwMzcsIm5iZiI6MTU2MjUwNDgzNywianRpIjoiMXl3Nkg2eFhxOUlVY0ZORSIsInN1YiI6MiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.LwuRgzSxNz-Drg2CUiwsEvASeiKmwrx2BMaLODzC90U'
    // store.commit(
    //   'setUserInfo',
    //   JSON.stringify({
    //     name: '种子的信仰之八月',
    //     sex: 1,
    //     avatar:
    //       'http://food.resource.lzdu.com/apply/ThPbr5rWIGN4nmK2OP4686vG0VnNoOKEfP5HPtUz.png',
    //     openid: 'oT9bx04CfaPT5d4FdjXRy0oUbrjo'
    //   })
    // )
    const token = store.state.token
    token && (config.headers.Authorization = token)
    store.commit('setToken', token)
    return config
  },
  error => Promise.error(error)
)

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => {
    // 判断一下响应中是否有 token，如果有就直接使用此 token 替换掉本地的 token。你可以根据你的业务需求自己编写更新 token 的逻辑
    let token = res.headers.authorization
    if (token) {
      // 如果 header 中存在 token，那么就替换本地的 token
      store.commit('setToken', token)
    }
    const code = res.data.errorCode
    if (res.status === 200) {
      let message = res.data.message
      let blacklisted = 'The token has been blacklisted'
      let notBeParesed = 'Token could not be parsed from the request.'
      if (message === blacklisted || message === notBeParesed) {
        tip('身份信息已过期, 请重新登录!')
        toLogin()
      } else if (code && code === 2) {
        tip('您的账号已被冻结!')
        toLogin()
      } else if (code && code === 401) {
        tip('身份信息已过期, 请重新登录!')
        toLogin()
      } else {
        return Promise.resolve(res.data)
      }
    } else {
      return Promise.reject(res)
    }
  },
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
  instance.post('/login', qs.stringify({ code })).then(res => {
    const code = res ? res.errorCode : ''
    if (code === 0) {
      // 设置 vuex 状态值
      let token = res.data.token.accessToken
      let userInfo = res.data.user
      store.commit('setToken', token)
      store.commit('setUserInfo', JSON.stringify(userInfo))
      next()
    } else if (code && code === 2) {
      tip('您的账号已被冻结!')
      store.commit('setToken', '')
      store.commit('setUserInfo', '')
    } else {
      tip(res.message)
      next({
        path: '/login'
      })
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
    if (localStorage.token) {
      // 防刷新
      next()
    } else {
      // 获取用户信息和 token
      postTokenInfo(code, next)
    }
  } else {
    if (to.meta.requireAuth) {
      // 测试
      // if (0 && to.meta.requireAuth) {
      // 判断该路由是否需要登录权限
      if (localStorage.getItem('token')) {
        next()
      } else {
        // 设置状态
        store.commit('setLoginGo', to.fullPath)
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
