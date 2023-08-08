// 引入网络请求模块
import { uniFetch } from './uni-fetch'

export default {
  /**
   * 任务列表
   * @param {number} status - 任务状态
   * @param {string} page - 数据页码
   * @param {string} pageSize - 每页数据条件
   */
  list(status, page = 1, pageSize = 10) {
    return uniFetch.get('/driver/tasks/list', { status, page, pageSize })
  },

  /**
   * 任务详情
   * @param {string} id - 任务ID
   */
  detail(id) {
    if (!id) return
    return uniFetch.get(`/driver/tasks/details/${id}`)
  },

  /**
   * 延迟提货
   * @param {Object} data - 接口参数
   */
  delay(data) {
    if (!data.id) return
    return uniFetch.put('/driver/tasks/delay', data)
  },

  /**
   * 提货
   * @property {Object} data - 接口参数
   */
  pickup(data) {
    if (!data.id) return
    return uniFetch.post('/driver/tasks/takeDelivery', data)
  },

  /**
   * 上报异常
   * @param {Object} data - 接口数据
   */
  except(data) {
    return uniFetch.post('/driver/tasks/reportException', data)
  },

  /**
   * 交付
   * @property {Object} data - 接口参数
   */
  deliver(data) {
    if (!data.id) return
    return uniFetch.post('/driver/tasks/deliver', data)
  },

  /**
   * 回车登记
   * @param {Object} data - 接口数据
   */
  record(data) {
    if (!data.id) return
    return uniFetch.post('/driver/tasks/truckRegistration', data)
  },
}
