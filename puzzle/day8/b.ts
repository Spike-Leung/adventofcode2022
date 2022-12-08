import matrix from './util.ts'
let highestScenicScore = 0

const rows = matrix.length
const cols = matrix[0].length

const getVisibleTree = (base: number, row: number, col: number, dx: number, dy: number): number => {
  if (row < 0 || col < 0 || row >= rows || col >= cols) {
    return 0
  }

  const tree = matrix[row][col]

  if (base <= tree) {
    return 1
  }

  return 1 + getVisibleTree(base, row + dx, col + dy, dx, dy)
}

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    const base = matrix[i][j]
    const left = getVisibleTree(base, i, j - 1, 0, -1)
    const right = getVisibleTree(base, i, j + 1, 0, 1)
    const top = getVisibleTree(base, i - 1, j, -1, 0)
    const bottom = getVisibleTree(base, i + 1, j, 1, 0)
    const score = left * right * top * bottom

    highestScenicScore = Math.max(score, highestScenicScore)
  }
}

console.log(highestScenicScore)
