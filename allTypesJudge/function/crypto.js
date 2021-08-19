const crypto = require('crypto')
//加密  解密
exports.Crypto = class Crypto {
    constructor(key) {
        this.key = key
    }
    encrypto(raw) {
        const cipher = crypto.createCipheriv('aes-128-cbc', this.key, getIv())
        cipher.setAutoPadding(true)
        let crypted = cipher.update(raw, 'utf8', 'binary')
        crypted += cipher.final('binary')
        return Buffer.from(crypted, 'binary').toString('base64')
    }

    decrypto(raw) {
        const cipherChunks = []
        const decipher = crypto.createDecipheriv('aes-128-cbc',
            this.key,
            getIv()
        )
        decipher.setAutoPadding(true)
        cipherChunks.push(decipher.update(raw, 'base64', 'utf8'))
        cipherChunks.push(decipher.update('utf8'))

        return cipherChunks.join('');
    }

}