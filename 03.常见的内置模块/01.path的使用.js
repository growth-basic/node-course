const path = require('path')
const basePath = '/user/hawkeye'
const filename = '///index.js'
// resolve得到的是当前的根路径 查找的是当前文件的路径
const filePath = path.resolve(basePath, filename)
console.log(filePath)

// 1. 获取路径信息
const dirname = path.dirname(filePath)
console.log(dirname)

const basename = path.basename(filePath)
console.log(basename)

const extname = path.extname(filePath)
console.log(extname)

// join 简单的路径拼接
const pathJoin = path.join(basePath, filePath)
console.log(pathJoin)

// 规范化路径
console.log(path.normalize(pathJoin))