const {isObjectLike} = require('./isObjectLike')
const {toString} = require('./function/toString')

exports.isDate = function isDate(v) {
    return isObjectLike(v) && toString.call(v) == '[object Date]';
}