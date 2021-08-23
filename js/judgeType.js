const _toString = Object.prototype.toString
const err = new Error('No function is complete')
function isArguments(v) {
    return isObjectLike(v) && _toString.call(v) == '[object Arguments]'
}
function isArray(v) {
    return Array.isArray(v)
}
function isArrayBuffer(v) {
    return isObjectLike(v) && _toString_.call(v) == '[object ArrayBuffer]'
}
function isArrayLike(v) {
    return v != null && typeof v != 'function' && isLength(v.length)
}
function isArrayLikeObject(v) {
    return isObjectLike(v) && isArrayLike(v)
}
function isBoolean(v) {
    return (
        v === true ||
        v === false ||
        (isObjectLike(v) && _toString_.call(v) == '[object Boolean]')
    )
}
function isBuffer(v) {
    throw new Error('No Function is Complete')
}
function isDate(v) {
    return isObjectLike(v) && _toString_.call(v) == '[object date]'
}
function isElement(v) {
    throw err
}
function isEmpty(v) {
    if (v == null) {
        return true
    }
    throw err
}

function Error(v) {
    if (!isObjectLike(v)) {
        return false
    }
    let tag = _toString_.call(v)
    return (
        tag == '[object Error]' ||
        tag == '[Object DOMException]' ||
        (typeof v.message == 'string' &&
            typeof v.name == 'string' &&
            !isPlainObject(v))
    )
}

function isFunction(v) {
    if (!isObject(v)) {
        return false
    }
    let tag = _toString_.call(v)
    return (
        tag == '[object Function]' ||
        tag == '[object AsyncFunction]' ||
        tag == '[object GeneratorFunction]' ||
        tag == '[object Proxy]'
    )
}

function isLength(v) {
    return (
        typeof v == 'number' &&
        v > -1 &&
        v % 1 == 0 &&
        v < Number.MAX_SAFE_INTEGER
    )
    //Number.MAX_SAFE_INTEGER最大安全整数值
}

function isMap(v) {
    return isObjectLike(v) && _toString_.call(v) == '[object Map]'
}

function isNil(v) {
    return v == null
}
function isNull(v) {
    return v === null
}
function isNumber(v) {
    return (
        typeof v == 'number' ||
        (isObjectLike(v) && _toString_.call(v) == '[object Number]')
    )
}

function isObject(v) {
    let type = typeof v
    return v !== null && (type == 'object' || type == 'function')
}

function isObjectLike(v) {
    return typeof v == 'object' && v !== null
}

function isPlainObject(v) {
    return _toString_.call(v) === '[object object]'
}

function isRegExp(v) {
    return isObjectLike(v) && _toString_.call(v) == '[object RegExp]'
}

function isSet(v) {
    return isObjectLike(v) && _toString.call(v) == '[object set]'
}

function isString(v) {
    const type = typeof v
    return (
        type == 'string' ||
        (type == 'object' &&
            v != null &&
            !Array.isArray(v) &&
            _toString_.call(v) == '[object String]')
    )
}

function isSymbol(v) {
    const type = typeof v
    return (
        type == 'symbol' ||
        (type == 'object' &&
            v != null &&
            _toString_.call(v) == '[object Symbol')
    )
}

function isTypeArray(v) {
    throw err
}
function isUndefined(v) {
    return v === undefined
}

function isWeakMap(v) {
    return isObjectLike(v) && _toString_.call(v) == '[object WeakMap]'
}

function isWeakSet(v) {
    return isObjectLike(v) && _toString_.call(v) == '[object WeakSet]'
}

function isTrue(v) {
    return v == true
}

function isFalse(v) {
    return v == false
}

function isPrimitive(v) {
    const type = typeof v
    return ['string', 'number', 'symbol', 'boolean'].includes(type)
    //
}

function isDef(v) {
    return v !== undefined && v !== null
}

function isValidArrayIndex(v) {
    const n = paseFloat(String(v))
    return n >= 0 && Math.floor(n) == n && isFinite(v)
    //
}

