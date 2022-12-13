import matrix from "./utils.ts"

let start = [0, 0]
const rows = matrix.length
const cols = matrix[0].length
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (matrix[r][c] === "S") {
      start = [r, c]
      matrix[r][c] = 'a'
    }

    if (matrix[r][c] === "E") {
      matrix[r][c] = 'z'
    }
  }
}

export function findFewestSteps(start = [0, 0], matrix: string[][]) {
  let fewestSteps = 0
  let step = 1
  const rows = matrix.length
  const cols = matrix[0].length
  const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]]
  let currPositions = [start]
  let visited = new Set()

  visited.add(start.join(','))

  while (currPositions.length && fewestSteps === 0) {
    step++
    let nextPositions = []

    for (let position of currPositions) {
      const [x, y] = position
      const currElevation = matrix[x][y]

      for (const dir of dirs) {
        const nx = x + dir[0]
        const ny = y + dir[1]
        const key = `${nx},${ny}`

        if (nx < 0 || ny < 0 || nx >= rows || ny >= cols || visited.has(key)) {
          continue
        } else {
          const nextElevation = matrix[nx][ny]
          const canMove = nextElevation.charCodeAt(0) - currElevation.charCodeAt(0) <= 1

          if (canMove) {
            visited.add(key)
            nextPositions.push([nx, ny])

            if (nextElevation === "z") {
              fewestSteps = step
            }
          }
        }
      }
    }
    currPositions = nextPositions
  }

  return fewestSteps
}

console.log('part 1:', findFewestSteps(start, matrix))
