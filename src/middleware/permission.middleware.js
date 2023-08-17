const { OPERATION_IS_NOT_PERMISSION } = require("../config/error")
const permissionService = require("../service/permission.service")

// 缺点：只能验证评论表是否有权限操作
// const verifyMomentPermission = async (ctx, next) => {
//   // 1.获取评论id
//   const { momentId } = ctx.params
//   // 2.获取用户id
//   const uid  = ctx.user.id
//   // 3.数据库查询是否有权限
//   const isPermisson = await permissionService.checkMoment(momentId, uid)
//   // 没有权限
//   if (!isPermisson) {
//     return ctx.app.emit('error', OPERATION_IS_NOT_PERMISSION, ctx)
//   }
//   // 4.执行下一步
//   await next()
// }

// ----验证多表是否有权限进行操作----
const verifyPermission = async (ctx, next) => {
  // 1.获取登录用户的 id
  const uid  = ctx.user.id

  // 2.获取资源的 name/id; 
  // 注意：动态路由名字必须规范，如用表名+id -> /:momentId
  // name => 表名 moment/user/comment/label
  // params: { momentId: 4 }
  // keyNmae => momentId
  const keyNmae = Object.keys(ctx.params)[0]
  const resourceId = ctx.params[keyNmae]
  const resourceName = keyNmae.replace('Id', '') //得到表名
 
  // 3.数据库查询是否有权限
  const isPermisson = await permissionService.checkResource(resourceId, resourceName, uid)
  // 没有权限
  if (!isPermisson) {
    return ctx.app.emit('error', OPERATION_IS_NOT_PERMISSION, ctx)
  }
  // 4.执行下一步
  await next()
}

module.exports = {
  // verifyMomentPermission,
  verifyPermission
}