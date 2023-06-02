import uniFetch from './uni-fetch'

export default {
  /**
   * @param {string} account - 用户登录账号
   * @param {string} password - 用户登录密码
   */
  login(account, password) {
    if (!account || !password) return
    return uniFetch.post('/driver/login/account', { account, password })
  },
}
