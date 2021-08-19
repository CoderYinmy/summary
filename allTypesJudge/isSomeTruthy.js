exports.isSomeTruthy = function isSomeTruthy(...arg) {
    return arg.some(v => { Boolean })
}