import * as R from "ramda"

export const mapFn = (line) => line.split(" -> ").map(item => {
  const x = parseInt(item.split(",")[0]) - 400, y = parseInt(item.split(",")[1])
  return ({ x, y });
})
export const filterFn = (line) => line !== ""

const WALL = "#"

interface Coord {
  x: number;
  y: number;
}

const printGrid = (grid: string[][]) => {
  grid.forEach(row => {
    row.forEach(column => process.stdout.write(column))
    process.stdout.write("\n")
  })
}

const addWall = (grid: string[][], wall: Coord[]) => {
  wall.slice(1).forEach((current, index) => {
    const previous = wall[index]
    if (current.x === previous.x) {
      const range = R.range(previous.y, current.y)
      console.log(current, previous, range, index);
      range.forEach((n) => {
        grid[current.x][n] = WALL;
        printGrid(grid)
      })
    } else {
      const range = R.range(current.x, previous.x)
      console.log(current, previous, range, index);
      range.forEach((n) => {
        grid[n][current.y] = `${index}`;
        printGrid(grid)
      })
    }
  })
}


const createGrid = (data: Coord[][]) => {
  const grid: string[][] = new Array(200).fill(new Array(200).fill("."))
  data.forEach((wall) => addWall(grid, wall))
  printGrid(grid)
  return data
}

export const part1 = (testData, inputData) => {
  createGrid(testData)
}

export const part2 = (testData, inputData) => {
  console.log(testData);
}
