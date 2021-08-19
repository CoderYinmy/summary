const { toString } = require('./function/toString')
const { isObjectLike } = require('./isObjectLike')

exports.isWeakSet = function isWeakSet(v) {
    return isObjectLike(v) && toString.call(v) == '[object WeakSet]'
}