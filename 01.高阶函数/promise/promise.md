### Promise

> promise 为了解决异步编程的问题

1. 解决了回调地狱问题
2. 并发操作获取最终的结果 (同步异步并发的问题)

### Promise 的特点

1. Promise 是一个类，使用的时候需要 new 这个类
2. Promise 有三个状态 pending(等待态), resolve(成功态) reject(失败态)
3. Promise 中需要传入一个执行器 executor 函数, executor 会立即执行
4. Promise 只有在 pending 的状态下才能调用 resolve 会将状态变为成功态 调用 reject 会将状态变为失败态
5. promise 的状态一旦发生改变 就不在发生变化了
6. new Promise 的实例有一个 then 方法，第一个参数是成功的回调第二个参数是失败的回调
7. 成功有成功的原因(value) 失败有失败的原因(reason) 8.如果 new Promise 的状态中发生了异常也会执行失败态
