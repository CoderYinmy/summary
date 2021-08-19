const { isArrayLike } = require('./isArrayLike');
const { isArray } = require('./isArray');
const { isBuffer } = require('./isBuffer');
const { isArguments } = require('./isArguments');
const { toString } = require('./function/toString');
const { isPrototype } = require('./isPrototype');

exports.isEmpty = function isEmpty(v) {
    if (v == null) {
        return true;
    }

    if (
        isArrayLike(v) &&
        (isArray(v) ||
            typeof v === 'string' ||
            typeof v.splice === 'function' ||
            isBuffer(v) ||
            isArguments(v)
        )
    ) {
        return !v.length
    }

    const tag = toString.call(value);
    if (tag == '[object Map]' || tag == '[object Set]') {
        return !value.size;
    }

    if (isPrototype(v)) {
        return !Object.keys(v).length;
    }

    const hasOwnProperty = Object.prototype.hasOwnProperty;
    for (const key in v) {
        if (hasOwnProperty.call(v, key)) {
            return false
        }
    }

    return true
}