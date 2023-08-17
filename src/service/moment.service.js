const connection = require("../app/database")

class MomentService {
  async create(content, userId) {
    const statement = 'INSERT INTO `moment`(content, user_id) VALUES (?, ?);'
    const [result] = await connection.execute(statement, [content, userId])
    return result
  }

  // 查询动态列表，同时展示评论和标签的个数(SQL语句的子查询), 和用户头像地址
  async queryList(offset, size) {
    const statement = `
      SELECT m.id id, m.content content, m.createAt createAt, m.updateAt updateAt,
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarURL', u.avatar_url, 'createTime', u.createAt, 'updateTime', u.updateAt) user,
        (SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) commentCount,
        (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
      FROM moment m
      LEFT JOIN user u ON m.user_id = u.id
      LIMIT ? OFFSET ?;
    `
    const [result] = await connection.execute(statement, [String(size), String(offset)])
    return result
  }

  // 查询动态详情，同时展示评论详情和用户信息， 和用户头像地址
  async queryById(id) {
    const statement = `
    SELECT m.id id, m.content content, m.createAt createAt, m.updateAt updateAt,
      JSON_OBJECT('id', u.id, 'name', u.name, 'avatarURL', u.avatar_url, 'createTime', u.createAt, 'updateTime', u.updateAt) user,
      (
        JSON_ARRAYAGG(JSON_OBJECT(
          'id', c.id, 'content', c.content, 'commentId', c.comment_id,
          'user', JSON_OBJECT('id', cu.id, 'name', cu.name)
        ))
      ) comments
    FROM moment m
    LEFT JOIN user u ON m.user_id = u.id
    LEFT JOIN comment c ON c.moment_id = m.id
    LEFT JOIN user cu ON cu.id = c.user_id
    WHERE m.id = ?
    GROUP BY m.id;
  `
  const [result] = await connection.execute(statement, [id])
  return result
  }

  // 更新某条动态
  async updateById(content, id) {
    const statement = 'UPDATE moment SET content = ? WHERE id = ?;'
    const [result] = await connection.execute(statement, [content, id])
    return result
  }
  // 删除
  async deleteById(id) {
    const statement = 'DELETE FROM moment WHERE id = ?;'
    const [result] = connection.execute(statement, [id])
    return result
  }

  async hasLabel(momentId, labelId) {
    const statement = 'SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;'
    const [result] = connection.execute(statement, [momentId, labelId])
    return !!result.length
  }

  async addLabel(momentId, labelId) {
    const statement = 'INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);'
    const [result] = await connection.execute(statement, [momentId, labelId])
    return result
  }
}

module.exports = new MomentService()