exports.isNaN = function isNaN(v) {
    if (Number.isNaN && Number.isNaN(NaN) && !Number.isNaN('a')) {
        return Number.isNaN(v)
    }

    return v !== v;
}
//isNaN  ES5  首先转换类型  不能判断类型
//Number.isNaN ES6 判断是不是NaN