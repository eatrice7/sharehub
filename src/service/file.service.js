const connection = require("../app/database")

class FileService {
  async create(filename, mimetype, size, userId) {
    const statement = 'INSERT INTO avatar(filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);'
    const [result] = await connection.execute(statement, [filename, mimetype, size, userId])
    return result
  } 
  async queryAvatarWithUserId(userId) {
    const  statement = 'SELECT * FROM avatar WHERE user_id = ?;'
    const [result] = await connection.execute(statement, [userId])
    // 返回最新的一条数据 -> 最后插入的一条数据
    // return result[result.length - 1]
    return result.pop()
  }
}

module.exports = new FileService()