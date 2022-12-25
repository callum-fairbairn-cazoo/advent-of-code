export const mapFn = (line) => ({
  left: eval(line.split("\n")[0]),
  right: eval(line.split("\n")[1]),
})

export const filterFn = (line) => line !== ""


export type RecursiveArray = Array<RecursiveArray | number>

export const compare = (left: RecursiveArray, right: RecursiveArray) => {
  let status
  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    const leftItem = left[i], rightItem = right[i]
    if (leftItem === undefined || rightItem === undefined) {
      return !(rightItem === undefined && status === undefined);
    }
    if (typeof leftItem === "object" && typeof rightItem === "object") {
      const compareResult = compare(leftItem, rightItem)
      if (compareResult === false) return false
      if (compareResult === undefined) {
        if (leftItem.length > rightItem.length) return false
      } else {
        return true
      }
    }
    else if (typeof leftItem === "object") {
      const compareResult = compare(leftItem, [rightItem])
      if (compareResult === false) return false
      if (compareResult === undefined) {
        if (leftItem.length < 1) return false;
      } else {
        return true
      }
    }
    else if (typeof rightItem === "object") {
      const compareResult = compare([leftItem], rightItem)
      if (compareResult === false) return false
      if (compareResult === undefined) {
        if (1 < rightItem.length) {
          return false
        }
      } else {
        return true
      }
    }
    if (leftItem > rightItem) return false
    if (leftItem < rightItem) return true
  }
  const same = left.length === right.length
  return same ? undefined : true
}

const countIndices = (data) => {
  let counter = 0
  data.forEach(({left, right}, index) => {
    console.log(index, compare(left, right));
    if (compare(left, right)) counter += (index + 1)
  })
  return counter
}

const flatMapFn = (item) => item.length === 0 ? -1 : item

export const sort = (packets: RecursiveArray[]): RecursiveArray[] =>
  packets.sort((a, b) => compare(a, b) ? -1 : 1)

const findDividers = (data: RecursiveArray[]) => {
  const firstDivider = [[2]]
  const firstDividerIndex = data.findIndex(item => `${item}` === `${firstDivider}`) + 1
  const secondDivider = [[6]]
  const secondDividerIndex = data.findIndex(item => `${item}` === `${secondDivider}`) + 1
  console.log(firstDividerIndex, secondDividerIndex);
  return firstDividerIndex * secondDividerIndex
}

export const part1 = (data) => countIndices(data)
export const part2 = (data) => {
  const sorted = sort(data.concat([[[2]], [[6]]],))
  console.log(sorted);
  return findDividers(sorted)
}
