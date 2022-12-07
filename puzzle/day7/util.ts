import { getInputInterator } from "@/utils.ts"

type Dir = Record<string, number | object>

const cwd: string[] = []
const root: Dir = {}

const getPath = (cmd: string) => {
  const match = cmd.match(/\$ cd (.*)/)

  return match ? match[1] : ""
}

const isList = (cmd: string) => {
  return cmd === "$ ls"
}

const isCmd = (line: string) => {
  return line.indexOf("$") === 0
}

const isDir = (line: string) => {
  return line.indexOf("dir") === 0
}

const getDirPath = (line: string) => {
  const match = line.match(/dir (.*)/)
  return match ? match[1] : ""
}

const getKeyAndSize = (line: string) => {
  const match = line.match(/(\d+) (.*)/)
  const [_, size = 0, key = ""] = match ?? []

  return { key, size: +size }
}

const getCwdDir = () => {
  let obj: Dir = root

  for (let k of cwd) {
    obj = obj[k] as Dir
  }

  return obj
}

const appendToRoot = (key: string, size: number | object) => {
  const dir = getCwdDir()
  dir[key] = size
}

for await (let line of await getInputInterator(import.meta)) {
  if (isCmd(line)) {
    if (isList(line)) {
      continue
    } else {
      const path = getPath(line)

      switch (path) {
        case "/":
          break
        case "..":
          cwd.pop()
          break
        default:
          cwd.push(path)
          break
      }
    }
  } else {
    if (isDir(line)) {
      appendToRoot(getDirPath(line), {})
    } else {
      const { key, size } = getKeyAndSize(line)
      appendToRoot(key, size)
    }
  }
}

export default root
