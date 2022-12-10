import { getInputInterator } from "@/utils.ts"
import { extractAddValue } from "./util.ts"
const ROW_LENGTH = 40
let output = ""
interface Target {
  position: number
  register: number
  cycle: number
  spriteRange: [number, number]
}
const target: Target = {
  position: 0,
  register: 1,
  cycle: 1,
  spriteRange: [0, 2]
}
const getPrintPixel = () => {
  const [start, end] = proxyTarget.spriteRange
  return proxyTarget.position >= start && proxyTarget.position <= end ? "#" : "."
}

const proxyTarget = new Proxy(target, {
  get(target: Target, prop: string) {
    if (prop === "position") {
      return target[prop] % ROW_LENGTH
    }

    return target[prop]
  },
  set(target: Target, prop: string, value: number) {
    if (prop === "cycle") {
      output += getPrintPixel()
      target.position++
      target[prop] += 1
    } else if (prop === "register") {
      target.register = value
      target.spriteRange = [value - 1, value + 1]
    }
    return true
  }
})

const processCommand = (line: string) => {
  if (line === "noop") {
    proxyTarget.cycle++
  } else {
    proxyTarget.cycle++
    proxyTarget.cycle++
    proxyTarget.register += extractAddValue(line)
  }
}

for await (let line of await getInputInterator(import.meta)) {
  processCommand(line)
}

let index = 0

while (index < output.length) {
  console.log(output.slice(index, index + ROW_LENGTH))
  index += ROW_LENGTH
}
