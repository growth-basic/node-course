const express = require("express");
const app = express();
// 如果不写路径，则标识全局匹配中间件
// 如果写了路径 标识路径匹配中间件
app.use((req, res, next) => {
  // 公共逻辑中间件
  res.setHeader("content-type", "text/plain;charset=utf8");
  console.log("middleware use");
  next();
});
app.get("/", (req, res, next) => {
  console.log("/1");
  next();
});
app.post("/", (req, res, next) => {
  console.log("hello post");
  next();
});
app.get(
  "/",
  (req, res, next) => {
    console.log("/2");
    next();
  },
  (req, res, next) => {
    console.log("/3");
    next();
  },
  (req, res, next) => {
    console.log("/4");
    next();
  }
);
app.get("/hello", (req, res) => {
  res.end("路径为/hello");
});

app.listen(3000, () => {
  console.log("服务启动成功");
});
