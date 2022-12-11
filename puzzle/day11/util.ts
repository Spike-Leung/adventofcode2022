import { getInputInterator } from "@/utils.ts"

type Operation = (old: number) => number
type Test = (worry: number) => string

interface Monkey {
  items: number[],
  operation: Operation
  test: Test
  inspectTime: number
}

const monkeys: Record<string, Monkey> = {}

const initMonkey = (monkeyInput: string[]) => {
  const [monkeyIndex, startItems, operationStr, testCondition, trueHandler, falseHandler] = monkeyInput

  const monkeyIndexMatch = monkeyIndex.match(/Monkey (\d+):/)
  const startItemsMatch = startItems.match(/\s+Starting items:\s+([\d,\s]+)/)
  const operationMatch = operationStr.match(/\sOperation:\s+new = (.*)/)
  const testConditionMatch = testCondition.match(/[\sa-zA-Z]+(\d+)/)
  const trueHandlerMatch = trueHandler.match(/[\sa-zA-Z]+(\d+)/)
  const falseHandleMatch = falseHandler.match(/[\sa-zA-Z]+(\d+)/)

  const index = (monkeyIndexMatch && monkeyIndexMatch[1]) ?? 0
  const items = (startItemsMatch && startItemsMatch[1].split(",").map((i) => +i)) ?? []
  const operation = operationMatch ? (Function('old', `return ${operationMatch[1]}`) as Operation) : (old: number) => old
  const dividend = (testConditionMatch && +testConditionMatch[1]) ?? 1
  const trueMonkey = (trueHandlerMatch && trueHandlerMatch[1]) ?? ''
  const falseMonkey = (falseHandleMatch && falseHandleMatch[1]) ?? ''
  const test = (worry: number) => {
    if (worry % dividend === 0) {
      return trueMonkey
    }

    return falseMonkey

  }
  monkeys[index] = {
    items,
    operation,
    test,
    inspectTime: 0
  }
}

const monkeyInputArray: string[][] = []
let monkeyInput: string[] = []

for await (let line of await getInputInterator(import.meta, 'test.txt')) {
  if (line === "") {
    monkeyInputArray.push(monkeyInput)
    monkeyInput = []
  } else {
    monkeyInput.push(line)
  }
}
monkeyInputArray.push(monkeyInput)


for (let monkeyInput of monkeyInputArray) {
  initMonkey(monkeyInput)
}

export default monkeys
