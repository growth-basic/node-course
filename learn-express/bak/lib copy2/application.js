// express 可以创建多个实例,但是此时所有的实例公用的是一个路由系统，
// 所以需要分配给每个实例一个路由,做到应用和路由的隔离
const http = require("http");
const Router = require("./router");
function Application() {
  this._router = new Router();
}
Application.prototype.get = function (path, handler) {
  // this._routes.push({
  //   method: "get",
  //   path,
  //   handler,
  // });
  // 提供一个获取路由的方法
  this._router.get(path, handler);
};
Application.prototype.listen = function (...args) {
  const done = (req, res) => {
    // handler() {}
    res.end(`connot ${req.method} ${req.url} `);
  };
  const server = http.createServer((req, res) => {
    // 路由的处理方法
    this._router.handle(req, res, done);
    // const { pathname } = url.parse(req.url);
    // console.log(pathname, "pathname");
    // const method = req.method.toLowerCase();
    // // 匹配路由中的对应操作
    // for (let i = 0; i < this._routes.length; i++) {
    //   const route = this._routes[i];
    //   if (method === route.method && pathname === route.path) {
    //     return route.handler(req, res);
    //   }
    // }
    // done(req, res);
  });
  // 监听服务
  server.listen(...args);
};

module.exports = Application;

// 核心：2. 创建应用实例, 解耦路由系统
