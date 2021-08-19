const {toString} = require('./function/toString')
const {isObjectLike} = require('./isObjectLike')
exports.isArguments = function isArguments(v) {
    return isObjectLike(v) && toString.call(v) === '[object Arguments]'
}