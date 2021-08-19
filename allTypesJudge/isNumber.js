const { isObjectLike } = require('./isObjectLike')
const { toString } = require('./function/toString')

exports.isNumber = function isNumber(v) {
    return (
        typeof v == 'number' ||
        (isObjectLike(v) && toString.call(v) == '[object Number]')
    )
}