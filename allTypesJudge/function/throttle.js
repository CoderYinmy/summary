/**
 * 节流
 */

var throttle = function (func, wait, options) {
    var timeOut, context, args, result;
    var previous = 0;
    if (!options) options = {}

    var later = function () {
        previous = options.leading === false ? 0 : Date.now()
        timeOut = null
        result = func.apply(context, args)
        if (!timeOut) context = args = null
    }

    var throttled = function() {
        var now = Date.now()
        if(!previous && options.leading === false) previous = now
        var remaining = wait - ( now - previous)
        context = this
        args = arguments
        if(remaining <= 0 || remaining > wait) {
            if(timeOut) {
                clearTimeout(timeOut)
                timeOut = null
            }
            previous = now
            result = func.apply(context, args)
            if (!timeOut) context = args = null
        }else if(!timeOut && options.traing !== false) {
            timeOut = setTimeout(later, remaining)
        }
        return result
    }
    throttled.cancle = function() {
        clearTimeout(timeOut)
        previous = 0
        timeOut = context = args = null
    }

    return throttled
}

exports.throttle = throttle