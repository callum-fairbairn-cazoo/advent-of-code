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

const naiveCompare = (left: RecursiveArray, right: RecursiveArray): boolean | undefined => {
  let status
  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    const leftItem = left[i], rightItem = right[i]
    if (leftItem > rightItem) return false
    if (leftItem < rightItem) {
      status = true
    }
  }
  return status
}

export const compare = (left: RecursiveArray, right: RecursiveArray) => {
    for (let i = 0; i < Math.max(left.length, right.length); i++) {
      const leftItem = left[i], rightItem = right[i]
      if (typeof leftItem === "object" && typeof rightItem === "object") {
        const onlyContainsInts = leftItem.every(item => typeof item === "number")
          && rightItem.every(item => typeof item === "number")
        const compareResult = onlyContainsInts ? naiveCompare(leftItem, rightItem) : compare(leftItem, rightItem)
        if (compareResult === false) return false
        if (compareResult === undefined) {
          if (leftItem.length < rightItem.length) return false
        }
      }
      else if (typeof leftItem === "object") {
        const onlyContainsInts = leftItem.every(item => typeof item === "number")
        const compareResult = onlyContainsInts ? naiveCompare(leftItem, [rightItem]) : compare(leftItem, [rightItem])
        if (compareResult === false) return false
        if (compareResult === undefined) {
          if (leftItem.length < 1) return false;
        }
      }
      else if (typeof rightItem === "object") {
        const onlyContainsInts = rightItem.every(item => typeof item === "number")
        const compareResult = onlyContainsInts ? naiveCompare([leftItem], rightItem) : compare([leftItem], rightItem)
        if (compareResult === false) return false
        if (compareResult === undefined) {
          if (1 < rightItem.length) {
            return false
          }
        }
      }
      else if (leftItem > rightItem) return false
    }
    return true
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
