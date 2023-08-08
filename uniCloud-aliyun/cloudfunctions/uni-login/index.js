// 在云函数中获取
'use strict'
exports.main = async (event, context) => {
  // event里包含着客户端提交的参数
  const res = await uniCloud.getPhoneNumber({
    appid: context.APPID, // 替换成自己开通一键登录的应用的DCloud appid
    provider: 'univerify',
    apiKey: 'fc7aa3fb2672f947a501f2392a22501a', // 在开发者中心开通服务并获取apiKey
    apiSecret: 'b4d9fafeb3c3ed12ff6cc97b9f9a1817', // 在开发者中心开通服务并获取apiSecret
    access_token: event.access_token,
    openid: event.openid,
  })

  console.log(res) // res里包含手机号
  // 执行用户信息入库等操作，正常情况下不要把完整手机号返回给前端
  // 在云函数中也可以调用后端接口将手机号存入后端数据中或云数据库中
  return {
    code: 200,
    message: '获取手机号成功',
  }
}
