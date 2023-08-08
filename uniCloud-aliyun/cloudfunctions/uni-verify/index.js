'use strict'
exports.main = async (event, context) => {
  // 云函数获取实人认证实例
  const frvManager = uniCloud.getFacialRecognitionVerifyManager({
    requestId: context.requestId,
  })

  const result = await frvManager.getCertifyId({
    realName: event.realName,
    idCard: event.idCard,
    metaInfo: event.metaInfo,
  })

  return result
}
