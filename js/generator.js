const createGenerator = function() {
  let index = 1
  let sum = 0

  return {
    next: function() {
      index++
      sum += index

      return {
        value: index,
        done: sum > 1000
      }
    }
  }
}

const gen = createGenerator()

let it

while (!(it = gen.next()).done);

console.log(`index is ${it.value}`)
