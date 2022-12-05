import { getInputInterator } from "@/utils.ts"

let isCrate = true
const crates: string[][] = []
const procedure = []

for await (let line of await getInputInterator(import.meta)) {
  if (line === "") {
    isCrate = false
    continue
  }

  if (isCrate) {
    crates.push(line.split(" "))
  } else {
    const [_, count, from, to] = line.match(/move (\d+) from (\d+) to (\d+)/) ?? []
    procedure.push([+count, +from, +to])
  }
}

const stacks = (function buildStack() {
  const n = crates.length
  const stackCount = crates[n - 1].filter((i) => i !== "").length
  const stacks: string[][] = Array.from({ length: stackCount }, () => [])

  for (let k = n - 2; k >= 0; k--) {
    const line = crates[k]
    for (let i = 0; i < stackCount; i++) {
      const crate = line.shift()

      // skip empty crate
      if (crate === "") {
        for (let j = 0; j < 3; j++) {
          line.shift()
        }
        continue
      }

      crate && stacks[i].push(crate?.match(/\[(.*)\]/)[1])
    }
  }

  return stacks
})()


export { stacks, procedure }
