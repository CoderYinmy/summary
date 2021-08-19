exports.isLength = function isLength(v) {
    return (
        typeof v == 'number' &&
        v >-1 &&
        v % 1 == 0 &&
        v < Number.MAX_SAFE_INTEGER
    )
}
//MAX_SAFE_INTEGER 在js中最大的安全整数