exports.isSomeFalsy = function isSomeFalsy(...arg) {
    return  arg.some(v => !Boolean(v))
}