// Function.prototype.bind 

// 简写
// Function.prototype.bind = function(context) {
//     var self = this
//     return function(){
//         return self.apply(context, arguments)
//     }
// }


// 复杂

Function.prototype.bind = function() {
    let self = this,context = [].shift.call(arguments),args = [].slice.call(arguments)
    return function(){
        return self.apply(context, [].concat.call(args, [].slice.call(arguments)))
    }
    
}

var obj={
    name:'lili'
}

var func = (function(a, b, c, d) {
    console.log(this.name,[a,b,c,d])
}).bind(obj,1,2)
func(3, 4)