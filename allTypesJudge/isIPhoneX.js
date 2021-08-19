const { isIPhone } = require('./isIPhone');

exports.isIPhomeX = function isIPhoneX(v) {
    if (!isIPhone(v)) {
        return false
    }

    const { width, height } = window.screen
    return (
        (height === 812 && width === 375) || (height === 896 && width === 414)
    )
}