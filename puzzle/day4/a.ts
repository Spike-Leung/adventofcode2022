import { getInputInterator } from "@/utils.ts"

let count = 0

function isPairFullyContain(pairs: string): boolean {
  const [pair1, pair2] = pairs.split(",")
  const [start1, end1] = pair1.split("-").map((s) => +s)
  const [start2, end2] = pair2.split("-").map((s) => +s)

  const pair1ContainsPair2 = start1 <= start2 && end1 >= end2
  const pair2ContiansPair1 = start2 <= start1 && end2 >= end1

  return pair1ContainsPair2 || pair2ContiansPair1
}

for await (let line of await getInputInterator(import.meta)) {
  count += isPairFullyContain(line) ? 1 : 0
}

console.log({ count })
