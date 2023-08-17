// user路由中间件控制
const fs = require('fs')
const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const { UPLOAD_PATH } = require('../config/path')

class UserController {
  async create(ctx, next) {
    // 1.获取用信息
    const user = ctx.request.body

    // 2.2将用户信息传到数据库中
   const result = await userService.create(user)

    // 3.查看存储结果，告知创建成功 
    ctx.body = {
      message: '创建用户成功！',
      data: result
    }
  }

  // 获取用户头像信息
  async showAvatarImage(ctx, next) {
    const { userId } = ctx.params

    const avatarInfo = await fileService.queryAvatarWithUserId(userId)
    const { filename, mimetype } = avatarInfo
    ctx.type = mimetype
    ctx.body = fs.createReadStream(`${ UPLOAD_PATH }/${ filename }`) 
  }
}

module.exports = new UserController()