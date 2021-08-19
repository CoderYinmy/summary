const MAX_SAFE_INTEGER = 9007199254740991;
const re = /^(?:0|[0-9]\d*)$/;
exports.isArrayIndex = function isArrayIndex(value, length) {
    const type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER : length;

    return (!!length && (type === 'number' || (type !== 'symbol' && re.test(value))) &&
        value > -1 && 
        value % 1 == 0 && 
        value < length
    )
}