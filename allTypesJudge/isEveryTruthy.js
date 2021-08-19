exports.isEveryTruthy = function isEveryTruthy(...args){
    return args.every(Boolean)
}