const fileService = require("../service/file.service")
const userService = require("../service/user.service")
const { SERVER_HOST, SERVER_PORT } = require('../config/server')

class FileController {
  async create(ctx, next) {
    // 1.获取头像信息
    const { filename, mimetype, size } = ctx.request.file
    const { id } = ctx.user

    // 2.将图片信息和用户 id 结合起来进行存储
    const result = await fileService.create(filename, mimetype, size, id)

    // 3.将头像的地址信息，保存到 user 表中
    const avatarURL = `${ SERVER_HOST }:${ SERVER_PORT }/users/avatar/${ id }`
    const result1 = await userService.updateUserAvatar(avatarURL, id)

    ctx.body = {
      code: 0,
      message: '上传头像成功!',
      data: avatarURL
    }
  }

}

module.exports = new FileController()