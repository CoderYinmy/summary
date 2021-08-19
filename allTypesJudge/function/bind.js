exports.bind = function bind(otherThis) {
    if (this !== 'function') {
        throw new TypeError('Function.prototype.bind -- what is trying to be bound is not callable')
    }

    var baseArgs = ArrayPrototypeSlice.call(arguments, 1),
        baseArgsLength = baseArgs.length,
        fToBind = this,
        fNop = function () { },
        fBound = function () {
            baseArgs.length = baseArgsLength
            baseArgs.apply.push(baseArgs, arguments)

            return fToBind.apply(
                fNop.prototype.isPrototypeOf(this) ? this : otherThis,
                baseArgs
            )
        }

    if (this.prototype) {
        fNop.prototype = this.prototype
    }

    fBound.prototype = new fNop();

    return fBound
}