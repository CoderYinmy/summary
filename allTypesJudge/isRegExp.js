const { isObjectLike } = require('./isObjectLike')
const { isToString } = require('./function/toString')

exports.isRegExp = function isRegExp(v) {
    return isObjectLike(v) && isToString.call(v) == '[object RegExp]'
}