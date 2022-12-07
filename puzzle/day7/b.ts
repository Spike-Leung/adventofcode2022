import rootDir from "./util.ts"

const TOTAL_SPACE = 70000000
const NEED_UNUSED_SPACE = 30000000

const flatDir: Record<string, number> = {}

function buildFlatDir() {
  const dfs = (key: string, data: number | object): number => {
    if (typeof data === "number") {
      return data
    }

    const dirTotal = Object.entries(data).reduce((acc, entry) => {
      const [key, value] = entry
      acc += dfs(key, value)
      return acc
    }, 0)

    flatDir[key] = dirTotal

    return dirTotal
  }

  dfs('root', rootDir)
}

buildFlatDir()

const rootTotalSize = flatDir.root
const currentUnusedSize = TOTAL_SPACE - rootTotalSize
const leastSizeToRemove = NEED_UNUSED_SPACE - currentUnusedSize
const smallestDirSizeToRemove = Object.values(flatDir).filter((v) => v >= leastSizeToRemove).sort((a, b) => a - b)[0]
console.log(smallestDirSizeToRemove)
