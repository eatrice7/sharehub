const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { create, list, detail, update, delMoment, addLabels } = require('../controller/moment.controller')
const { verifyPermission } = require('../middleware/permission.middleware')
const { verifyLabelExists } = require('../middleware/label.middleware')

const momentRouter = new KoaRouter({ prefix: '/moment' })

// 评论接口
// 增：发布动态
momentRouter.post('/', verifyAuth, create)
// 1.查：获取动态列表
momentRouter.get('/', list)
// 2.获取某一条动态详情
momentRouter.get('/:momentId', detail)
// 3.删：
// momentRouter.delete('/:momentId', verifyAuth, verifyMomentPermission, delMoment)
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, delMoment)
// 4.改：更新某条动态
// momentRouter.patch('/:momentId', verifyAuth, verifyMomentPermission, update)
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update)

// 5.给动态添加标签
/*  多行注释快捷键 -> alt + shift + A
  中间件：
    1.是否登录
    2.验证是否有操作这个动态的权限
    3.额外中间件，验证 label 的 name 是否已经存在与 label 表中
      * 如果存在，那么直接使用
      * 如果不存在，需要先将 label 的 name 添加到 label 表中
    4.最终步骤
      * 所有的 labels 都已经在 label 表
      * 动态 2， 和 labels 关系，添加到关系表中
*/
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, addLabels)

module.exports = momentRouter