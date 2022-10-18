const Layer = require("./layer");
const methods = require("methods");

function Route() {
  this.stack = [];
  this.methods = {};
}
// new Route 上有一个stack方法 存储这当前layer对应多个handler
// Route上有一个dispatch方法用于layer层进行触发
Route.prototype.dispatch = function (req, res, out) {
  // console.log(this.stack, "layer");
  let index = 0;
  const next = () => {
    if (index >= this.stack.length) return out(req, res);
    let layer = this.stack[index++];
    console.log(layer.method, req.method.toLowerCase(), "122");
    if (layer.method === req.method.toLowerCase() || layer.method === "all") {
      // 匹配到 交给route处理 从上一个layer到 下一个layer  => next
      layer.handler(req, res, next);
    } else {
      next();
    }
  };
  next();
};
methods.concat("all").forEach((method) => {
  Route.prototype[method] = function (handlers) {
    // 方法存储的时候给路径标识
    this.methods[method] = true;
    handlers.forEach((handler) => {
      // 处理当前同一个路径不同方法的情况 不关心路径 关心的是方法
      // app.get('/', fn).post("/", fn).delete('/', fn)
      const layer = new Layer("*", handler);
      layer.method = method;
      this.stack.push(layer);
    });
  };
});

module.exports = Route;

// 每个layer路径对应的都会有一层Route
