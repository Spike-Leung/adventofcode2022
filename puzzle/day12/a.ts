import matrix from "./utils.ts"

let start = [0, 0]
let fewestSteps = 0
let step = 0
const rows = matrix.length
const cols = matrix[0].length

const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]]
let currElevation = [start]
let visited = new Set()

visited.add('0,0')

while (currElevation.length) {
  step++
  let nextElevation = []

  for (let elevation of currElevation) {
    const [x, y] = elevation
    const char = matrix[x][y]
    const nextChar = String.fromCharCode(char.charCodeAt(0) + 1)

    for (const dir of dirs) {
      const nx = x + dir[0]
      const ny = y + dir[1]
      const key = `${nx},${ny}`

      if (nx < 0 || ny < 0 || nx >= rows || ny >= cols) {
        continue
      }

      if (visited.has(key)) {
        continue
      } else {
        const currChar = matrix[nx][ny]

        if (char === 'z' && currChar === "E") {
          fewestSteps = step
        }

        if (currChar === char || currChar === nextChar) {
          visited.add(key)
          nextElevation.push([nx, ny])
        }
      }
    }
  }
  currElevation = nextElevation
}

console.log(fewestSteps)
