import matrix from "./util.ts";

const VISIBLE = 0;
const INVISIBLE = 1;
const rows = matrix.length;
const cols = matrix[0].length;

let compareLine: number[] = [];
const visibleTrees = Array.from(
  { length: rows },
  () => Array.from({ length: cols }, () => INVISIBLE),
);

for (let i = 0; i < rows; i++) {
  visibleTrees[i][0] = VISIBLE;
  visibleTrees[i][cols - 1] = VISIBLE;
}

for (let i = 0; i < cols; i++) {
  visibleTrees[0][i] = VISIBLE;
  visibleTrees[rows - 1][i] = VISIBLE;
}

// from top to bottom
compareLine = matrix[0];
for (let i = 1; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    if (matrix[i][j] > compareLine[j]) {
      visibleTrees[i][j] = VISIBLE;
      compareLine[j] = matrix[i][j];
    }
  }
}

// from bottom to top
compareLine = matrix[rows - 1];
for (let i = rows - 2; i >= 0; i--) {
  for (let j = 0; j < cols; j++) {
    if (matrix[i][j] > compareLine[j]) {
      visibleTrees[i][j] = VISIBLE;
      compareLine[j] = matrix[i][j];
    }
  }
}

// from left to right
for (let i = 0; i < rows; i++) {
  compareLine[i] = matrix[i][0];
}
for (let i = 1; i < cols; i++) {
  for (let j = 0; j < rows; j++) {
    if (matrix[j][i] > compareLine[j]) {
      visibleTrees[j][i] = VISIBLE;
      compareLine[j] = matrix[j][i];
    }
  }
}

// from right to left
for (let i = 0; i < rows; i++) {
  compareLine[i] = matrix[i][cols - 1];
}
for (let i = cols - 2; i >= 0; i--) {
  for (let j = 0; j < rows; j++) {
    if (matrix[j][i] > compareLine[j]) {
      visibleTrees[j][i] = VISIBLE;
      compareLine[j] = matrix[j][i];
    }
  }
}

const count = visibleTrees.reduce((sum, row) => {
  sum += row.reduce((rowCount, col) => rowCount += col === VISIBLE ? 1 : 0, 0);
  return sum;
}, 0);

console.log(count);
