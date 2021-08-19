function compose(middleware) {
    if (!Array.isArray(middleware)) {
        throw new TypeError()
    }

    for (const fn of middleware) {
        if (typeof fn !== 'function') {
            throw new TypeError()
        }
    }

    return function (context, next) {
        function dispatch(i) {
            if (i <= index) {
                debugger
                return Promise.reject(new Error())
            }

            index = i
            let fn = middleware[i]
            if (i === middleware.length) {
                fn = next
            }

            if (!fn) {
                debugger
                return Promise.resolve()
            }

            try {
                return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
            } catch (err) {
                return Promise.reject(err)
            }
        }

        let index = -1
        return dispatch(0)
    }
}

class App {
    constructor(respond, onerror = () => { }) {
        this.respond = respond

        this.ctx = {
            onerror: onerror,
        }
        this.middleware = []
    }

    use(middleware) {
        this.middleware.push(middleware)

        return this
    }

    execute() {
        const fn = compose(this.middleware)

        this.handleRequest(this.ctx, fn)
    }

    handleRequest(ctx, fnMiddleware) {
        const onerror = (err) => ctx.onerror(err)
        const handleResponse = () => this.respond(ctx)
        return fnMiddleware(ctx).then(handleResponse).catch(onerror)
    }
}

const app = new App()

app.use(function (ctx, next) {
    console.log(1)

    next()
})

app.use(function (ctx, next) {
    console.log(2)
    next()
})

app.execute()


class Handler {
    next: Handler | null

    public setNext(next: Handler | null) {
        this.next = next
    }

    getNext(): Handler | null {
        return this.next
    }

    handleRequest(_: any): void {
        throw new Error('handleRequest must be implement')
    }
}

class ConcreteHandler extends Handler {
    handleRequest(day) {
        if (day < 2) {
        } else {
            if (this.getNext() !== null) {
                this.getNext().handleRequest(day)
            } else {
            }
        }
    }
}

const chain1 = new ConcreteHandler()
chain1.setNext(null)