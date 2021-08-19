const { toString } = require('./function/toString')

exports.isSymbol = function isSymbol(v) {
    const type = typeof v
    return (
        type === 'Symbol' ||
        (type === 'object' &&
            v != null &&
            toString.call(v) === '[object Symbol]'
        )
    )
}