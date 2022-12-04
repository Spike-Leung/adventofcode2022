import { getInputInterator } from "@/utils.ts"
const calories = []

let sum = 0
for await (let line of await getInputInterator(import.meta)) {
  if (line !== "") {
    sum += +line
  } else {
    calories.push(sum)
    sum = 0
  }
}

const res = calories.sort((a, b) => b - a).slice(0, 3).reduce((sum, curr) => sum += curr, 0);
console.log(res)
