const {isArrayLike} = require('./isArrayLike')
const {isObjectLike} = require('./isObjectLike')

exports.isArrayLikeObject = function isArrayLikeObject(v) {
    return isObjectLike(v) && isArrayLike(v)
}