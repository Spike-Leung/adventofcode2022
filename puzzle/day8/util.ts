import { getInputInterator } from "@/utils.ts"

const matrix: number[][] = []

for await (let line of await getInputInterator(import.meta)) {
  matrix.push(line.split("").map((n: string) => +n))
}

export default matrix
