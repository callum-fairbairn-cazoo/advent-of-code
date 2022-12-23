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
    if (typeof leftItem === "object" && typeof rightItem === "object") {
      if (compare(leftItem, rightItem) === false) return false
    } else if (typeof leftItem === "object") {
      if (compare(leftItem, [rightItem]) === false) return false
      // if (rightItem === undefined) return false
    } else if (typeof rightItem === "object") {
      if (compare([leftItem], rightItem) === false) return false
      // if (leftItem === undefined) return true
    }
    else if (leftItem > rightItem) return false
    else if (i !== Math.max(left.length, right.length) - 1 && right[i + 1] === undefined) return true
    else if (i !== Math.max(left.length, right.length) - 1 && left[i + 1] === undefined) return false
    // else if (right[i + 1] === undefined) return true
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
