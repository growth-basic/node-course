const fs = require('fs')
const path = require('path')
const filepath = path.resolve(__dirname, './abc.txt')
// 同步读取文件信息 创建时间
// const info = fs.statSync(filepath)
// console.log(info)

// 异步操作
// fs.stat(filepath, function(error, statObj) {
//     console.log(statObj)
// })

// promise方式获取文件信息
// fs.promises.stat(filepath).then(res => {
//     console.log(res)
// })

// 文件描述符 通过文件描述符获取文件信息
fs.open(filepath, (err, fd) => {
    if (err) return err
    fs.fstat(fd, (err, info) => {
        console.log(info)
    })
})
 