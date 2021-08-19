exports.isBlob = function isBlob(v) {
    return toString.call(v) === '[object Blob]'
}