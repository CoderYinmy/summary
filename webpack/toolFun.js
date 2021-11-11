// 让一个方法及支持 callback 又支持 Promise
function _get(callback){
    try {
        callback(null, 1)
    } catch (error) {
        callback(error)
    }
}

function get(options, callback){
    if(callback){
        _get(callback)
    }else{
        return new Promise(function(resolve, reject){
            _get(function(err, data){
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    }
}