import { getInputInterator } from "@/utils.ts";
import { extractAddValue } from "./util.ts";
let register = 1;
let sum = 0;
const LOG_CYCLE = [20, 60, 100, 140, 180, 220];
const target = {
  val: 1,
};
const proxyCycle = new Proxy(target, {
  set(target, prop, value) {
    target[prop] += 1;
    if (LOG_CYCLE.includes(target[prop])) {
      sum += calcSignalLength(target[prop], register);
    }
    return true;
  },
});

const calcSignalLength = (cycle: number, register: number): number => {
  return cycle * register;
};

const processCommand = (line: string) => {
  if (line === "noop") {
    proxyCycle.val++;
  } else {
    proxyCycle.val++;
    register += extractAddValue(line);
    proxyCycle.val++;
  }
};

for await (let line of await getInputInterator(import.meta)) {
  processCommand(line);
}

console.log(sum);