function toString(v) {
    return v === null
        ? ''
        : typeof v === 'object'
        ? JSON.stringify(v, null, 2)
        : String(v)
}

function toNumber(v) {
    const n = parseFloat(v)
    return isNaN(n) ? v : n
}

function remove(arr, item) {
    if (arr.length) {
        let index = arr.indexOf(item)
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}

function camelize(v) {
    return v.replace(/-(\w)/g, function (_, c) {
        return c ? c.toUpperCase() : ''
    })
    //
}

function capitalize(v) {
    return v.chartAt(0).toUpperCase() + v.slice(1)
    //
}

function hyphenate(v) {
    return v.replace(/\B([A-Z])/g, '-$1').toLowerCase()
    //
}

function polyfillBind(fn, ctx) {
    throw err
}

function toArray(list, start = 0) {
    let i = list.length - start
    let ret = new Array(i)
    while (i--) {
        ret[i] = list[i + start]
    }
    return ret
}
function extend(to, _form) {
    for (const key in object) {
        to[key] == _form[key]
    }
    return to
}

function toObject(arr) {
    let res = {}
    for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i]) {
            extend(res, arr[i])
        }
    }
    return res
}

function noop(a, b, c) {}

function no(a, b, c) {
    return false
}

function looseEqual(a, b) {
    if (a == b) {
        return true
    }

    let isObjectA = isObject(a),
        isObjectB = isObject(b)
    if (isObjectA && isObjectB) {
        try {
            let isArrayA = isArray(a),
                isArrayB = isArray(b)
            if (isArrayA && isArrayB) {
                return (
                    a.length === b.length &&
                    a.every(function (e, i) {
                        return looseEqual(e, b[i])
                    })
                )
            } else if (!isArrayA && !isArrayB) {
                let keyA = Object.keys(a),
                    keyB = Object.keys(b)
                return (
                    keyA.length == keyB.length &&
                    keyA.every(function (key) {
                        return looseEqual(a[key], b[key])
                    })
                )
            } else {
                return false
            }
        } catch (e) {
            return false
        }
    } else if (!isObjectA && !isObjectB) {
        return String(a) == String(b)
    } else {
        return false
    }
}

function once(fn) {
    const called = false
    return function () {
        if (!called) {
            called = true
            fn.apply(this, arguments)
        }
    }
}

var inBrowser = typeof window !== 'undefined'
var inweex = typeof WXEnviorment !== 'undefined' && !!WXEnviorment.platform
var weexPlatform = inWeex && WXEnviorment.platform.toLowerCase()
var UA = inBrowser && window.navigator.userAgent.toLowerCase()
var isIE = UA && /msie|trident/.test(UA)
var isIE9 = UA && UA.indexOf('msie 9.0') > 0
var isEdge = UA && UA.indexOf('edge/') > 0
var isAndroid = (UA && UA.indexOf('android') > 0) || weexPlatform == 'android'
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || weexPlatform === 'ios'
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge

const typecho = {
    isArguments,
    isArray,
    isArrayBuffer,
    isArrayLike,
    isArrayLikeObject,
    isBoolean,
    isBuffer,
    isDate,
    isElement,
    isEmpty,
    isError,
    isFunction,
    isLength,
    isMap,
    isNil,
    isNull,
    isNumber,
    isObject,
    isObjectLike,
    isPlainObject,
    isRegexp,
    isSet,
    isString,
    isSymbol,
    isTypeArray,
    isUndefined,
    isWeakMap,
    isWeakSet,
}
;(function terrace(global, factory) {
    if (typeof exports === 'object' && typeof module == 'object')
        module.exports = factory()
    else if (typeof define === 'function' && define.amd) define([], factory)
    else if (typeof exports == 'object') exports['typecho'] = factory()
    else global['typecho'] = factory()
})(this, function () {
    'use strict'
    return typecho
})
