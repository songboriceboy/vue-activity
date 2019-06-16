/**
 * api 接口管理
 */
import axios from '@/common/js/http'
// 根据需求是否导入qs模块
// import qs from 'qs'

// 示例
// return axios.get(`/login`)
// return axios.get(`/login/${id}`, { params: params })
// return axios.post(`/login`, qs.stringify(params))
// return axios.post(`/login`, params)

// 签到模块
const checkin = {
  // 获取签到规则
  getRules() {
    return axios.get(`/rule`)
  },

  // 获取签到记录
  getCheckin() {
    return axios.get(`/check_in`)
  },

  // 会员签到
  postCheckin(params) {
    return axios.post(`/check_in`, params)
  },

  // 奖品列表
  getPrize() {
    return axios.get(`/prize`)
  },

  // 中将资料填写
  postWinPrize(params) {
    return axios.post(`/win_prize`, params)
  },

  // 中奖纪录
  getWinPrize(params) {
    return axios.get(`/win_prize`, { params: params })
  }
}

// 活动模块
const acticity = {
  // 活动列表
  getActivity() {
    return axios.get(`/activity`)
  },

  // 活动详情
  getActivityDetail(id) {
    return axios.get(`/activity/${id}`)
  },

  // 活动体验报告详情
  getActivityReportDetail(id) {
    return axios.get(`/activity/report/${id}`)
  },

  // 活动报名
  postActivityReportDetail(params) {
    return axios.post(`/activity_sing_in`, params)
  }
}

// 试用模块
const trial = {
  // 试用列表
  getTryUse() {
    return axios.get(`/try_use`)
  },

  // 试用详情
  getTryUseDetail(id) {
    return axios.get(`/try_use/${id}`)
  },

  // 试用体验报告详情
  getTryUseReport(id) {
    return axios.get(`/try_use/report/${id}`)
  },

  // 试用申请
  postTryUse(params) {
    return axios.post(`/try_use`, params)
  }
}

// 视频模块
const video = {
  // 视频模块列表
  getVideoModule() {
    return axios.get(`/video/module`)
  },

  // 视频列表
  getVideoList(id) {
    return axios.get(`/video/module/${id}`)
  },

  // 视频详情
  getVideoDetail(id) {
    return axios.get(`/video/${id}`)
  }
}

// 话题讨论模块
const discuss = {
  //  话题列表
  getTopic() {
    return axios.get(`/topic`)
  },

  //  话题详情
  getTopicDetail(id) {
    return axios.get(`/topic/${id}`)
  },

  //  话题评论列表
  getTopicComment() {
    return axios.get(`/topic/comment`)
  },

  //  添加话题评论
  postTopicComment(params) {
    return axios.get(`/topic/comment`, { params: params })
  },

  //  删除话题评论
  delTopicComment(id) {
    return axios.get(`/topic/comment/${id}`)
  }
}

// 个人中心模块
const mine = {
  // 个人信息
  getInfo() {
    return axios.get(`/my/info`)
  },

  // 更新个人信息
  patchInfo(params) {
    return axios.patch(`/my/info`, params)
  },

  // 我的活动列表
  getMyActivity() {
    return axios.get(`/my/activity`)
  },

  // 我的试用列表
  getMyTryUse() {
    return axios.get(`/my/try_use`)
  },

  // 我的报告列表
  getMyReport() {
    return axios.get(`/my/report`)
  },

  // 填写报告
  postReport(params) {
    return axios.post(`/my/report`, params)
  },

  // 意见反馈
  postSuggest(params) {
    return axios.post(`/my/suggest`, params)
  },

  // 关于我们
  getAboutUs() {
    return axios.post(`/about/us`)
  }
}

// 公共接口
const common = {
  // 分享
  share(params) {
    return axios.post(`/share`, params)
  },

  // 图片上传
  upload(params) {
    return axios.post(`/upload`, params)
  }
}

export default {
  checkin,
  acticity,
  trial,
  video,
  discuss,
  mine,
  common
}
