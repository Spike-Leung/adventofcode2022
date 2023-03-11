import getMonkeys from "./util.ts";
import type { Monkey } from "./util.ts";

const monkeys = getMonkeys(true) as Record<string, Monkey<bigint>>;

const inCommon = Object.values(monkeys).map(({ dividend }) => dividend).reduce(
  (acc, cur) => acc * BigInt(cur),
  BigInt(1),
);

for (let i = 0; i < 10000; i++) {
  Object.keys(monkeys).forEach((index) => {
    const monkey = monkeys[index];

    while (monkey.items.length) {
      monkey.inspectTime++;
      const item = monkey.items.shift() as bigint;
      const worry = monkey.operation(item);
      const newWorry = (worry as bigint) % inCommon;
      const target = monkey.test(newWorry);
      monkeys[target].items.push(newWorry);
    }
  });
}

const times = Object.values(monkeys).map(({ inspectTime }) => inspectTime).sort(
  (a, b) => b - a,
);
const result = times[0] * times[1];
console.log(result);
