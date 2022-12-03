import { readLines } from "https://deno.land/std@0.167.0/io/buffer.ts";
import count from "./util.ts"

const fileReader = await Deno.open("./input.txt");
let sum = 0

function findBadgeInGroup(groups: string[]) {
  if (groups.length === 0) {
    return ''
  }

  groups.sort((a, b) => a.length - b.length)
  const [base, str1, str2] = groups;
  const baseChar = Array.from(new Set([...base]));

  for (let char of baseChar) {
    if (str1.indexOf(char) !== -1 && str2.indexOf(char) !== -1) {
      return char
    }
  }

  return ''
}

let group = []
for await (let line of readLines(fileReader)) {
  group.push(line)

  if (group.length === 3) {
    const badge = findBadgeInGroup(group)
    sum += count[badge]
    group = []
  }
}

console.log({ sum })
