// 1. node是Commonjs在服务器端一个具体实现
// 2. Browserify是commonjs在浏览器中的实现
// 3. Webpack打包工具具备对commonjs的支持和转换
// 4. node中每个文件都是一个单独的模块， 这个模块中包含commonjs规范的和新变量 exports module.exports require
// commonjs的引用规范实际就是引用赋值

let name = 'hawKeye'
const sayHello = () => {
    console.log('sayHello')
}
setTimeout(() => {
    console.log(exports.name)
}, 2000);
exports.name = name
exports.sayHello = sayHello

console.log(module)

// module.exports = exports的导出是顶层实现的