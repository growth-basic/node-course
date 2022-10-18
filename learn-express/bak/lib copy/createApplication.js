const http = require("http");
const url = require("url");
let routes = [];
// 导出的是一个函数
function createApplication() {
  // createApplication创建应用的作用，但是和本身创建应用是没有任何关系，我们可以实现解耦合
  return {
    // 请求get的路由处理
    get(path, handler) {
      routes.push({
        method: "get",
        path,
        handler,
      });
    },
    // 服务器监听方法
    listen(...args) {
      const done = (req, res) => {
        // handler() {}
        res.end(`connot ${req.method} ${req.url} `);
      };
      const server = http.createServer((req, res) => {
        const { pathname } = url.parse(req.url);
        console.log(pathname, "pathname");
        const method = req.method.toLowerCase();
        // 匹配路由中的对应操作
        for (let i = 0; i < routes.length; i++) {
          const route = routes[i];
          if (method === route.method && pathname === route.path) {
            return route.handler(req, res);
          }
        }
        done(req, res);
      });
      // 监听服务
      server.listen(...args);
    },
  };
}
// 工厂函数模式 调用的时候返回不同的实例express实例对象
module.exports = createApplication;
