import { readLines } from "https://deno.land/std@0.167.0/io/buffer.ts";
const fileReader = await Deno.open("./input.txt");

let count = 0

function isPairFullyContain(pairs: string): boolean {
  const [pair1, pair2] = pairs.split(",")
  const [start1, end1] = pair1.split("-").map((s) => +s)
  const [start2, end2] = pair2.split("-").map((s) => +s)

  const pair1ContainsPair2 = start1 <= start2 && end1 >= end2
  const pair2ContiansPair1 = start2 <= start1 && end2 >= end1

  return pair1ContainsPair2 || pair2ContiansPair1
}


for await (let line of readLines(fileReader)) {
  count += isPairFullyContain(line) ? 1 : 0
}

console.log({ count })
