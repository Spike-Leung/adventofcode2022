import matrix from "./utils.ts";
import { findFewestSteps } from "./a.ts";

let startList = [];
let mostFewestSteps = Number.MAX_SAFE_INTEGER;
const rows = matrix.length;
const cols = matrix[0].length;
const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (["a", "S"].includes(matrix[r][c])) {
      startList.push([r, c]);
      matrix[r][c] = "a";
    }

    if (matrix[r][c] === "E") {
      matrix[r][c] = "z";
    }
  }
}

for (const start of startList) {
  const fewestSteps = findFewestSteps(start, matrix);
  if (fewestSteps > 0) {
    mostFewestSteps = Math.min(mostFewestSteps, fewestSteps);
  }
}

console.log("part2:", mostFewestSteps);
