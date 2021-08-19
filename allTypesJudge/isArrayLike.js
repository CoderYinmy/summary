const { isLength } = require('./isLength')

exports.isArrayLike = function isArrayLike(v) {
    return v != null && typeof v != 'function' && isLength(v.length);
}