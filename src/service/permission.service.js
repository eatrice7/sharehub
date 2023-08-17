const connection  = require('../app/database')

class PermissionService {
  // 只查询moment
  async checkMoment(momentId, uid) {
    // 如果评论 id 和用户 id 存在某一条动态, 则该评论是当前用户发布的，他有权限对该评论进行操作
    const statement = 'SELECT * FROM moment WHERE id = ? AND user_id = ?;'
    const [result] = await connection.execute(statement, [momentId, uid])
    // 返回布尔值
    return !!result.length
  }

  // ----多表查询验证----
  async checkResource(resourceId, resourceName, uid) {
    // 如果评论 id 和用户 id 存在某一条动态, 则该评论是当前用户发布的，他有权限对该评论进行操作
    const statement = `SELECT * FROM ${ resourceName } WHERE id = ? AND user_id = ?;`
    const [result] = await connection.execute(statement, [resourceId, uid])
    // 返回布尔值
    return !!result.length
  }
}

module.exports = new PermissionService()