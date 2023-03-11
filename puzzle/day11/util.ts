import { getInputInterator } from "@/utils.ts";

type Operation<T> = (old: T) => T;
type Test<T> = (worry: T) => string;

export interface Monkey<T> {
  items: T[];
  operation: Operation<T>;
  test: Test<T>;
  inspectTime: number;
  dividend: T;
}

const monkeys: Record<string, Monkey<number> | Monkey<bigint>> = {};

const initMonkey = (monkeyInput: string[], isBigMonkey: boolean) => {
  const [
    monkeyIndex,
    startItems,
    operationStr,
    testCondition,
    trueHandler,
    falseHandler,
  ] = monkeyInput;

  const monkeyIndexMatch = monkeyIndex.match(/Monkey (\d+):/);
  const startItemsMatch = startItems.match(/\s+Starting items:\s+([\d,\s]+)/);
  const operationMatch = operationStr.match(/\sOperation:\s+new = (.*)/);
  const testConditionMatch = testCondition.match(/[\sa-zA-Z]+(\d+)/);
  const trueHandlerMatch = trueHandler.match(/[\sa-zA-Z]+(\d+)/);
  const falseHandleMatch = falseHandler.match(/[\sa-zA-Z]+(\d+)/);

  const index = (monkeyIndexMatch && monkeyIndexMatch[1]) ?? 0;
  let dividend = (testConditionMatch && +testConditionMatch[1]) ?? 1;
  const trueMonkey = (trueHandlerMatch && trueHandlerMatch[1]) ?? "";
  const falseMonkey = (falseHandleMatch && falseHandleMatch[1]) ?? "";

  let operation, test, items;

  if (isBigMonkey) {
    items = (startItemsMatch && startItemsMatch[1].split(",").map((i) =>
      BigInt(+i)
    )) ?? [];
    const opt = (operationMatch &&
      operationMatch[1].replaceAll("old", "BigInt(old)").replace(
        /(\d+)/,
        "BigInt($1)",
      )) ?? "";
    operation = (operationMatch &&
      (Function("old", `return ${opt}`) as Operation<bigint>)) ??
      ((old: bigint) => old);
    test = (worry: bigint) => {
      if (BigInt(worry) % BigInt(dividend) === 0n) {
        return trueMonkey;
      }

      return falseMonkey;
    };

    monkeys[index] = {
      items,
      operation,
      test,
      inspectTime: 0,
      dividend: BigInt(dividend),
    };
  } else {
    items = (startItemsMatch && startItemsMatch[1].split(",").map((i) => +i)) ??
      [];
    const opt = (operationMatch && operationMatch[1]) ?? "";
    operation = (operationMatch &&
      (Function("old", `return ${opt}`) as Operation<number>)) ??
      ((old: number) => old);
    test = (worry: number) => {
      if (worry % dividend === 0) {
        return trueMonkey;
      }

      return falseMonkey;
    };
    monkeys[index] = {
      items,
      operation,
      test,
      inspectTime: 0,
      dividend,
    };
  }
};

const monkeyInputArray: string[][] = [];
let monkeyInput: string[] = [];

for await (let line of await getInputInterator(import.meta)) {
  if (line === "") {
    monkeyInputArray.push(monkeyInput);
    monkeyInput = [];
  } else {
    monkeyInput.push(line);
  }
}
monkeyInputArray.push(monkeyInput);

export default function getMonkeys(isBigMonkey: boolean = false) {
  for (let monkeyInput of monkeyInputArray) {
    initMonkey(monkeyInput, isBigMonkey);
  }

  return monkeys;
}
