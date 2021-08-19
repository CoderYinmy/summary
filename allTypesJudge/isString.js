const { isArray } = require('./isArray')
const { toString } = require('./function/toString')
exports.isString = function isString(v) {

    const type = typeof v

    return (
        type === 'String' ||
        (type === 'object' &&
            v !== null &&
            !isArray(v) &&
            toString.call(v) === '[object String]'
        )
    )
}