const labelService = require("../service/label.service")

class LabelController {
  async create(ctx, next) {
    const { name } = ctx.request.body
    const result = await labelService.create(name)
    ctx.body = {
      code: 0,
      message: '创建标签成功!',
      data: result
    }
  }

  async list(ctx, next) {
    ctx.body = '获取标签列表'
  }
}

module.exports = new LabelController()