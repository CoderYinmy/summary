const { isObjectLike } = require('./isObjectLike')
const { toString } = require('./function/toString')

exports.isSet = function isSet(v) {
    return isObjectLike(v) && toString.call(v) == '[object Set]'
}