const app = require('../app')
const { NAME_OR_PASSWORD_IS_REQUIRED, 
        NAME_IS_EXISTS, 
        NAME_IS_NOT_EXISTS, 
        PASSWORD_IS_INCORRECT,
        UNAUTHORIZATION,
        OPERATION_IS_NOT_PERMISSION, 
} = require('../config/error')

app.on('error', (error, ctx) => {
  let code = 0
  let message = ''

  switch (error) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001
      message = '用户名或密码不能为空'
      break
    case NAME_IS_EXISTS:
      code = -1002
      message = '用户名已存在'
      break
    case NAME_IS_NOT_EXISTS:
      code = -1003
      message = '用户名不存在'
      break
    case PASSWORD_IS_INCORRECT:
      code = -1004
      message = '密码错误'
      break
    case UNAUTHORIZATION:
      code = -2001
      message = 'token过期或无效'
      break
    case OPERATION_IS_NOT_PERMISSION:
      code = -3001
      message = '当前用户无权限执行此操作'
      break
  }

  ctx.body = {
    code,
    message
  }
})