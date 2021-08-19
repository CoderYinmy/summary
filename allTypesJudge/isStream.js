const { isObject } = require('./isObject')
const { isFunction } = require('./isFunction')

exports.isStream = function isStream(v) {
    return isObject(v) && isFunction(v.pipe)
}
//pipe 函数