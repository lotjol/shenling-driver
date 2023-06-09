import uniFetch from './uni-fetch'

export default {
  /**
   * 消息列表
   * @param {Object} data - 接口参数
   * @property {string} data.contentType - 消息类型
   * @property {string} data.page - 消息数据对应的页码
   * @property {string} data.pageSize - 每页包含消息数据的条数
   */
  list(data) {
    if (!data.contentType) return
    return uniFetch.get('/driver/messages/page', data)
  },
  /**
   * 全部已读
   * @@param {string} contentType - 消息类型
   */
  readall(contentType) {
    if (!contentType) return
    return uniFetch.put(`/driver/messages/readAll/${contentType}`)
  },
}
