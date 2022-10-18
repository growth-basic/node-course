const fs = require('fs')
const path = require('path')

const content = '你好啊, hawkeye'
const filepath = path.resolve(__dirname, './abc1.txt')
//  options flag encoding
// fs.writeFile(path.resolve(__dirname, './abc1.txt'), content, {flag: 'a'}, function(err) {
//     console.log(111)
// })

fs.readFile(filepath, (err, content) => {
    console.log(content)
})