exports.isUrlSearchParams = function isUrlSearchParams(v) {
    typeof URLSearchParams !== 'undefined' && v instanceof URLSearchParams
}

//URLSearchParams 是一个对象，定义了一些实用的url查询方法