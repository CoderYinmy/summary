/**
 * 用时间戳解决IEget请求缓存
 */
let url
let time = new Date().getTime()
url = url.indexOf('?') == -1 ? url + '?_t=' + time : url + '&_t=' + time

/**
 * 解决IE get 请求缓存  和  参数乱码问题
 */
const queryString = require('query-string')
if (config.method == 'get') {
    let request = config.url.split('?')[0]
    let paramsParams = config.url.split('?')[1]
    if (paramsParams && paramsParams !== undefined) {
        let paramsArr = paramsParams.split('&')
        var obj = { _t: new Date().getTime() }
        for (var i = 0; i < paramsArr.length; i++) {
            var newArr = paramsArr[i].split('=')
            obj[newArr[0]] = newArr[1]
        }
        config.url = request + '?' + queryString.stringify(obj)
    }
}
