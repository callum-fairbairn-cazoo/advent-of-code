const fs = require("fs")

const mapFn = (line) => line.split("")

const filterFn = (line) => line !== ""

let data;
try {
  const raw_data = fs.readFileSync('input.txt', 'utf8');
  data = raw_data.split("\n").filter(filterFn).map(mapFn)
} catch (e) {
  console.log('Error:', e.stack);
}

const directionTests = [
  // up
  (i, j) => {
    let counter = 0
    const height = data[i][j]
    for (let i2 = i - 1; i2 >= 0; i2--) {
      counter++
      if (height <= data[i2][j]) {
        return counter
      }
    }
    return counter
  },
  // down
  (i, j) => {
    let counter = 0
    const height = data[i][j]
    for (let i2 = i + 1; i2 < data.length; i2++) {
      counter++
      if (height <= data[i2][j]) {
        return counter
      }
    }
    return counter
  },
  // left
  (i, j) => {
    let counter = 0
    const height = data[i][j]
    for (let j2 = j - 1; j2 >= 0; j2--) {
      counter++
      if (height <= data[i][j2]) {
        return counter
      }
    }
    return counter
  },
  // right
  (i, j) => {
    let counter = 0
    const height = data[i][j]
    for (let j2 = j + 1; j2 < data[i].length; j2++) {
      counter++
      if (height <= data[i][j2]) {
        return counter
      }
    }
    return counter
  }
]

const scenicScore = (i, j) => directionTests.reduce((acc, test) => {
  return acc * test(i, j);
}, 1)

const part2 = () => {
  let max = 0
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      const currentScenicScore = scenicScore(i, j)
      if (currentScenicScore > max) {
        max = currentScenicScore
      }
    }
  }
  return max
}

console.log(part2());
