const {isEdge} = require('./isEdge');

exports.isChrome = function isChrome(v) {
    return v && /chrome\/\d+/.test(v) && !isEdge;
}