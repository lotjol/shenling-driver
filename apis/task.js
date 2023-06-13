import uniFetch from './uni-fetch'
import { useUserStore } from '@/stores/user'

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
   * 上传文件
   * @param {string}  filePath - 待上传文件路径
   * @param {string}  type - 上传文件类型
   */
  upload(filePath, type = 'image') {
    const urlMap = { image: '/driver/files/imageUpload' }
    const userStore = useUserStore()

    return new Promise((resolve, reject) => {
      uni.showLoading({ title: '正在上传...', mask: true })
      uni.uploadFile({
        url: uniFetch.baseURL + urlMap[type],
        filePath,
        name: 'file',
        header: {
          Authorization: userStore.token,
        },
        success({ statusCode, data }) {
          if (statusCode !== 200)
            return resolve({ code: statusCode, msg: '上传失败!' })
          resolve(JSON.parse(data))
        },
        fail: reject,
        complete: () => uni.hideLoading(),
      })
    })
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
   * @param {Object} data - 接口参数
   * @property {string} data.id - 任务ID
   * @property {string} data.transportCertificate - 凭证图片
   * @property {string} data.deliverPicture - 货物图片
   */
  delivery(data) {
    if (!data.id) return
    return uniFetch.post('/driver/tasks/deliver', data)
  },
}
