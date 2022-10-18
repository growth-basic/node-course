const bar = require("./01.common");
console.log(bar.name);
bar.sayHello();

setTimeout(() => {
  bar.name = "kyle";
}, 1000);
// 开辟一个堆内存空间 把这个堆内存空间复制给obj
// 定义的变量名称是声明在栈中，赋值复杂类型的对象是开辟在堆内存 简单类型是直接在栈中赋值
// const obj = {
//     name: 'hawkeye',
//     age: 18
// }

// const info = obj
// // 每个文件都有一个exports默认是一个空对象，在堆内存中开辟一个内存空间
// console.log(exports)
/** 
require
1. 作用是对象内存空间的引用，和exports指向的是同一块内存 
2. require的下载是同步加载的
3. loaded的作用是加载一次后会做缓存
4. 模块的加载是一个图结构 不够进行循环加载
 */
