const {isObjectLike} = require('./isObjectLike');
const {isPlainObject} = require('./isPlainObject');

exports.isElement = function isElement(v) {
    return isObjectLike(v) && v.nodeType === 1 && !isPlainObject(v);
}