import { getInputInterator } from "@/utils.ts"

let matrix: string[][] = []


for await (let line of await getInputInterator(import.meta)) {
  matrix.push(line.split(""))
}

export default matrix
