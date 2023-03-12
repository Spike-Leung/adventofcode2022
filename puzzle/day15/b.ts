import { getInputInterator } from "@/utils.ts"

const sensorList: number[][] = []
const beaconList: number[][] = []
const MAX_POSITION = 4000000

for await (let line of await getInputInterator(import.meta)) {
  const [[, sensorX], [, sensorY], [, beaconX], [, beaconY]] = line.matchAll(/[x,y]=(-?\d+)/g)

  sensorList.push([+sensorX, +sensorY])
  beaconList.push([+beaconX, +beaconY])
}

function buildRange(row: number) {
  return sensorList.reduce((ranges: number[][], [sX, sY], index) => {
    const [bX, bY] = beaconList[index]

    // https://en.wikipedia.org/wiki/Taxicab_geometry
    const radius = Math.abs(bX - sX) + Math.abs(bY - sY)
    const yDistance = Math.abs(sY - row)
    const xDistance = radius - yDistance

    if (xDistance >= 0) {
      const minX = Math.max(0, sX - xDistance)
      const maxX = Math.min(MAX_POSITION, sX + xDistance)

      return mergeRange(ranges, [minX, maxX])
    }

    return ranges
  }, [])
}

function mergeRange(ranges: number[][], newRange: number[]) {
  const len = ranges.length

  for (let i = len - 1; i >= 0; i--) {
    const range = ranges[i]

    if (newRange[0] <= range[1] && newRange[1] >= range[0]) {
      newRange[0] = Math.min(newRange[0], range[0])
      newRange[1] = Math.max(newRange[1], range[1])
      ranges.splice(i, 1)
    }
  }

  ranges.push(newRange)

  return ranges
}

for (let row = 0; row <= MAX_POSITION; row++) {
  const ranges = buildRange(row)

  if (ranges[0][0] === 0 && ranges[0][1] === MAX_POSITION) {
    continue
  }

  ranges.sort((a, b) => a[0] - b[0])
  // if more than 1 range, it means there is space, which is the distress signal
  const frequency = (ranges[0][1] + 1) * 4000000 + row
  console.log(`Tuning frequency is ${frequency}`)
  break
}
