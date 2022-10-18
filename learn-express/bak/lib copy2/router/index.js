const url = require("url");
function Router() {
  // 存储当前应用的路由表
  this._stack = [];
}
Router.prototype.get = function (path, handler) {
  this._stack.push({
    method: "get",
    path,
    handler,
  });
};
Router.prototype.handle = function (req, res, done) {
  const { pathname } = url.parse(req.url); // 请求路径
  const method = req.method.toLowerCase(); // 请求方法
  // 匹配路由中的对应操作
  for (let i = 0; i < this._stack.length; i++) {
    const route = this._stack[i];
    if (method === route.method && pathname === route.path) {
      return route.handler(req, res);
    }
  }
  done(req, res);
};

module.exports = Router;

// 核心:3 路由系统专门用来匹配路由操作的处理
