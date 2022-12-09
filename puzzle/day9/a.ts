import { getInputInterator } from "@/utils.ts"

type Dir = 'U' | 'D' | 'L' | 'R'
type Head = [number, number]
const tailSet = new Set()
const head: Head = [0, 0]
const tail: Head = [0, 0]

const extractMotion = (line: string) => {
  const [dir, count] = line.split(" ")

  return [dir, +count]
}

const move = (dir: Dir, target: Head) => {
  switch (dir) {
    case 'U':
      target[1] -= 1
      break
    case 'D':
      target[1] += 1
      break
    case 'L':
      target[0] -= 1
      break
    case 'R':
      target[0] += 1
      break
  }
}

const needMoveTail = () => {
  const dx = Math.abs(head[0] - tail[0])
  const dy = Math.abs(head[1] - tail[1])
  return dx > 1 || dy > 1
}

const inSameRowOrCol = () => {
  const dx = Math.abs(head[0] - tail[0])
  const dy = Math.abs(head[1] - tail[1])

  return dx === 0 || dy === 0
}

const moveTail = (dir: Dir) => {
  if (inSameRowOrCol()) {
    move(dir, tail)
  } else {
    const rowDir = head[0] - tail[0] > 0 ? 'R' : 'L'
    const colDir = head[1] - tail[1] > 0 ? 'D' : 'U'
    move(rowDir, tail)
    move(colDir, tail)
  }


}

const logTail = () => {
  const key = tail.join(",")

  if (!tailSet.has(key)) {
    tailSet.add(key)
  }
}

for await (let line of await getInputInterator(import.meta)) {
  const [dir, count] = extractMotion(line)

  for (let i = 0; i < count; i++) {
    move(dir as Dir, head)
    needMoveTail() && moveTail(dir as Dir)
    logTail()
  }
}

console.log(tailSet.size)
