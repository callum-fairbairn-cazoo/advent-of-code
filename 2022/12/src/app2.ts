import { rawTest } from "./rawTest"
import { rawInput } from "./rawInput"

const mapFn = (line) => line.split("")
const filterFn = (line) => line !== ""

const testData = rawTest.split("\n").filter(filterFn).map(mapFn)
const inputData = rawInput.split("\n").filter(filterFn).map(mapFn)

const map = new Map()

type Coord = { x: number, y: number }

export const findInMatrix = (target: string, matrix: string[][]): Coord => {
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix[x].length; y++) {
      if (matrix[x][y] === target) return { x, y }
    }
  }
  return undefined
}

const getMinPath = (paths: string[][]): string[] | undefined => {
  let tracker: { index?: number, length: number } | undefined = { length: Infinity }
  for (let i = 0; i < paths.length; i++) {
    if (paths[i] && paths[i].length < tracker.length) {
      tracker = { index: i, length: paths[i].length }
    }
  }
  if (tracker.index !== undefined) {
    return paths[tracker.index]
  }
  return
}

const toString = ({ x, y }) => `${x},${y}`

export const shortestPath = (input: string[][]): string[] => {
  const start = findInMatrix("S", input), end = findInMatrix("E", input)
}

export const part1 = () => {
  const result = shortestPath(testData)
  return result.length;
}

export const part2 = () => shortestPath(inputData).length
