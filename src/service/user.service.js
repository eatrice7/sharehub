// user用户信息的数据库操作
const connection = require('../app/database')

class UserService {
  async create(user) {
    // 1.获取用户数据
    const { name, password } = user

    // 2.拼接statement
    const statement = 'INSERT INTO `user` (name, password) VALUES (?, ?);'

    // 3.执行sql语句 异步函数
    const [result] = await connection.execute(statement, [name, password])
    return result
  }

  async findUserByName(name) {
    const statement = 'SELECT * FROM `user` WHERE name = ?;'
    const [values] = await connection.execute(statement, [name])
    return values
  }
  
  // 更新用户头像的 URL
  async updateUserAvatar(avatarURL, userId) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [avatarURL, userId])
    return result
  }
}

module.exports = new UserService()