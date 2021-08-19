exports.isWeex = function isWeex() {
    typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform
}

//判断是否为微信环境