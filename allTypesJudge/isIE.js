exports.isIE = function isIE(v) {
    const re = /msie|trident/;
    return v && re.test(v)
}