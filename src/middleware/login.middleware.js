const jwt = require('jsonwebtoken')
const {
  NAME_OR_PASSWORD_IS_REQUIRED, 
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRECT,
  UNAUTHORIZATION
} = require('../config/error')
const userService = require('../service/user.service')
const { md5password } = require('../utils/md5-password')
const { PUBLIC_KEY } = require('../config/secret')

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body

  // 1.验证用户名和密码是否为空
  if (!name || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
  }

  // 2.验证用户名是否存在
  const users = await userService.findUserByName(name)
  const user = users[0]
  if (!user) {
    return ctx.app.emit('error', NAME_IS_NOT_EXISTS, ctx)
  }

  // 3.用户存在，查询数据库，验证用户输入的密码是否一致
  if (user.password !== md5password(password)) {
    return ctx.app.emit('error', PASSWORD_IS_INCORRECT, ctx)
  }
  // 4.将user信息保存到ctx中
  ctx.user = user
  
  await next()
}

const verifyAuth = async (ctx, next) => {
  // 测试token
  // 1.拿到token
  const authorization = ctx.headers.authorization
  if (!authorization) {
    return ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }
  const token = authorization.replace('Bearer ', '')
  // 2.验证token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    console.log(result)
    ctx.user = result
  } catch (error) {
    ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }

  await next()
}

module.exports = {
  verifyLogin,
  verifyAuth
}

