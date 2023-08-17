const KoaRouter = require('@koa/router')
const { verifyLogin, verifyAuth } = require('../middleware/login.middleware')
const { sign, test } = require('../controller/login.controller')

const loginRouter = new KoaRouter({ prefix: '/login' })

loginRouter.post('/', verifyLogin, sign)
// 测试token
loginRouter.get('/test', verifyAuth, test)

module.exports = loginRouter