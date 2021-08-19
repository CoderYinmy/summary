const { toString } = require('./function/toString')
const {isObjectLike } = require('./isObjectLike')

exports.isWeakMap = function isWeakMap(v) {
    return isObjectLike(v) && toString.call(v) == '[object WeakMap]'
}