// user路由中间件控制
const userService = require('../service/user.service')

class UserController {
  async create(ctx, next) {
    // 1.获取用信息
    const user = ctx.request.body

    // 2.1验证客户端传过来的user数据是否可以保存到数据库
    // 2.1.1判断用户名或密码是否为空
    const { name, password } = user
    if (!name || !password) {
      ctx.body = {
        code: -1001,
        message: '用户名或密码不能为空!'
      }
      return
    }

    // 2.1.1检查用户名是否存在
    const values = await userService.findUserByName(name)
    // values为数组，不为空表示用户名存在
    if (values.length) {
      ctx.body = {
        code: -1002,
        message: '用户名已存在!'
      }
      return
    }

    // 2.2将用户信息传到数据库中
   const result = await userService.create(user)

    // 3.查看存储结果，告知创建成功 
    ctx.body = {
      message: '创建用户成功！',
      data: result
    }
  }
}

module.exports = new UserController()