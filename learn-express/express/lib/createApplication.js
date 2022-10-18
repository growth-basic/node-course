const Application = require("./application");
// 导出的是一个函数
function createApplication() {
  return new Application();
  // createApplication创建应用的作用，但是和本身创建应用是没有任何关系，我们可以实现解耦合
}

// 工厂函数模式 调用的时候返回不同的实例express实例对象
module.exports = createApplication;
//核心： 1. 创建应用功能
