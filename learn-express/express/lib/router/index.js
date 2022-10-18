const url = require("url");
const Layer = require("./layer");
const Route = require("./route");
const methods = require("methods");
function Router() {
  // 存储当前应用的路由表
  this._stack = [];
}
Router.prototype.route = function (path) {
  // 1.先创建route
  const route = new Route();
  // 同一个路径对应多个handlers
  // 2.在创建layer, 绑定dispatch中的this
  const layer = new Layer(path, route.dispatch.bind(route));
  layer.route = route;
  this._stack.push(layer);
  return route;
};
methods.concat("all").forEach((method) => {
  Router.prototype[method] = function (path, handlers) {
    // 每次指定路径的时候都需要产生一层Route
    // 1.先创建route
    // const route = new Route();
    // // 同一个路径对应多个handlers
    // route.get(handlers);
    // // 2.在创建layer, 绑定dispatch中的this
    // const layer = new Layer(path, route.dispatch.bind(route));
    // // 每一layer上应该有一层的route
    // layer.route = route;

    // console.log(route, "layer");
    // this._stack.push(layer);
    // console.log(this._stack, "-stack");
    const route = this.route(path);
    route[method](handlers);
    // this._stack.push({
    //   method: "get",
    //   path,
    //   handler,
    // });
  };
});

Router.prototype.handle = function (req, res, out) {
  const { pathname } = url.parse(req.url); // 请求路径
  const method = req.method.toLowerCase(); // 请求方法
  // 匹配路由中的对应操作
  // for (let i = 0; i < this._stack.length; i++) {
  //   const route = this._stack[i];
  //   if (method === route.method && pathname === route.path) {
  //     return route.handler(req, res);
  //   }
  // }
  // done(req, res);
  // 请求到来后我们需要在stack中筛选出我们对应的路径 执行dispath

  let index = 0;
  const next = () => {
    if (index >= this._stack.length) return out(req, res);
    let layer = this._stack[index++];
    if (
      pathname === layer.path &&
      layer.route.methods[req.method.toLowerCase()]
    ) {
      // 匹配到 交给route处理 从上一个layer到 下一个layer  => next
      layer.handler(req, res, next);
    } else {
      next();
    }
  };
  next();
};

module.exports = Router;

// 核心:3 路由系统专门用来匹配路由操作的处理,
// 接下来要实现 路由系统的中间件功能
// layer中layer和route层是1对一关系
// 内层的route又存储的是用户回调相同个数的layer，为了解决 app.get()。post().delete()
