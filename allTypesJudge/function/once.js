exports.once = function once(fn) {
    let called = false

    return function() {
        if(!called) {
            called = true
            fn.apply(this, arguments)
        }
    }
}