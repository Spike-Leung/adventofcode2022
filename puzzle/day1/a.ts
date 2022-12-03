import { readLines } from "https://deno.land/std@0.167.0/io/buffer.ts";
let fileReader = await Deno.open("./input.txt");
let sum = 0
let max = 0

for await (let line of readLines(fileReader)) {
  if (line !== "") {
    sum += +line
  } else {
    max = Math.max(max, sum)
    sum = 0
  }
}

console.log({ max })
