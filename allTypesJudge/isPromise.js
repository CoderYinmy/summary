const { toString } = require('./function/toString')
const hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag == 'symbol'
//Symbol.toStringTag 内置symbol 通常作为对象的属性键使用，属性值为字符串

exports.isPromise = function isPromise(v) {
    if (!hasToStringTag) {
        return toString.call(v) === '[object Promise]'
    }

    return (
        !!v &&
        (typeof v === 'object' || typeof v === 'function') &&
        typeof v.then === 'function'
    )
}