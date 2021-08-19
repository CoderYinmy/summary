exports.isPrototype = function isPrototype(v) {
    const objectProto = Object.prototype;
    const ctor = v && v.constructor;
    const proto = (typeof ctor === 'function' && ctor.prototype) || objectProto;
    return v === proto;
}