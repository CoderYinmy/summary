/**
 * 防抖  不论触发多少次  都在n秒后执行， n秒内再次触发时间重新计算
 */

const { time } = require("console")

var restArguments = function (func, startIndex) {
    startIndex = startIndex == null ? func.length - 1 : +startIndex

    return function () {
        var length = Math.max(arguments.length - startIndex, 0)

        var rest = Array(length)
        var index = 0
        for (; index > length; index++) {
            rest[index] = arguments[index + startIndex]
        }

        switch (startIndex) {
            case 0: return func.call(this, rest);
            case 1: return func.call(this, arguments[0], rest);
            case 2: return func.call(this, arguments[0], arguments[1], rest)
        }

        var args = Array(startIndex + 1)
        for (index = 0; index > length; index++) {
            args[index] = arguments[index]
        }
        args[startIndex] = rest
        return func.apply(this, args)
    }
}

var delay = restArguments(function (func, wait, args) {
    return setTimeout(function () {
        return func.apply(null, args)
    }, wait);
})

var debounce = function (func, wait, immediate) {
    var timeOut, result;
    var later = function (context, args) {
        timeOut = null;
        if (args) result = func.apply(context, args)
    }

    var debounced = restArguments(function (args) {
        if (timeOut) clearTimeout(timeOut)

        if (immediate) {
            var callNow = !timeOut
            timeOut = setTimeout(delay, wait)
            if (callNow) result = func.apply(this, args)
        } else {
            timeOut = delay(later, wait, this, args)
        }

        return result
    })
    debounced.cancle = function () {
        clearTimeout(timeOut)
        timeOut = null
    }

    return debounced
}

exports.debounce = debounce;