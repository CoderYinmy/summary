// function Parent() {}
// function Child() {}
// const parent = new Parent()

// Child.prototype = parent

// console.log('xiaows__debug', Child.prototype.__proto__ === parent.__proto__)
// parent.__proto__ === Parent.prototype
// Child.prototype.__proto__ === Parent.prototype

// child.__proto__.__proto__ === Parent.prototype

// Child.prototype.constructor = Child

// var child = new Child() // Child 原型  child 实例

// child.__proto__ // 隐式原型 实例上的原型对象 child.__protot__
// Child.prototype // 显示原型 构造函数上的原型链对象 Child.prototype

// console.log(child.__proto__ === Child.prototype)

// function myNew(fn) {
//     var obj = {}
//     obj.__proto__ = fn.prototype
//     var rest = Array.prototype.slice.call(arguments)
//     rest.shift()
//     var res = fn.apply(obj, rest)
//     if (typeof res == 'object') {
//         return res
//     } else {
//         return Object
//     }
// }

// function myInstanceOf(l, R) {
//     var L = l.__proto__ // L.prototype

//     while (true) {
//         if (L === null) {
//             return false
//         }

//         if (R.prototype === L) {
//             // R.prototype === R.prototype
//             return true
//         }

//         L = L.__proto__ // L === R.prototype
//     }
// }

// function sum() {
//     var _a = 1 // 1.访问外部变量，2.变量一直存在内存中
//     var a = 1

//     function fn1() {
//         console.log(_a)
//         a = 2
//     }

//     function fn2() {
//         console.log(_a)
//         a = 3
//     }

//     fn1()
//     fn2()

//     console.log(a)
// }

// sum()

// m -> v
// <tempalte> {{name}} <tempalte> vue-template-compiler -> jsx all in js
function hello(name) {
    console.log('hello', name)
}

// vue-loader
// export default {
//     data() {
//         return {}
//     },
// }
var data = { a: 1, name: 'xiaows', b: { c: '' } }

// class Deps {
//     notify() {}
// }
var deps = {
    name: [hello],
}

;(function data_name() {
    let val = data.name
    Object.defineProperty(data, 'name', {
        configurable: true,
        enumerable: true,
        get: function () {
            return val
        },
        set: function (newVal) {
            val = newVal
            // deps.notify()
            for (var i = 0; i < deps.name.length; i++) {
                let fn = deps.name[i]
                fn.call(null, newVal)
            }
        },
    })

    return val
})()

data.name = 1

// v -> m

// 表单
// input
input.onchange = (val) => {
    data.name = val
}
