import { cave, countSand, findEdge, isEmptyPoint } from "./util.ts"

function fillSand(cave) {
  let full = false

  let { bottom } = findEdge()
  bottom += 2

  cave[bottom] = cave[bottom].map(() => "#")

  while (!full) {
    let sandX = 500
    let sandY = 0

    while (sandY <= bottom) {
      if (isEmptyPoint(cave[sandY + 1][sandX])) {
        sandY += 1
      } else if (isEmptyPoint(cave[sandY + 1][sandX - 1])) {
        sandY += 1
        sandX -= 1
      } else if (isEmptyPoint(cave[sandY + 1][sandX + 1])) {
        sandY += 1
        sandX += 1
      } else {
        sandY > 0 && (cave[sandY][sandX] = 'o')
        break;
      }
    }

    if (sandY === 0) {
      cave[sandY][sandX] = 'o'
      full = true
    }

    if (sandY > bottom) {
      full = true
    }
  }

  return cave
}

console.log(countSand(fillSand(cave)))
