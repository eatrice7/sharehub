const momentService = require("../service/moment.service")

class MomentController {
  // 创建动态
  async create(ctx, next) {
    const { content } = ctx.request.body
    const { id } = ctx.user

    const result = await momentService.create(content, id)

    ctx.body = {
      code: 0,
      message: '创建动态成功',
      data: result
    }
  }
  // 获取动态列表
  async list(ctx, next) {

    const { offset, size } = ctx.query
    const result = await momentService.queryList(offset, size)

    ctx.body = {
      code: 0,
      data: result
    }
  }

  // 获取动态详情
  async detail(ctx, next) {
    const momentId = ctx.params.momentId
    const result = await momentService.queryById(momentId)
    ctx.body = {
      code: 0,
      data: result[0]
    }
  }
  // 修改某条动态
  async update(ctx, next) {
    const { momentId } = ctx.params
    const { content } = ctx.request.body
    const result = await momentService.updateById(content, momentId)
    ctx.body = {
      code: 0,
      message: '动态修改成功!',
      data: result
    }
  }
  // 删除某条动态
  async delMoment(ctx, next) {
    const { momentId } = ctx.params
    const result = await momentService.deleteById(momentId)
    ctx.body = {
      code: 0,
      message: '动态删除成功',
    }
  }
  // 给动态添加列表
  async addLabels(ctx, next) {
    const { labels } = ctx
    const { momentId } = ctx.params

    // 2.将 label_id 和 moment_id 添加 moment_label 关系表
    try { //---- have BUG -> 添加标签失败----
      for (const label of labels) {
        // 2.1判断 label_id 是否已经和 moment_id 已经存在该数据
        const isExists = await momentService.hasLabel(momentId, label.id)
        if (!isExists) {
          // 2.2不存在 moment_id 和 label_id 的关系数据
          const result = await momentService.addLabel(momentId, label.id)
        }  
      }

      ctx.body = {
        code: 0,
        message: '为动态添加标签成功!'
      }
      
    } catch (error) {
        ctx.body = {
          code: -3003,
          message: '为动态添加标签失败!'
        }
    }
  }
}

module.exports = new MomentController()