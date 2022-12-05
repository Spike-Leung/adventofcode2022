import { readLines } from "https://deno.land/std@0.167.0/io/buffer.ts";
import { fromFileUrl, dirname, join } from "https://deno.land/std@0.167.0/path/posix.ts";

export async function getInputInterator(meta: ImportMeta, inputFile = "input.txt") {
  const path = getInputPath(meta, inputFile)
  const fileReader = await Deno.open(path);
  return readLines(fileReader)
}

function getInputPath(meta: ImportMeta, inputFile: string) {
  return fromFileUrl(join(dirname(meta.url), inputFile))
}
