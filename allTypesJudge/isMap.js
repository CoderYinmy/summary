const { isObjectLike } = require('./isObjectLike')
const { toString } = require('./function/toString')

exports.isMpap = function isMap(v) {
    return isObjectLike(v) && toString.call(v) == '[object Map]'
}