// import { rawTest } from "./rawTest"
// import { rawInput } from "./rawInput"
// import { min } from "ramda";
//
// type Coord = { x: number, y: number }
//
// const mapFn = (line) => line.split("")
// const filterFn = (line) => line !== ""
//
// const testData = rawTest.split("\n").filter(filterFn).map(mapFn)
// const inputData = rawInput.split("\n").filter(filterFn).map(mapFn)
//
// const map = new Map()
//
// export const findInMatrix = (target: string, matrix: string[][]): Coord => {
//   for (let x = 0; x < matrix.length; x++) {
//     for (let y = 0; y < matrix[x].length; y++) {
//       if (matrix[x][y] === target) return { x, y }
//     }
//   }
//   return undefined
// }
//
// const getMinPath = (paths: string[][]): string[] | undefined => {
//   let tracker: { index?: number, length: number } | undefined = { length: Infinity }
//   for (let i = 0; i < paths.length; i++) {
//     if (paths[i] && paths[i].length < tracker.length) {
//       tracker = { index: i, length: paths[i].length }
//     }
//   }
//   if (tracker.index !== undefined) {
//     return paths[tracker.index]
//   }
//   return
// }
//
//
// const toString = ({ x, y }) => `${x},${y}`
//
//
// export const shortestPath = (input: string[][]): string[] | undefined => {
//   const start = findInMatrix("S", input), end = findInMatrix("E", input)
//   const getChar = ({ x, y }) => {
//     if (x < 0 || x >= input.length || y < 0 || y >= input[x].length) {
//       return;
//     }
//     return input[x][y]
//   }
//   input[start.x][start.y] = "a"
//   input[end.x][end.y] = "z"
//
//   const dfs = ({ x, y }: Coord, lastChar: string): string[] => {
//     const hash = toString({ x, y })
//     const currentChar = input[x][y]
//     const currentCharCode = currentChar.charCodeAt(0)
//
//     if (x === end.x && y === end.y) {
//       map.set(hash, ["E"])
//       return ["E"];
//     }
//
//     if (map.has(hash)) return map.get(hash)
//     input[x][y] = "."
//
//     const nextUp = [
//       [getChar({ x, y: y + 1 }), { x, y: y + 1 }],
//       [getChar({ x, y: y - 1 }), { x, y: y - 1 }],
//       [getChar({ x: x + 1, y }), { x: x + 1, y }],
//       [getChar({ x: x - 1, y }), { x: x - 1, y }],
//     ]
//       .filter(([nextChar]: [string, Coord]) => {
//         return nextChar !== undefined && nextChar !== "." && !(nextChar.charCodeAt(0) - currentCharCode > 1);
//       })
//       .sort((a: [string, Coord], b: [string, Coord]) => {
//         return b[0].charCodeAt(0) - a[0].charCodeAt(0);
//       })
//
//     const minPath = getMinPath(
//       nextUp.map(([_, nextCoord]: [string, Coord]) => dfs(nextCoord, currentChar))
//     )
//
//     input[x][y] = currentChar
//     if (minPath) {
//       const currentPath = [currentChar, ...minPath]
//       map.set(hash, currentPath)
//       return currentPath
//     }
//     else return
//   }
//
//   return dfs(start, "a")
// }
//
// export const part1 = () => {
//   const result = shortestPath(testData)
//   return result.length;
// }
//
// export const part2 = () => shortestPath(inputData).length
