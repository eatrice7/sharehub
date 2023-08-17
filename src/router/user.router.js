const KoaRouter = require('@koa/router')
const userController = require('../controller/user.controller')
const { veruifyUser, hanldePassword } = require('../middleware/user.middleware')

const userRouter = new KoaRouter({ prefix: '/users' })

// 用户注册接口
userRouter.post('/', veruifyUser, hanldePassword, userController.create)

// 获得用户头像信息
userRouter.get('/avatar/:userId', userController.showAvatarImage)

module.exports = userRouter