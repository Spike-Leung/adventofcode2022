import { getInputInterator } from "@/utils.ts"
import { sum, processCommand } from "./util.ts"

for await (let line of await getInputInterator(import.meta)) {
  processCommand(line)
}

console.log(sum)
