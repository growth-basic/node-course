// require的实现是需要三个模块 path fs vm模块
// 什么时候是同步？什么时候是异步的？
// 同步：默认在程序在运行的过程都是可以同步加载的，如果运行起来了我们不希望阻塞主线程，这个时候我们才用异步的方式加载
// 同步性能高 但是会造成进程阻塞的现象
const fs = require("fs");
const path = require("path");
// 处理错误 在读取文件之前我们先判断下文件的状态是否存在 性能比较高
// statSync 获取文件的信息
// existsSync 判断文件是否存在 true/false 异步方法被废弃 因为和node的规格不统一 参数第一个不是err
console.log();
const filePath = path.resolve(__dirname, "./a.txt");
console.log(path.join("/a", "/", "c")); // 进行直接拼接
console.log(path.resolve("/a", "/", "/c")); // 遇到/的情况下回直接到根路径
console.log(path.dirname(filePath)); // _dirname 获取文件名
console.log(path.extname(filePath)); // .txt 文件后缀名
console.log(path.basename(filePath)); // 根据扩展名称获取文件名
// join 把路径进行拼接
let isExist = fs.existsSync(filePath, "r");
console.log(isExist);
if (isExist) {
  const atxt = fs.readFileSync(filePath, "utf8");
}

// vm 可以帮我们获取一个运行环境 可以进行拼接的函数字符串执行
// 放置作用域独立隔离
// new Fuction 可以把字符串转换成函数 只能在全局作用域下执行
// node有一个新的环境vm 可以执行字符串(沙箱环境, 不会影响外接环境)
const vm = require("vm");
// 在一个全新的上下文执行代码
vm.runInThisContext("var obj = { a: 1 };console.log(obj.a)");

// 浏览器的调试模式
// 1.浏览器中调试 主要调试一些包
// 2. 在命令行中调试
// 3. 在编译器中调试
