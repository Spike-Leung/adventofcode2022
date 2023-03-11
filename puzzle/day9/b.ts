import { getInputInterator } from "@/utils.ts";
import type { Dir, Head } from "./util.ts";
import {
  extractMotion,
  logTail,
  move,
  moveTail,
  needMoveTail,
} from "./util.ts";

const ROPE_LENGTH = 10;
const tailSet = new Set();
const nodes = Array.from({ length: ROPE_LENGTH }, () => [0, 0]);
const head = nodes[0];
const tail = nodes[nodes.length - 1];

for await (let line of await getInputInterator(import.meta)) {
  const [dir, count] = extractMotion(line);

  for (let i = 0; i < count; i++) {
    move(dir as Dir, head);

    const n = nodes.length;
    for (let j = 0; j < n - 1; j++) {
      const prev = nodes[j];
      const next = nodes[j + 1];
      needMoveTail(prev, next) && moveTail(dir as Dir, prev, next);
    }

    logTail(tailSet, tail);
  }
}

console.log(tailSet.size);
