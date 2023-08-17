const jwt = require('jsonwebtoken')
const { PRIVATE_KEY, PUBLIC_KEY } = require('../config/secret')
const { UNAUTHORIZATION } = require('../config/error')

class LoginController {
  // 颁布token
  sign(ctx, next) {
    // 1.获取用户信息
    const { id, name } = ctx.user
    // 2.颁布令牌token
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256'
    })
    // 3.返回用户信息
    ctx.body = { code:0, data: { id, name, token } }
  } 

  test(ctx, next) {
    ctx.body = '验证身份成功'
  }
}

module.exports = new LoginController()