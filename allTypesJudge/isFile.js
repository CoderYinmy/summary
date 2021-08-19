const {toString} = require('./function/toString')
exports.isFile = function isFile(v) {
    return toString.call(v)
}