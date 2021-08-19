exports.isIOS = function isIOS(v) {
    return v && /iphone|ipad|ipod|ios/.test(v)
}