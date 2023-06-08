import uniFetch from './uni-fetch'

export default {
  /**
   * 任务列表
   * @param {Object} data - 接口参数
   * @property {string}  data.status - 任务状态
   * @property {string} data.startTime - 任务的起始时间
   * @property {string} data.endTime - 任务的结束时间
   * @property {string} data.endTime - 任务的ID
   * @property {string} data.page - 任务数据对应的页码
   * @property {string} data.pageSize - 每页包含任务数据的条数
   */
  list(data) {
    return uniFetch.get('/driver/tasks/list', data)
  },

  /**
   * 任务详情
   * @@param {string} id - 任务ID
   */
  detail(id = '1665989068002979841') {
    return uniFetch.get(`/driver/tasks/details/${id}`)
  },
}
