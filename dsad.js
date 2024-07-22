function crear() {
  let count = 0
  return function () {
    return ++count
  }
}

const inc = crear()
const a = inc()
const b = inc()
const c = inc()

console.log(c)
