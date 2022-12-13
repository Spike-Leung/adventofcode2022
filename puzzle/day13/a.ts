import { pairs, compare } from "./util.ts"

let rightPairs = []
for (let i = 0; i < pairs.length; i += 2) {
  if (compare(pairs[i], pairs[i + 1])) {
    rightPairs.push(i / 2 + 1)
  }
}

console.log(rightPairs.reduce((acc, cur) => acc += cur, 0))
