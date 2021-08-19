exports.isEveryFalsy = function isEveryFalsy(...args){
    return args.every(v => !Boolean(v))
}
/**
 * 存在Boolean类型，以供逻辑判断使用
 * falsy 逻辑判断时均为false  false null undefined 正负0 NAN “”
 * truthy 逻辑判断时均为true infinity  空数组  “0”
 * 除了boolean之外，所有的js值均可进行逻辑判断
 */