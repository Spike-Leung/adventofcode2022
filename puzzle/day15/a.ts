import { getInputInterator } from "@/utils.ts"

const sensorList: number[][] = []
const beaconList: number[][] = []
const beaconSet = new Set<string>()
const notBeaconSet = new Set<string>()
const getKey = (x, y) => `${x},${y}`
const targetY = 2000000

for await (let line of await getInputInterator(import.meta)) {
  const [[, sensorX], [, sensorY], [, beaconX], [, beaconY]] = line.matchAll(/[x,y]=(-?\d+)/g)

  sensorList.push([+sensorX, +sensorY])
  beaconList.push([+beaconX, +beaconY])
  beaconSet.add(getKey(beaconX, beaconY))
}

sensorList.forEach(([sX, sY], index) => {
  const [bX, bY] = beaconList[index]

  // https://en.wikipedia.org/wiki/Taxicab_geometry
  const radius = Math.abs(bX - sX) + Math.abs(bY - sY)
  const yDistance = Math.abs(sY - targetY)
  const xDistance = radius - yDistance

  if (xDistance >= 0) {
    for (let i = sX - xDistance; i <= sX + xDistance; i++) {
      const key = getKey(i, targetY)
      !beaconSet.has(key) && notBeaconSet.add(key)
    }
  }
})

console.log(`${notBeaconSet.size} positions cannot contain a beacon`)
