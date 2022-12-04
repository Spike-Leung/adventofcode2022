import { getInputInterator } from "@/utils.ts"
let sum = 0
let max = 0

for await (let line of await getInputInterator(import.meta)) {
  if (line !== "") {
    sum += +line
  } else {
    max = Math.max(max, sum)
    sum = 0
  }
}

console.log({ max })
