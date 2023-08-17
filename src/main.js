// 1.导入app
const app = require('./app')
const { SERVER_PORT } = require('./config/server')
// 执行一次，监听抛出的错误
require('./utils/handle-error')

// 2.将app启动起来
app.listen(SERVER_PORT, () => {
  console.log('coderHub服务已开启!')
})