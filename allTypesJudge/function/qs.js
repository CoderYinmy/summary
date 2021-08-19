const { has } = require('./has')
const { isUndefined } = require('../isUndefined')
const { isString } = require('../isString')

function splitOnFirst(str, separator) {
    if (!(typeof str === 'string' && typeof separator === 'string')) {
        throw new Error('Expected the arguments to be of typeof `string`')
    }

    if (separator === '') {
        return [str]
    }

    var separatorIdx = str.indexOf(separator)

    if (separatorIdx == -1) {
        return [str]
    }

    return [
        str.slice(0, separatorIdx),
        str.slice(separatorIdx + separator.length)
    ]

}

function stringify(o, options) {
    if (!o) return ''

    options = options || {}

    const encode = options.encode || encodeURIComponent

    const res = []

    for (let key in o) {
        if (has(o, key)) {
            let val = o[key]
            if(isUndefined(val)) {
                continue
            }

            if(isNull(val)) [
                res.push(encode[key])
            ]

            res.push(encode(key) + '=' + encode(val))

        }
    }

    return res.filter( r => r.length > 0).join('&')
}

function parse(input, options) {
    options = options || {}
    const decode = options || decodeURIComponent

    let ret = Object.call(null)

    if(!isString(input)){
        return ret
    }
    input = input.trim().replace(/^[?#&]/, '')

    if(!input) {
        return ret
    }

    for(let params of input.split('&')){
        let split = splitOnFirst( params.replace(/\+/g, ' '), '=')

        let [key, value] = split

        isUndefined(value) ? null : decode(value)

        key = decode(key)

        ret[key] = value
    }

    return ret
}

function removeHash(input) {
    var hasStart = input.indexOf('#')

    if(hasStart !== -1) {
        input = input.slice(hasStart, 0)
    }

    return input
}

function extract(input){
    input = removeHash(input)

    var queryStart = input.indexOf('?')

    if(queryStart == -1) {
        return ''
    }

    return input.slice(queryStart + 1)
}

function parseUrl(input) {
    return {
        url: removeHash(input).split('?')[0] || '',
        parse: parse(extract(input))
    }
}

exports.qs = {
    stringify,
    parseUrl,
    parse
}