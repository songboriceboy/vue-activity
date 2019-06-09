/**
 * api 接口管理
 */
import axios from './http' // 导入http中创建的axios实例
// import qs from 'qs' // 根据需求是否导入qs模块

// 示例
// return axios.get(`/api/login`)
// return axios.get(`/api/login/${id}`, { params: params })
// return axios.post(`/api/login`, qs.stringify(params))
// return axios.post(`/api/login`, params)

// 授权登录部分
const login = {
  //  授权登录
  login(params) {
    return axios.post(`/api/login`, params)
  }
}

// 签到模块
const checkin = {
  // 获取签到规则
  getRules() {
    return axios.get(`/api/rule`)
  },

  // 获取签到记录
  getCheckin() {
    return axios.get(`/api/check_in`)
  },

  // 会员签到
  postCheckin(params) {
    return axios.post(`/api/check_in`, params)
  },

  // 奖品列表
  getPrize() {
    return axios.get(`/api/prize`)
  },

  // 中将资料填写
  postWinPrize(params) {
    return axios.post(`/api/win_prize`, params)
  },

  // 中奖纪录
  getWinPrize(params) {
    return axios.get(`/api/win_prize`, { params: params })
  }
}

// 活动模块
const acticity = {
  // 活动列表
  getActivity() {
    return axios.get(`/api/activity`)
  },

  // 活动详情
  getActivityDetail(id) {
    return axios.get(`/api/activity/${id}`)
  },

  // 活动体验报告详情
  getActivityReportDetail(id) {
    return axios.get(`/api/activity/report/${id}`)
  },

  // 活动报名
  postActivityReportDetail(params) {
    return axios.post(`/api/activity_sing_in`, params)
  }
}

// 试用模块
const trial = {
  // 试用列表
  getTryUse() {
    return axios.get(`/api/try_use`)
  },

  // 试用详情
  getTryUseDetail(id) {
    return axios.get(`/api/try_use/${id}`)
  },

  // 试用体验报告详情
  getTryUseReport(id) {
    return axios.get(`/api/try_use/report/${id}`)
  },

  // 试用申请
  postTryUse(params) {
    return axios.post(`/api/try_use`, params)
  }
}

// 视频模块
const video = {
  // 视频模块列表
  getVideoModule() {
    return axios.get(`/api/video/module`)
  },

  // 视频列表
  getVideoList(id) {
    return axios.get(`/api/video/module/${id}`)
  },

  // 视频详情
  getVideoDetail(id) {
    return axios.get(`/api/video/${id}`)
  }
}

// 话题讨论模块
const discuss = {
  //  话题列表
  getTopic() {
    return axios.get(`/api/topic`)
  },

  //  话题详情
  getTopicDetail(id) {
    return axios.get(`/api/topic/${id}`)
  },

  //  话题评论列表
  getTopicComment() {
    return axios.get(`/api/topic/comment`)
  },

  //  添加话题评论
  postTopicComment(params) {
    return axios.get(`/api/topic/comment`, params)
  },

  //  删除话题评论
  delTopicComment(id) {
    return axios.get(`/api/topic/comment/${id}`)
  }
}

// 个人中心模块
const mine = {
  // 个人信息
  getInfo() {
    return axios.get(`/api/my/info`)
  },

  // 更新个人信息
  putInfo(params) {
    return axios.put(`/api/my/info`, params)
  },

  // 我的活动列表
  getMyActivity() {
    return axios.get(`/api/my/activity`)
  },

  // 我的试用列表
  getMyTryUse() {
    return axios.get(`/api/my/try_use`)
  },

  // 我的报告列表
  getMyReport() {
    return axios.get(`/api/my/report`)
  },

  // 填写报告
  postReport(params) {
    return axios.post(`/api/my/report`, params)
  },

  // 意见反馈
  postSuggest(params) {
    return axios.post(`/api/my/suggest`, params)
  },

  // 关于我们
  getAboutUs() {
    return axios.post(`/api/about/us`)
  }
}

// 公共接口
const common = {
  // 分享
  share(params) {
    return axios.post(`/api/share`, params)
  }
}

export default {
  login,
  checkin,
  acticity,
  trial,
  video,
  discuss,
  mine,
  common
}
