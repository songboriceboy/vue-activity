/**
 * api 接口管理
 */
import axios from '@/common/js/http'
// 根据需求是否导入qs模块
import qs from 'qs'

// 示例
// return axios.get(`/login`)
// return axios.get(`/login/${id}`, { params: params })
// return axios.post(`/login`, qs.stringify(params))
// return axios.post(`/login`, params)

// 签到模块
const checkin = {
  /**
   * 获取签到规则
   */
  getRules() {
    return axios.get(`/check_in_rule`)
  },

  /**
   * 获取签到记录
   * @param {*} params { date 年月: 2019-06 }
   */
  getCheckin(params) {
    return axios.get(`/check_in`, { params: params })
  },

  /**
   * 会员签到
   * @param {*} params
   */
  postCheckin() {
    return axios.post(`/check_in`)
  },

  /**
   * 奖品列表
   */
  getPrize() {
    return axios.get(`/prize`)
  },

  /**
   * 抽奖
   */
  winPrize() {
    return axios.get(`/win_prize`)
  },

  /**
   * 中奖资料填写
   * @param {*} params { prize_name 奖品名称, prize_img 奖品图片, prize_status 奖品状态, contact_name 小张, contact_phone 电话, province 省, city 市, district 区, address 详细地址 }
 }
   */
  postWinPrize(params) {
    return axios.post(`/winning_info`, qs.stringify(params))
  },

  /**
   * 中奖纪录
   * @param {*} params 查询日期
   */
  getWinRecord(params) {
    return axios.get(`/winning_info`, { params: params })
  }
}

// 活动模块
const activity = {
  /**
   * 活动列表
   * @param {*} params { page 页码, page_size 每页显示数 }
   */
  getActivity(params) {
    return axios.get(`/activity`, { params: params })
  },

  /**
   * 活动详情
   * @param {*} id 活动id
   */
  getActivityDetail(id) {
    return axios.get(`/activity/${id}`)
  },

  /**
   * 活动报名
   * @param {*} params { activity_id 活动id, contact_name 联系人, contact_phone 联系电话, sign_up_reason 申请理由 }
   */
  postActivity(params) {
    return axios.post(`/activity_sign_up`, qs.stringify(params))
  }
}

// 试用模块
const trial = {
  /**
   * 试用列表
   * @param {*} params { page 页码, page_size 每页显示数 }
   */
  getTryUse(params) {
    return axios.get(`/try_use`, { params: params })
  },

  /**
   * 试用详情
   * @param {*} id 试用品id
   */
  getTryUseDetail(id) {
    return axios.get(`/try_use/${id}`)
  },

  /**
   * 试用申请
   * @param {*} params  { use_id	试用活动id, contact_name 小张, contact_phone 电话, province 广东省, city 深圳市, district 福田区 address }
   */
  postTryUse(params) {
    return axios.post(`/try_use`, qs.stringify(params))
  }
}

// 视频模块
const video = {
  /**
   * 视频模块
   * @param {*} params { page 页码, page_size 每页显示数 }
   */
  getVideoModule(params) {
    return axios.get(`/video`, { params: params })
  },

  /**
   * 视频列表
   * @param {*} id 视频模块id
   * @param {*} params { page 页码, page_size 每页显示数 }
   */
  getVideo(id, params) {
    return axios.get(`/video/${id}`, { params: params })
  },

  /**
   * 观看次数
   * @param {*} params { video_id 视频id }
   */
  postWatch(params) {
    return axios.post(`/watch`, qs.stringify(params))
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
    return axios.post(`/topic/comment`, qs.stringify(params))
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
  /**
   * 更新个人信息
   * @param {*} params { avatar 头像地址, name 昵称 }
   */
  patchInfo(params) {
    return axios.patch(`/my/info`, qs.stringify(params))
  },

  /**
   * 我的活动列表
   * @param {*} params { page 页码, page_size 每页显示数 }
   */
  getMyActivity(params) {
    return axios.get(`/my/activity`, { params: params })
  },

  /**
   * 我的活动详情
   * @param {*} id 活动id
   */
  getMyActivityDetail(id) {
    return axios.get(`/my/activity/${id}`)
  },

  /**
   * 我的试用列表
   * @param {*} params { page 页码, page_size 每页显示数 }
   */
  getMyTryUse(params) {
    return axios.get(`/my/try_use`, { params: params })
  },

  /**
   * 我的试用详情
   * @param {*} id 试用产品id
   */
  getMyTryUseDetail(id) {
    return axios.get(`/my/try_use/${id}`)
  },

  /**
   * 我的报告列表
   * @param {*} params { page 页码, page_size 每页显示数 }
   */
  getMyReport(params) {
    return axios.get(`/my/report`, { params: params })
  },

  /**
   * 填写报告
   * @param {*} params { type 1：活动体验报告 2：试用体验报告, type_id 活动id 或 试用id, sign_id 报名的id, content 心得内容, images 图片数组 }
   */
  postReport(params) {
    return axios.post(`/report`, qs.stringify(params))
  },

  /**
   * 意见反馈
   * @param {*} params { user_name 姓名, user_tel 手机号, message 反馈内容 }
   */
  postSuggest(params) {
    return axios.post(`/suggest`, qs.stringify(params))
  },

  /**
   * 关于我们
   */
  getAboutUs() {
    return axios.get(`/about_us`)
  }
}

// 公共接口
const common = {
  /**
   * 分享
   * @param {*} params { type 1：活动 2：试用, type_id 活动id / 试用id }
   */
  share(params) {
    return axios.post(`/share`, qs.stringify(params))
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
    return axios.post(`/zan`, qs.stringify(params))
  },

  /**
   * 体验报告详情
   * @param {*} id 报告id
   */
  getReport(id) {
    return axios.get(`/report/${id}`)
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
