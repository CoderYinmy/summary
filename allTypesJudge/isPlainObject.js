const {toString} = require('./function/toString')

exports.isPlainObject = function isPlainObject(v) {
    return toString.call(v) === '[object object]'
}