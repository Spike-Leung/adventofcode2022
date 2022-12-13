import { getInputInterator } from "@/utils.ts"

export const pairs = []

function parseLineToArray(line: string) {
  const stack = []

  for (let s of line) {
    if (s === '[') {
      stack.push([])
    } else if (s === ',') {
      continue
    } else if (s === ']') {
      if (stack.length > 1) {
        const arr = stack.pop()
        stack[stack.length - 1].push(arr)
      }
    } else {
      stack[stack.length - 1].push(+s)
    }
  }

  return stack.pop()
}

export function compare(a, b, oneTimeMatch = false) {
  if (typeof a === "number" && typeof b === "number") {
    return a <= b
  } else if (typeof a === "number" && typeof b === "object") {
    return compare([a], b, true)
  } else if (typeof a === "object" && typeof b === "number") {
    return compare(a, [b], true)
  } else if (typeof a === "object" && typeof b === "object") {
    if (oneTimeMatch) {
      return compare(a[0], b[0])
    }
    if (b.length < a.length) {
      return false
    }

    let res = true

    for (let i = 0; i < a.length && res; i++) {
      res = compare(a[i], b[i])
    }

    return res
  }
}


for await (let line of await getInputInterator(import.meta)) {
  if (line) {
    pairs.push(parseLineToArray(line))
  }
}
