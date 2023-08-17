// 上传头像中间件
const multer = require('@koa/multer');
const { UPLOAD_PATH } = require('../config/path')


const uploadAvator = multer({
  dest: `${ UPLOAD_PATH }`
})
const handleAvatar = uploadAvator.single('avatar')


module.exports = {
  handleAvatar
}