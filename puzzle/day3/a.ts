import { readLines } from "https://deno.land/std@0.167.0/io/buffer.ts";
import count from "./util.ts"

const fileReader = await Deno.open("./input.txt");
let sum = 0

function findSameChar(str) {
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


for await (let line of readLines(fileReader)) {
  sum += (count[findSameChar(line)] ?? 0)
}

console.log({ sum })
