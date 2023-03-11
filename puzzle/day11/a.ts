import getMonkey from "./util.ts";
import type { Monkey } from "./util.ts";

const monkeys = getMonkey() as Record<string, Monkey<number>>;

const reliefWorry = (worry: number) => {
  return Math.floor(worry / 3);
};

for (let i = 0; i < 20; i++) {
  Object.keys(monkeys).forEach((index) => {
    const monkey = monkeys[index];

    while (monkey.items.length) {
      monkey.inspectTime++;
      const item = monkey.items.shift() as number;
      const worry = monkey.operation(item);
      const relief = reliefWorry(worry);
      const target = monkey.test(relief);
      monkeys[target].items.push(relief);
    }
  });
}

const times = Object.values(monkeys).map(({ inspectTime }) => inspectTime).sort(
  (a, b) => b - a,
);
const result = times[0] * times[1];
console.log(result);
