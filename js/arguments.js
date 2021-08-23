/**
 * 类数组对象，存储实际传递给函数的参数
 * 存储实参，有序的
 * length
 * callee  返回正被执行的function 对象
 * 没有Array的属性 没有pop
 */
function fn() {
    // console.log(arguments[0])
    // console.log(arguments.length)
    // console.log(typeof arguments)
    // console.log(toString.call(arguments))
    // console.log(arguments.callee === fn)
    arguments[0] = 'functionArg'
    // console.log(arguments[0])
}
fn('name', 'foo')
/**
 * 类数组对象---> 数组
 */

function fn2() {
    let arg1 = Array.prototype.slice.call(arguments,1)
    let arg2 = [].slice.call(arguments)
    let arg3 = Array.from(arguments)
    let arg4 = [...arguments]
    console.log(arg1, arg2, arg3, arg4)
}
fn2('data')

/**
 * 应用
 */

function fn3(a, b, c) {
    //length
    if (fn3.length != arguments.length) {
        console.log('形参和实参不一致')
    } else {
        console.log('形参和实参一致')
    }
}
fn3(1, 2)

function fn4(n) {
    //arguments.callee实现匿名函数递归
    if (n == 1) {
        return 1
    } else {
        return n + arguments.callee(n - 1)
    }
}
console.log(fn4(6))

function fn5() {
    //遍历参数求和或者最大值
    let max = arguments[0]
    for( item of arguments) {
        if(item > max){
            max = item
        }
    }
    return max
}
console.log(fn5(5, 3, 2, 9, 4))

function fn6() {
    //模拟函数重载
    if(arguments.length == 1){
        console.log(arguments[0] + 5)
    }else if(arguments.length == 2) {
        console.log(arguments[0] + arguments[1])
    }
}
fn6(10)
fn6(10, 20)

