import { getInputInterator } from "@/utils.ts"

export const cave = Array.from({ length: 1000 }, () => Array.from({ length: 1000 }, () => ""))

function drawPath(line: stirng) {
  const points = line.split("->")

  for (let i = 0; i < points.length - 1; i++) {
    const [sX, sY] = points[i].split(",").map((i) => +i)
    const [eX, eY] = points[i + 1].split(",").map((i) => +i)

    if (sX === eX) {
      const [start, end] = [sY, eY].sort((a, b) => a - b)
      for (let j = start; j <= end; j++) {
        cave[j][sX] = "#"
      }
    }

    if (sY === eY) {
      const [start, end] = [sX, eX].sort((a, b) => a - b)
      for (let j = start; j <= end; j++) {
        cave[sY][j] = "#"
      }
    }
  }
}

export function findEdge() {
  let bottom = 0
  let left = 0
  let right = 0
  for (let i = cave.length - 1; i >= 0 ; i--) {
    const notEmptyLine = cave[i].some((j) => j === "#")

    if (notEmptyLine) {
      bottom = i
      break

    }
  }

  for (let i = 0; i < cave[bottom].length; i++) {
    if (cave[bottom][i] === "#") {
      left = i + 1
      break
    }
  }

  for (let i = cave[bottom].length - 1; i >= 0; i--) {
    if (cave[bottom][i] === '#') {
      right = i + 1
      break
    }
  }

  return { left, right, bottom }
}

export function isEmptyPoint(point) {
  return !['o', '#'].includes(point)
}

export function countSand(cave) {
  const rows = cave.length
  const cols = cave[0].length
  let count = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (cave[i][j] === 'o') {
        count++
      }
    }
  }

  return count
}

for await (let line of await getInputInterator(import.meta)) {
  drawPath(line)
}
