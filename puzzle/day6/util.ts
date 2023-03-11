import { getInputInterator } from "@/utils.ts";

let input: string = "";

for await (let line of await getInputInterator(import.meta)) {
  input = line;
}

function findFirstMarker(line: string, length: number): number {
  const n = line.length;
  let l = 0;
  let r = 1;
  const chars: string[] = [line[0]];

  while (chars.length < length) {
    while (chars.includes(line[r])) {
      chars.shift();
      l++;
    }

    chars.push(line[r]);
    r++;
  }

  return r;
}

export default findFirstMarker.bind(null, input);
