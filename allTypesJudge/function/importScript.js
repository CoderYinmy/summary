const { has } = require('./has')
exports.importScript = function importScript(url, options) {
    options = options || {}
    const node = document.createElement('script')
    const attrs = options.attrs || {}
    for(const key in attrs) {
        if(has(attrs ,key)){
            node.setAttribute(key, attrs[key])
        }
    }

    node.src = url
    const successCallable = options.successCallable
    const failureCallable = options.failureCallable

    node.onload = function (e) {
        successCallable || successCallable(e)
    }

    node.onerror = function(e) {
        failureCallable || failureCallable(e)
    }
    
    document.head.appendChild(node)

    return node
}