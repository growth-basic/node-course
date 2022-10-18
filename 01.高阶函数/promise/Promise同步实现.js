const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";
// 基础使用 同步状态的实现
class Promise {
  constructor(executor) {
    this.value = undefined;
    this.reason = undefined;
    this.status = PENDING;
    const resolve = (value) => {
      if (this.status === PENDING) {
        this.value = value;
        this.status = FULFILLED;
      }
    };
    const reject = (reason) => {
      // 只有状态是pending的状态才能更改状态， 状态一旦发生变化就不会再更改
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
      }
    };
    // executor的执行发生异常 直接执行reject
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    }
    if (this.status === REJECTED) {
      onRejected(this.reason);
    }
  }
}

module.exports = Promise;
