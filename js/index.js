/**
 * 数据类型
 */

/**
 * 闭包
 * 能够读取其他函数内部变量的函数
 * 用途：1.读取函数内部变量  2.变量的值始终保存在内存中
 * 缺点：1.内存泄漏  2.篡改值
 * 闭包运用场景
 */
// 闭包的简单应用
let counter = (function () {
    let a = 1
    return function () {
        // console.log(a);
        return (a += 1)
    }
})()
counter()
counter()
counter()
// 闭包篡改值 —— 解决方法使用私有变量
;(function main() {
    let name = 'aaa'
    let name1 = name
    ;(function a() {
        // console.log(name)
        name1 = 'foo'
    })()
    ;(function b() {
        // console.log(name)
        // console.log(name1)
    })()
})()

/**
 * promise
 */

/**
 * 跨域
 * 浏览器因同源策略和安全限制不能执行在其他网站的脚本
 * 解决方法：JsonP，CORS，反向代理，web sockets,
 * JsonP：通过动态创建 <script></script>（只支持get）
 * CORS:
 *       分为简单请求和复杂请求
 *       在简单请求时，浏览器会发出带有origin的请求，服务器根据请求值判断是否同意请求
 *       在复杂请求时，浏览器会发出一个预检请求，后台根据请求地址进行匹配，服务器查询是否在白名单中，得到肯定答复，才正式发起请求
 * 反向代理：
 */

/**
 * mvvm模式
 */

/**
 * 继承
 */

/**
 * 作用域，原型链
 */

/**
 * this
 */

/**
 * 面向对象
 */
