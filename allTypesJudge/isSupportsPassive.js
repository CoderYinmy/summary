exports.isSupportsPassive = function isSupportsPassive() {
    var supportsPassive = false
    try {
        var opts = Object.defineProperty({}, 'passive',{
            get: function get() {
                supportsPassive = true
            }
        })
        window.addEventListener('testSupportPassive', null, opts)
    } catch (error) {
        
    }
    return supportsPassive
}

//
/**
 * option  {
 *      capture  事件捕获阶段传播到该 事件时触发
 *      passive  为true时 永远不处罚  preventDefault()
 *      once  调用一次后失效
 * }
 */