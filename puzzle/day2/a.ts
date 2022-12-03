import { readLines } from "https://deno.land/std@0.167.0/io/buffer.ts";
let fileReader = await Deno.open("./input.txt");
let score = 0

for await (let line of readLines(fileReader)) {

}

console.log(score)
