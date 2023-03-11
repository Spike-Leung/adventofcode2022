type Dir = "U" | "D" | "L" | "R";
type Head = [number, number];

export const extractMotion = (line: string) => {
  const [dir, count] = line.split(" ");

  return [dir, +count];
};

export const move = (dir: Dir, target: Head) => {
  switch (dir) {
    case "U":
      target[1] -= 1;
      break;
    case "D":
      target[1] += 1;
      break;
    case "L":
      target[0] -= 1;
      break;
    case "R":
      target[0] += 1;
      break;
  }
};

export const needMoveTail = (head: Head, tail: Head) => {
  const dx = Math.abs(head[0] - tail[0]);
  const dy = Math.abs(head[1] - tail[1]);
  return dx > 1 || dy > 1;
};

const inSameRowOrCol = (head: Head, tail: Head) => {
  const dx = Math.abs(head[0] - tail[0]);
  const dy = Math.abs(head[1] - tail[1]);

  return dx === 0 || dy === 0;
};

const getDirInSameRowOrCol = (head, tail) => {
  const dx = head[0] - tail[0];
  const dy = head[1] - tail[1];

  if (dx === 0) {
    return dy > 0 ? "D" : "U";
  }

  return dx > 0 ? "R" : "L";
};

export const moveTail = (dir: Dir, head: Head, tail: Head) => {
  if (inSameRowOrCol(head, tail)) {
    move(getDirInSameRowOrCol(head, tail), tail);
  } else {
    const rowDir = head[0] - tail[0] > 0 ? "R" : "L";
    const colDir = head[1] - tail[1] > 0 ? "D" : "U";
    move(rowDir, tail);
    move(colDir, tail);
  }
};

export const logTail = (set: Set<string>, tail: Head) => {
  const key = tail.join(",");

  if (!set.has(key)) {
    set.add(key);
  }
};
