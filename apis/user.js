// 引入网络请求模块
import { uniFetch } from './uni-fetch'

export default {
  /**
   * @param {Object} data 用户账号和用户密码
   */
  login(data) {
    if (!data.account || !data.password) return
    return uniFetch.post('/driver/login/account', data)
  },

  /**
   * 个人资料
   */
  profile() {
    return uniFetch.get('/driver/users')
  },

  /**
   * 任务数据
   * @param {string} year - 任务数据的年份
   * @param {string} month - 任务数据的月份
   */
  task(year, month) {
    return uniFetch.get('/driver/users/taskReport', { year, month })
  },

  /**
   * 车辆信息
   */
  truck() {
    return uniFetch.get('/driver/users/truck')
  },
}
