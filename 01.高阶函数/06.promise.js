const Promise = require("./promise/Promise");
// let p = new Promise((resolve, reject) => {
//   // resolve("成功");
//   // throw new Error("失败1");
//   // reject('失败的逻辑')
//   setTimeout(() => {
//     resolve('成功')
//   }, 1000)
// });
// //1. promise调用then方法的时候可能当前的promise状态没有成功
// //2. 采用发布订阅模式，如果当前promise的状态是pending时, 我们需要将成功的回调和失败的存放起来
// p.then(
//   (value) => {
//     console.log(value);
//   },
//   (reason) => {
//     console.log(reason);
//   }
// );

//1. promise成功和失败的回调的返回值，可以传递给外层的then
//2. 如果返回普通值, 可能是promise, 出错的情况

// let fs = require('fs')

// function read(filename) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filename, 'utf-8', (err, data) => {
//       if (err) return reject(err)
//       resolve(data)
//     })
//   })
// }
// promise函数只有抛出错误或者返回普通值的时候才会出错
// read('./name1.txt')
// let p1 = new Promise((resolve, reject)  =>{
//   resolve(100)
//
// })

//p1.then: 执行的是成功的回调, 执行成功的回调onFulfilled之后，返回的是100
// let p2 = p1.then(res => {
//   throw new Error()
// }, (err) => {
//   console.log(err)
// })
//
// p2.then(data => {
//   console.log(data, 'data***')
// }, (err) => {
//   console.log(err, '//err')
// })
// promise的需求整改
let p = new Promise((resolve) => {
  resolve(100)
})
let promise2 = p.then((data) => {
  // 返回的是promise
  // 出现了问题
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("错误")
      })
    })
})

promise2.then((data) => {
  console.log(data, "成功")
}, (err) => {
  console.log(err, '失败')
})



