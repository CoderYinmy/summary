//call
Function.prototype.call = function (context, ...args) {
    if (typeof this !== 'function') {
        throw new Error('类型错误')
    }

    let key = Symbol('key')
    context[key] = this
    let sault = context[key](...args)
    delete context[key]
    return sault
}