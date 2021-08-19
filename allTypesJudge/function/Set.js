function Set() {
    this.set = Object.create(null)
}

Set.prototype.has = function has(key) {
    return this.set[key] === true
}

Set.prototype.add = function add(key) {
    this.set[key] = true
}

Set.prototype.clear = function clear(key) {
    this.set = Object.create(null)
}

exports.Set = Set