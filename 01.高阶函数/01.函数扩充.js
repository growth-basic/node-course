function core(...args) {
  console.log(...args, "core执行");
}
// 后面在在进行函数扩展的时候 使用高阶函数进行包裹
// 在开发的过程中我们不需要对原函数做更改，想对函数函数进行扩展
// before是之前执行的函数 beforeFn 函数定义的作用域和执行的作用域不是同一个就会产生闭包
Function.prototype.before = function (beforeFn) {
  return (...args) => {
    beforeFn();
    console.log("第二次可以扩展的逻辑");
    this(...args); // 原有的函数逻辑
  };
};

// console.log();
// core是原有函数 对当前函数进行扩展
// 传入高阶函数扩展的逻辑 在返回函数里的扩展逻辑
let newFn = core.before(() => {
  console.log("第一次扩展的逻辑");
});
newFn("killian");

// 函数的柯理化函数(原则上是函数的参数是一个) 和偏函数(不定函数参数的个数)
// 判断函数的类型
// 1.typeof 2.Object.prototype.toString.call 3.instanceof 4.Array.isArray 5.constructor
