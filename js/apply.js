/**
 * 在浏览器里，全局内的this指向window
 * 在函数内，this指向最后调用它的对象
 * 在构造函数内，this指向new出来的对象
 * 箭头函数中，this指向其负作用域的this
 * call、apply、bind绑定this并改变指向
 */
//apply this永远指向最后调用它的对象
Function.prototype.apply = function (context) {
    if (typeof this !== 'function') {
        throw new Error('类型错误')
    }

    let key = Symbol('key')
    context[key] = this
    let args = Array.prototype.slice.call(arguments, 1)
    let resault = context[key].call(args)
    delete context[key]
    return resault
}