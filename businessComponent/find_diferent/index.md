#### 找不同小游戏（h5、vue、canvas）

用到 EventBus
在 main.js 配置
Vue.prototype.$eventbus = {
    fns: [],
    on: function(fn){
        this.fns.push(fn)
    },
    emit: function(ctx){
        const rest = Array.prototype.slice.call(arguments, 1) || [];
        this.fns.forEach(function(fn){
            fn.apply(ctx || null, rest)
        })
    }
}
页面中调用
Vue.prototype.$eventbus.emit(null, 3, res.data.data.user_info);
this.$eventbus.on(function (res) {
console.log(res, arguments);
});
