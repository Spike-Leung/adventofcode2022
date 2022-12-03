import { readLines } from "https://deno.land/std@0.167.0/io/buffer.ts";
let fileReader = await Deno.open("./input.txt");
const calories = []

let sum = 0
for await (let line of readLines(fileReader)) {
  if (line !== "") {
    sum += +line
  } else {
    calories.push(sum)
    sum = 0
  }
}

const res = calories.sort((a, b) => b - a).slice(0, 3).reduce((sum, curr) => sum += curr, 0);
console.log(res)
