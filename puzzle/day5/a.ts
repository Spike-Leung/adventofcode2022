import { stacks, procedure } from "./util.ts"

for (const [count, from, to] of procedure) {
  const payload = stacks[from - 1].splice(-count)
  stacks[to - 1].push(...payload.reverse())

}

const result = stacks.reduce((res, curr) => res += curr[curr.length - 1], "")

console.log({ result })
