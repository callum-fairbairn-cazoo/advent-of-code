import { rawTest } from "./rawTest"
import { rawInput } from "./rawInput"

const mapFn = (line) => ({
  left: eval(line.split("\n")[0]),
  right: eval(line.split("\n")[1]),
})

const filterFn = (line) => line !== ""

const testData = rawTest.split("\n\n").filter(filterFn).map(mapFn)
const inputData = rawInput.split("\n\n").filter(filterFn).map(mapFn)

type RecursiveArray = Array<RecursiveArray | number>

export const compare = (left: RecursiveArray, right: RecursiveArray) => {
  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    const leftItem = left[i], rightItem = right[i]
    if (leftItem === undefined) return true
    if (rightItem === undefined) return false
    if (typeof leftItem === "object" && typeof rightItem === "object") {
      return compare(leftItem, rightItem)
    } else if (typeof leftItem === "object") {
      return compare(leftItem, [rightItem])
    } else if (typeof rightItem === "object") {
      return compare([leftItem], rightItem)
    }
    else if (leftItem > rightItem) return false;
  }
  return true;
}

const countIndices = (data) => {
  let counter = 0
  data.forEach(({left, right}, index) => {
    console.log(index, compare(left, right));
    if (compare(left, right)) counter += (index + 1)
  })
  return counter
}

export const part1 = () => countIndices(testData)
export const part2 = () => countIndices(inputData)
