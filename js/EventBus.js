class EventBus {
    constructor() {
        this.obj = {};
    }

    publish(name) {
        const params = Array.prototype.slice.call(arguments, 1);
        const list = this.obj[name] || []

        for (const fn of list) {
            fn.apply(null, params)
        }
    }

    subscribe(name, fn) {
        this.obj[name] = this.obj[name] || []

        this.obj[name].push(fn)
    }
}



const eventBus = new EventBus()

eventBus.subscribe('xiao', function (...args) {
    console.log(...args)
})


eventBus.subscribe('xiao', function (...args) {
    console.log(...args)
})


eventBus.subscribe('wen', function () {
    console.log('xiaoming 阅了 abc')
})


// wen 订阅公众号名字
eventBus.subscribe('wen', function () {
    // 订阅行为
    console.log('xiaohong 订阅了 abc')
})

eventBus.publish('xiao', 'abc', 'ce', '123')

// 广播