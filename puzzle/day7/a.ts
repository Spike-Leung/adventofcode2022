import rootDir from "./util.ts"

function calcTotal() {
  let sum = 0

  const dfs = (data: number | object): number => {
    if (typeof data === "number") {
      return data
    }

    const dirTotal = Object.values(data).reduce((acc: number, cur: number | object) => acc += dfs(cur), 0)

    if (dirTotal <= 100000) {
      sum += dirTotal
    }

    return dirTotal
  }

  dfs(rootDir)

  return sum
}

console.log(calcTotal())
