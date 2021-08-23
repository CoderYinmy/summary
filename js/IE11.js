/**
 * 解决IE11浏览器get请求缓存问题（加时间戳） _t: new Date().getTime()
 * 解决get请求中文乱码问题  queryString.stringify(obj)
 */
const queryString = require('query-string')
axios.interceptors.request.use(
    function(config) {
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
    },
    function(error) {
        return Promise.reject(error)
    }
)