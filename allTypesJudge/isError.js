const { isObjectLike } = require('./isObjectLike');
const { toString } = require('./function/toString');
const { isPlainObject } = require('./isPlainObject');

exports.isError = function isError(v) {
    if (!isObjectLike(v)) {
        return false;
    }

    let tag = toString.call(v);
    return (
        tag == '[object Error]' ||
        tag == '[object DOMException]' ||
        (typeof v.message == 'string' &&
            typeof v.name == 'string' &&
            !isPlainObject(v))
    )
}