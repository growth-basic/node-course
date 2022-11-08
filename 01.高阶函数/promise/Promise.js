const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

let called;  
const resolvePromise = (promise2, x, resolve, reject)  => {
//  解决循环引用,自己执行自己, 错误处理
  if (promise2 === x) {
    return reject(new  TypeError("Chaining cycle detected for promise #<Promise>"))
  }
//x: promise 可能是一个对象或者一个函数, 处理是promise的情况
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      let then = x.then // 查看当前属性是否存在then // 取值出错的时候
      if (typeof then === 'function') {
        then.call(x, (y) => { // 让当前的promise函数执行
          // y 也可能是一个promise，递归解析的过程
          if (called) return
          called = true
          resolvePromise(promise2, y, resolve, reject)
          // resolve(y) 
        }, err => {
          if (called) return
          called = true
          reject(err)
        }) // 让当前获取的promise执行
      } else { // {then: '1234'}
        resolve(x)
      }
    } catch (err) {
      if (called) return
      called = true
      reject(err)
    }
  } else {
  //  是一个普通值直接处理
    resolve(x)
  }
}
// 基础使用 同步状态的实现
//1. Promise是一个类， 通过new创建实例
class Promise {
  //promise有一个执行器。这个执行器立即执行
  constructor(executor) {
    this.value = undefined;
    this.reason = undefined;
    this.status = PENDING;
    this.onResolvedCallbacks = [] // 专门用来存放成功的回调
    this.onRejectedCllbacks = [] // 专门用来存放失败的回调

    const resolve = (value) => {
      if (value instanceof Promise) {
        return value.then(resolve, reject)
      }
      if (this.status === PENDING) {
        this.value = value;
        this.status = FULFILLED;
        this.onResolvedCallbacks.forEach(onFulfilled => onFulfilled())
      }
    };
    const reject = (reason) => {
      // 只有状态是pending的状态才能更改状态， 状态一旦发生变化就不会再更改
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
        this.onRejectedCllbacks.forEach(onRejected => onRejected())
      }
    };
    // executor的执行发生异常 直接执行reject
    try {
      //执行器立即执行， 这个执行器有两个参数一个是成功
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function'? onFulfilled: v => v;
    onRejected = typeof onRejected === 'function'? onRejected: err => { throw err };
    // 每一次then的时候重新返回一个新的promise
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        //x: 表示执行成功的回调返回的普通值
       setTimeout(() => {
         try {
           let x = onFulfilled(this.value);
           // p1.then(data=> p2.resolve => p2.then)
           //x 可能是一个promise 需要拿到promise执行的结果
           // 让当前的值x和promise2状态相关联，走promise2的resolve还是reject
           // resolvePromise中的promise2, 由于事件循环获取不到, 需要进行一步
           resolvePromise(promise2, x, resolve, reject)
         } catch (e) {
           reject(e)
         }
       })
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            //普通值会传递到下个promise的成功中去
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }

      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
        this.onRejectedCllbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
      }
    })
    return promise2
  }
  catch(callback) {
    this.then(null, callback)
  }
  // finally表示的不是最终的意思，是无论如何都会执行
  // 如果返回的是一个Promise, 会等到Promise执行结束后执行, 如果返回的是失败会将失败的原因传递给写个error
  static resolve (data) {
    return new Promise((resolve, reject) => {
      resolve(data)
    })
  }

  static reject (reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }
}


Promise.prototype.finally = function(callback) {
  // 1，无论怎样都执行, 最终返回一个promise
  return this.then((value) => { // value 上一个Promise返回值
    //2. 当执行成功的回调的时候，会把成功的值透传， 
    return Promise.resolve(callback()).then(() => value)
  }, (reason) => {
    // 3. 当finally执行返回一个reject的值，会把final的值进行传递出去
    // 4. callback中返回一个失败的promise的状态
    return Promise.resolve(callback()).then(() => {throw reason})
  })
}

// promise解决的问题：1. 回调嵌套的问题 2. 同步多个异步的结果

Promise.defer = Promise.deferred = function () {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
//安装 promises-aplus-tests -g
module.exports = Promise;
