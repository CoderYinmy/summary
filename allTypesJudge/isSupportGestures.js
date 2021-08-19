exports.isSupportGestures = function isSupportGestures() {
    return 'ongesturesStart' in window
}
//手势事件   开始