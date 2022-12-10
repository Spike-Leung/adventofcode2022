let register = 1
export let sum = 0
const LOG_CYCLE = [20, 60, 100, 140, 180, 220]

const target = {
  val: 1
}
const proxyCycle = new Proxy(target, {
  set(target, prop, value) {
    target[prop] += 1
    if (LOG_CYCLE.includes(target[prop])) {
      console.log({ cycle: target[prop], sum: calcSignalLength(target[prop], register), register })
      sum += calcSignalLength(target[prop], register)
    }
    return true
  }
})

export const calcSignalLength = (cycle: number, register: number): number => {
  return cycle * register
}

export const extractAddValue = (line: string): number => {
  const [mark, val] = line.split(" ")

  return +val
}

export const processCommand = (line: string) => {
  if (line === "noop") {
    proxyCycle.val++
  } else {
    proxyCycle.val++
    console.log({ register, val: extractAddValue(line) })
    register += extractAddValue(line)
    proxyCycle.val++
  }
}
