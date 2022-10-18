const Promise = require("./promise/Promise");
let p = new Promise((resolve, reject) => {
  resolve("成功");
  // reject("失败");
  throw new Error("失败");
});

p.then(
  (value) => {
    console.log(value);
  },
  (reason) => {
    console.log(reason);
  }
);
