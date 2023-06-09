import uniFetch from './uni-fetch'

export default {
  /**
   * 用户登录
   * @param {string} account - 用户登录账号
   * @param {string} password - 用户登录密码
   */
  login(account, password) {
    if (!account || !password) return
    return uniFetch.post('/driver/login/account', { account, password })
  },

  /**
   * 个人资料
   */
  profile() {
    return uniFetch.get('/driver/users')
  },

  /**
   * 车辆信息
   */
  truck() {
    return uniFetch.get('/driver/users/truck')
  },

  /**
   * 任务数据
   */
  task() {
    return uniFetch.get('/driver/users/taskReport')
  },
}
