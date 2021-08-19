const {deepmerge} = require('./deepmerge')

exports.deepclone = function deepclone(value, deep) {
    deep = deep == true
    return deepmerge(deep, {}, value)
}