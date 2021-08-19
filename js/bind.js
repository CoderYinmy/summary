// bind
Function.prototype.bind = function (context) {
    if (typeof this !== 'function') {
        throw new Error('类型错误')
    }
    let _this = this
    let args = Array.prototype.slice.call(arguments, 1)
    return function () {
        _this.apply(context, args.concat(args))
    }
}