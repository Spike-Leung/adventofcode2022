import { readLines } from "https://deno.land/std@0.167.0/io/buffer.ts";
import { fromFileUrl, dirname, join } from "https://deno.land/std@0.167.0/path/posix.ts";

export async function getInputInterator(meta: ImportMeta) {
  const path = getInputPath(meta)
  const fileReader = await Deno.open(path);
  return readLines(fileReader)
}

function getInputPath(meta: ImportMeta) {
  return fromFileUrl(join(dirname(meta.url), 'input.txt'))
}
