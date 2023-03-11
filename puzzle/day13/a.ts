import { compare, pairs } from "./util.ts";

let rightPairs = [];
for (let i = 0; i < pairs.length; i += 2) {
  const inorder = compare(pairs[i], pairs[i + 1]);

  console.log({ i: i / 2 + 1, inorder });

  if (compare(pairs[i], pairs[i + 1]) === true) {
    rightPairs.push(i / 2 + 1);
  }
}

console.log({ rightPairs });

console.log(rightPairs.reduce((acc, cur) => acc += cur, 0));
