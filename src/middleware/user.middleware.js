const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_EXISTS } = require('../config/error')
const userService = require('../service/user.service')
const { md5password } = require('../utils/md5-password')

const veruifyUser = async (ctx, next) => {
      // 2.1验证客户端传过来的user数据是否可以保存到数据库
    // 2.1.1判断用户名或密码是否为空
    const { name, password } = ctx.request.body
    if (!name || !password) {
      return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
    }

    // 2.1.1检查用户名是否存在
    const values = await userService.findUserByName(name)
    // values为数组，不为空表示用户名存在
    if (values.length) {
      return ctx.app.emit('error', NAME_IS_EXISTS, ctx)
    }

    await next()
}

// 密码加密
const hanldePassword = async (ctx, next) => {
  const { password } = ctx.request.body
  ctx.request.body.password = md5password(password)
  await next()
}

module.exports = {
  veruifyUser,
  hanldePassword
}