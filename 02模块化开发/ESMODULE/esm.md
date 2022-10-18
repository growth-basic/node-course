### esModule 和 commonjs 规范的不同之处

1. 一方面它使用的是 import 和 export`关键字`, 不是对象不是函数 是关键字
2. 另一方面它采用编译期的静态分析，并且也加入了动态引入的方式

EsModule 模块采用 export 和 import 关键字实现模块化，关键字需要浏览器进行解析执行

1.  export 负责将模块内的内容导出
2.  import 负责其他模块的导入功能
3.  采用 esModule 将自动采用严格模式 `use stricts`
4.  webpack 的 treeShaking 就是通过 import 进行实现的，因为是静态分析，不是编译时执行

export 关键字 {}，不是一个对象，二货思方式要导出变量的引用列表
export default 默认导出只能有一个

import 命名导出的三种方式

```JS
export {
  name,
  age,
  sayHellos
}
// 别名的方式
export {
  name as cname,
  age as cagesd
}

// 命名导出
import {name, age} from './es_uses'
import {name as cname, age as cage} from './es_use'
import * as foo from './es_use'
// 导入在进行导出的效果 功能库文件导出的快捷导出s方式
export {name, age} from './es_use'

// 默认导出的方式
export default
```

import 做关键字不允许动态的进行加载， 因为 js 引擎解析是编译静态分析，在进行就需要知道代码上下文的依赖关系
(parsing 的过程是没有被执行的，转换成 AST, 在解析的时候就确定了依赖关系，所以报错)
可以使用 import 函数的方式进行动态加载，在纯 esModule 环境下只能使用 import 函数, 返回一个 promise，函数才能在运行时执行
而 require 是一个函数调用，在函数运行的阶段 s 执行,在 webpack 环境都可以执行

commonjs 加载的过程是运行时加载的，并且是同步加载的，加载的是对象的引用

esModule 的加载过程，是在解析时加载的，并且是异步加载的，不会阻塞后面代码的执行， `script async`
esModule 导出的是变量的引用

```JS
let name = 'why'
let age = 20
// 绑定的是变量的引用
export {
  name,
  age
}
// 实质是在解析阶段创建了一个内存空间，在esModule的规范叫Module enviroment record, 实时绑定变量的引用(bindings), 当进行值变量的时候，引用导出的时候值就会发生变化
// bindings的过程
const name(实际导出的变量) = name的引用 不能够在引入的文件中进行修改
// 变量是对象的时候的时候可以进行修改
const name = {
  age: 20
}
```
