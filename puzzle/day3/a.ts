import { getInputInterator } from "@/utils.ts"

import count from "./util.ts"
let sum = 0

function findSameChar(str: string) {
  const half = str.length / 2
  const left = str.slice(0, half)
  const rightArr = [...str.slice(half)]

  for (const char of rightArr) {
    if (left.indexOf(char) !== -1) {
      return char
    }
  }

  return ''
}


for await (let line of await getInputInterator(import.meta)) {
  sum += (count[findSameChar(line)] ?? 0)
}

console.log({ sum })
