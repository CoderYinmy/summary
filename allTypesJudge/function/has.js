exports.has = function has(object, key) {
    const hasOwnProperty = Object.prototype.hasOwnProperty

    return object != null && hasOwnProperty.call(object, key)
}