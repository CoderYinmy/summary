/**
 * this call bind apply
 * this 永远指向最后调用它的那个对象
 */

{
    var name = '111'
    function a() {
        var name = '222'
        console.log(this.name) //111
        console.log(this) //window
    }
    a()
    console.log(this) //window
    var name = '444'
    let b = {
        name: null,
        fn: function () {
            // console.log(this.name) //333
        },
    }
    // console.log(b.fn())
    var c = b.fn
    c()
}
/**
 * 改变this指向
 *  还用ES6箭头函数--->this始终指向函数定义时的this
 *  在函数内部使用_this = this
 *  使用apply bind call
 *      apply和call都可以改变this指向，传参不同
 *      apply 传入一个数组（thisArg，[]）
 *      call  传入多个参数（thisArg，1，2，3，4，5）
 *      bind 创建一个新函数，必须手动去调用
 *  new 实例化一个对象
 */

{
    var name = 'window'
    var b = {
        name: '111',
        fn1: function () {
            console.log(this.name)
        },
        fn2: function () {
            //1._this = this
            // let _this = this
            // setTimeout(function () {
            //     _this.fn1()
            // }, 1000)
            //2.箭头函数
            setTimeout(() => {
                this.fn1()
            }, 1000)
        },
    }
    b.fn2()
}

/**
 * 柯里化
 * 将使用多个参数的函数转换成一系列使用一个参数的函数
 *
 */
function fnBind(a, b, c, d, e) {
    console.log(a, b, c, d, e)
}
let _fn = _.curry(fnBind)

_fn(1, 2, 3, 4, 5) // print: 1,2,3,4,5
