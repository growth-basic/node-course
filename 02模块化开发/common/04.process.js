// process nextTick env argv cwd
// process.cwd()获取当前项目的启动路径 是可变的 __dirname 是启动文件路径 是死的
console.log(process.cwd());
// 全局环境变量和临时环境变量 一般使用临时环境变量根据不同的临时环境变量 设置不同的值
console.log(process.env);
// 我们可以使用cross-env屏蔽mac和win的差异
// window SET xxx=100
// mac export xxx=200
// 根据环境变量的不同设置不同的环境值 临时环境变量的生命周期就当前的命令行窗口

// 除了使用环境变量区分 还可以通过执行命令参数的方式区分
console.log(process.argv);
// commander yargs(webpack的解析工具) minimist

// Node中的事件环 timer check poll nextTick的执行时机是高于promise的
// poll执行代码的是setImmediate一定会先执行
// 执行下一轮的操作
