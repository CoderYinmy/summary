### tree shaking机制
1. 概念
- webpack 项目是一棵树，有一个入口文件相当于主干，入口文件依赖于很多模块树枝，打包的时候过滤到没有用到的代码。
- webpack5 已经自带这个功能，当打包环境为production的时候，tree-shaking默认开启。
- 依赖于ES6
2. 区别 
- 消除函数 （rollup和webpack都符合预期）
- 消除类  rollup和webpack都不符合预期
```js
1、rollup只处理函数和顶层的import/export变量，不能把没用到的类的方法消除掉
2、javascript动态语言的特性使得静态分析比较困难
3、如果静态分析的时候删除里run或者jump，程序运行时就可能报错

```
3. closure compiler
- 侵入式约束规范
- 往代码中添加代码
- 是java写的，与node构建的基本不能兼容
- 迁移成本大

4. 实例
```js
//a.js
export const a = 1;
export const b = 2
export function random() {
    console.log('random')
} 
//b.js
import {random,a,b} from './a.js'
console.log(random)
export default random

//打包结果
function random() {
    console.log('random');
}
console.log(random);
export default random;

/**
 * 开发中不推荐 export default 导出, 而是使用 export 导出
 */
```