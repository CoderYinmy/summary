const { has } = require('./has')

exports.importCss = function importCss(url, options) {
    options = options || {}
    const attrs = options.attrs || {}

    const node = document.createElement('link')
    node.setAttribute('rel' ,'stylesheet')
    for(let key in attrs) {
        if(has(attrs, key)) {
            node.setAttribute(key, attrs[key])
        }
    }
    node.href = url
    document.head.appendChild(node)
    return node
}