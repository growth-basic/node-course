// export default import都是借给js引擎进行解析的， 解析时已经确定了依赖关系， 所以在运行阶段的代码会报错，解析时编译，require是运行时编译，require实质是一个函数
// parsing ->AST ->字节码
// 纯esModule环境使用 import函数
// import('./01.esModule.js') // 是一个异步加载，在运行完毕会执行，返回的是一个promise
// esmodule的加载是一步执行的
// esModule的加载过程
// 1. 在解析的时候闯将一个快空间 模块环境记录(module environment record):bindings:实时绑定的功能
// 2. 在export导出的时候都会实时发生变化
// 3. 在模块环境记录中记录的是const修饰的常量 是不允许进行赋值操作的, 但是如果是引用类型的变量是可以进行引用类型修改的