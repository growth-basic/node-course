// import export

// 常见的导出方式1
// export const name = 'hawkeye'
// export function sayhello() {
//     console.log('sayhello')
// }

// 常见的导出方式2
const name = 'hawkeye'
function sayHello() {
    console.log('sayHello')
}
// export 导出的是一个{}语法 不是对象 {}中放置的是变量的引用
// export {
//   name,
//   sayHello
// }

// 常见的导出方式三
export {
  name as myName,
  sayHello as mySayHello
}
