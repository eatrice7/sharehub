const labelService = require("../service/label.service")

const verifyLabelExists = async (ctx, next) => {
  // 1.获取客户端传过来所有的 labels -> "labels": ["篮球", "唱跳", "rap", "情怀", "yyds"]
  const { labels } = ctx.request.body

  // 2.判断所有的 labels 中的 name 是否已经存在于 label 表中
  const newLabels = []
  for (const name of labels) {
    const result = await labelService.queryLabelByName(name)
    const labelObj = { name }
    if (result) { // name 存在, 获取 name 对应的 label 的 id
      labelObj.id = result.id // => { name: '篮球', id: 1 }
    } else { //name 不存在，插入 name，并且获取插入后的 id
      const insertResult = await labelService.create(name)
      labelObj.id = insertResult.insertId // => { name: '情怀', id: 4 }
    }
    newLabels.push(labelObj)
  }
  console.log(newLabels)
  // 3.所有的 labels 都变成 [{ name: '情怀', id: 4 }, { name: 'yyds', id: 5 }]
  ctx.labels = newLabels

  await next()
}

module.exports = {
  verifyLabelExists
}