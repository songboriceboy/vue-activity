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
    return axios.get(`/check_in_rule`)
  },

  // 获取签到记录
  getCheckin(params) {
    return axios.get(`/check_in`, { params: params })
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
    return axios.post(`/winning_info`, params)
  },

  // 中奖纪录
  getWinPrize(id) {
    return axios.get(`/winning/${id}`)
  }
}

// 活动模块
const activity = {
  // 活动列表
  getActivity(params) {
    return axios.get(`/activity`, { params: params })
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
  getVideoModule(params) {
    return axios.get(`/video`, { params: params })
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
  /**
   * 获取话题列表
   * @param {*} params { page 页码, page_size 每页显示数 }
   */
  getTopic(params) {
    return axios.get(`/topic`, { params: params })
  },

  /**
   * 获取话题详情
   * @param {*} id 话题id
   */
  getTopicDetail(id) {
    return axios.get(`/topic/${id}`)
  },

  /**
   * 添加话题评论
   * @param {*} params { topic_id 话题id, comment 评论内容 }
   */
  postTopicComment(params) {
    return axios.post(`/topic/comment`, params)
  },

  /**
   * 删除话题评论
   * @param {*} id 评论 id
   */
  delTopicComment(id) {
    return axios.delete(`/topic/comment/${id}`)
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
    return axios.post(`/report`, params)
  },

  /**
   * 意见反馈
   * @param {*} params { user_name 姓名, user_tel 手机号, message 反馈内容 }
   */
  postSuggest(params) {
    return axios.post(`/suggest`, params)
  },

  // 关于我们
  getAboutUs() {
    return axios.get(`/about_us`)
  }
}

// 公共接口
const common = {
  // 分享
  share(params) {
    return axios.post(`/share`, params)
  },

  /**
   * 图片上传
   * @param {*} params { images [] }
   */
  upload(params) {
    return axios.post(`/upload`, params, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  /**
   * 点赞
   * @param {*} params { type 1：活动报告 2：试用报告 3：话题评论, type_id: 数据 id }
   */
  likes(params) {
    return axios.post(`/zan`, params)
  }
}

export default {
  checkin,
  activity,
  trial,
  video,
  discuss,
  mine,
  common
}
