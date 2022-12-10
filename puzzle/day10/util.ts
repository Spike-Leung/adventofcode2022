export const extractAddValue = (line: string): number => {
  const [mark, val] = line.split(" ")

  return +val
}
