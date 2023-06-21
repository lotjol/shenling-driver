'use strict'
exports.main = async (event, context) => {
  const frvManager = uniCloud.getFacialRecognitionVerifyManager({
    requestId: context.requestId,
  })

  const result = await frvManager.getCertifyId(event)

  return result
}
