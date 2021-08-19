// new
/**
 * 1、创建一个空对象
 * 2、将新创建的隐式原型连接到构造函数显示原型上
 * 3、将构造函数作用域指向新对象
 * 4、判断是否返回对象，没有返回对象则返回this
 */
 function students(name, age) {
    this.name = name
    this.age = age
}
students.prototype.id = '111'

function _new(constructor, ...args) {
    let obj = {}
    obj.__proto__ = constructor.prototype
    let res = constructor.apply(obj, args)
    return Object.prototype.toString.call(res) === '[Object Object]' ? res : obj
}

let stu = _new(students, 'lilei', 18)
console.log(stu.name, stu.age, stu.id)
