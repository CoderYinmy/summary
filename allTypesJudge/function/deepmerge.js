const {toString} = require('./toString')
const slice = Array.prototype.slice
const {isPlanObject} = require('../isPlainObject')
const isArray = require('../isArray')
const isBoolean = require('../isBoolean')

function merge(target, source, deep) {
    for(let key in source) {
        if(deep && (isPlanObject(source[key]) || isArray(source[key]))) {
            if(isPlanObject(source[key]) && !isPlanObject(source[key])){
                target[key] = {};
            }

            if(isArray(source[key]) && !isArray(source[key])){
                target[key] = []
            }

            merge(target[key], source[key], deep)
        }else if(source[key] !== void 0 ){
            target[key] = source[key]
        }
    }
}

function deepmerge(target) {
    var deep, arg, args = slice.call(arguments, 1);

    if(isBoolean(target)) {
        deep = target;
        target = args.shift();
    }
    let i, len
    for(i=0,len = args.length; i < len;i++){
        arg = args[i]
        merge(target, arg, deep)
    }
    return target
}

exports.deepmerge = deepmerge