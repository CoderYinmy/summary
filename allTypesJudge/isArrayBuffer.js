const {toString} = require('./function/toString')
//Object.prototype.toString.call()
exports.isArrayBuffer = function isArrayBuffer(v){
    return toString.call(v) === '[object ArrayBuffer]'
}