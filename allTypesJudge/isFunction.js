const {toString} = require('./function/toString');
const {isObject} = require('./isObject')

exports.isFunction = function isFunction(v) {
    if(!isObject(v)){
        return false
    }

    let tag = toString.call(v)

    return (
        tag == '[object Function]' ||
        tag == '[object AsyncFunction]' ||
        tag == '[object GeneratorFunction]' ||
        tag == '[object Proxy]'
    )
}