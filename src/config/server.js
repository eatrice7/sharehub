const dotenv = require('dotenv')

// 会将env文件中的常量配置到process.env中
dotenv.config()

// 解构
module.exports = {
  SERVER_PORT,
  SERVER_HOST
} = process.env