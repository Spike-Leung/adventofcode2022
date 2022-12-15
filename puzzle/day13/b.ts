import { pairs, compare } from "./util.ts"

const mark1 = [[2]]
const mark2 = [[6]]
pairs.push(mark1, mark2)
pairs.sort((a, b) => compare(a, b) ? -1 : 1)

const index1 = pairs.findIndex((p) => p.toString() === mark1.toString())
const index2 = pairs.findIndex((p) => p.toString() === mark2.toString())


console.log({ index1, index2, res: (index1 + 1) * (index2 + 1) })
