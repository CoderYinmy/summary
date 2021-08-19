exports.EventBus = function EventBus() {
    let subScriptions = {}
    this.subScribe = function subscriptCallbackToEvent(eventType, callback){
        let id = Symbol('id')
        if(!subScriptions[eventType]) subScriptions[eventType] = {}
        subScriptions[eventType][id] = callback


        return {
            unsubScribe: function() {
                delete subScriptions[eventType][id]
                if(Object.getOwnPropertySymbols(subScriptions[eventType]).length === 0) {
                    delete subScriptions[eventType]
                }
            }
        }
    },
    this.publish = function publishEventWithArgs(eventType, args) {
        if(!subScriptions[eventType]) return
        Object.getOwnPropertySymbols(subScriptions[eventType]).forEach(function(key){
            return subScriptions[eventType][key](args)
        })
    }  
}