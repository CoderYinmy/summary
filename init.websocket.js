var heartCheck = {
    timeout: 100000,
    serverTimeoutObj: null,
    reset: function () {
        clearTimeout(this.serverTimeoutObj)
        return this
    },
    start: function (websocket, options) {
        this.serverTimeoutObj = window.setInterval(() => {
            if (websocket.readyState === 1) {
                websocket.send('ping')
            } else {
                console.log('websocket stop', websocket.readyState)
                window.clearTimeout(this.serverTimeoutObj)
                creatSocket(options)
            }
        }, this.timeout)
    },
}

/**
 * 创建一个新的websocket对象
 * @param {object} options
 * @return websocket
 */

export default function creatSocket(options) {
    let websocket
    if (window.WebSocket) {
        if (!websocket) {
            websocket = new WebSocket(options.url)
        }
    } else {
        console.log('not support websocket')
    }
    websocket.onopen = function (e) {
        heartCheck && heartCheck.start && heartCheck.start(websocket, options) //启动心跳
        window.webSocket = websocket
        options.success && options.success(e, websocket)
    }
    websocket.onmessage = function (e) {
        options.message && options.message(e)
    }
    websocket.onerror = function (e) {
        options.error && options.error(e)
    }
    websocket.onClose = function (e) {
        options.close && options.close(e)
    }

    window.addEventListener('unbeforeload', function () {
        return websocket.close()
    })

    return websocket
}
/**
 * 使用
 */
// let self = this
// let socket = creatSocket({
//     url: 'ws//192.168.20.12:9090/webSocket',
//     success: function (e, w) {
//         self.webSocket = w
//         console.log('连接成功')
//     },
//     message: function (e) {
//         // self.webSocket.close()//关闭websocket
//     },
//     error: function (e) {},
//     close: function (e) {},
// })
// return (self.websocket = socket)
