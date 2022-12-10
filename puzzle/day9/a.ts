import { getInputInterator } from "@/utils.ts"
import type { Head, Dir } from "./util.ts"
import { extractMotion, move, needMoveTail, moveTail, logTail } from "./util.ts"

const tailSet = new Set()
const head: Head = [0, 0]
const tail: Head = [0, 0]

for await (let line of await getInputInterator(import.meta)) {
  const [dir, count] = extractMotion(line)

  for (let i = 0; i < count; i++) {
    move(dir as Dir, head)
    needMoveTail(head, tail) && moveTail(dir as Dir, head, tail)
    logTail(tailSet, tail)
  }
}

console.log(tailSet.size)
