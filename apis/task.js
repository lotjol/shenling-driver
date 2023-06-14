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
   * @param {string} id - 任务ID
   */
  detail(id) {
    if (!id) return
    return uniFetch.get(`/driver/tasks/details/${id}`)
  },

  /**
   * 延迟提货
   * @param {Object} data - 接口参数
   * @property {string} data.id - 任务ID
   * @property {string} data.delayTime - 延迟时间
   * @property {string} data.delayReason - 延迟原因
   */
  delay(data) {
    return uniFetch.put('/driver/tasks/delay', data)
  },

  /**
   * 提货
   * @property {string} id - 任务ID
   * @property {Array} cargoPickUpPictureList - 凭证图片
   * @property {Array} cargoPictureList - 货物图片
   */
  pickup(id, cargoPickUpPictureList, cargoPictureList) {
    return uniFetch.post('/driver/tasks/takeDelivery', {
      id,
      cargoPickUpPictureList,
      cargoPictureList,
    })
  },

  /**
   * 交付
   * @property {string} id - 任务ID
   * @property {string} certificatePictureList - 凭证图片
   * @property {string} deliverPictureList - 货物图片
   */
  deliver(id, certificatePictureList, deliverPictureList) {
    return uniFetch.post('/driver/tasks/deliver', {
      id,
      certificatePictureList,
      deliverPictureList,
    })
  },
}
