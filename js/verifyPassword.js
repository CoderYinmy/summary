function verifyPass(passwordRuleData,value) {
    if (passwordRuleData.complexity == 1) {
        if (/^\d{1,}$/.test(value) == false) {
            return '密码必须设置为纯数字'
        }
    }
    if (passwordRuleData.complexity == 2) {
        if (
            /^(([a-z]+[0-9]+)|([0-9]+[a-z]+))[a-z0-9]*$/i.test(value) == false
        ) {
            return '密码中必须包含数字+字母'
        }
    }
    if (passwordRuleData.complexity == 3) {
        if (
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{1,}$/.test(value) ==
            false
        ) {
            return '密码中必须包含数字+大小写字母'
        }
    }
    if (passwordRuleData.complexity == 4) {
        if (
            /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{1,}$/.test(
                value
            ) == false
        ) {
            return '密码中必须包含大小写字母+数字+特殊字符'
        }
    }
    if( value.length < passwordRuleData.minLenght) {
        return '密码长度不能小于'+ passwordRuleData.minLenght
    }
}
export default verifyPass