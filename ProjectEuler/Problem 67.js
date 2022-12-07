// https://projecteuler.net/problem=67

const fs = require("fs")

const maximalPath = (triangle) => {
  const map = new Map()
  const dfs = (x, y) => {
    if (x < 0 || x > triangle[y].length - 1) {
      return -1
    }
    const string = `{${x},${y}`
    if (map.has(string)) return map.get(string)

    if (y === triangle.length - 1) {
      return triangle[y][x]
    }
    let total = triangle[y][x]
    const left = dfs(x, y + 1)
    const right = dfs(x + 1, y + 1)

    if (left !== -1 && right !== -1) {
      // console.log("1. adding on ", Math.min(left, down), "for", x, y,);
      total = total + Math.max(left, right)
    }
    else if (left !== -1) {
      // console.log("2. adding on ", left, "for", x, y,);
      total = total + left
    }
    else if (right !== -1) {
      // console.log("3. adding on ", right, "for", x, y,);
      total = total + right
    }

    map.set(string, total)
    return total
  }

  return dfs(0, 0)
}

const mapFn = (line) => {
  return line.split(" ").map((item) => parseInt(item))
}

const filterFn = (line) => line !== ""

let data;
try {
  const raw_data = fs.readFileSync('maximalPathInput.txt', 'utf8');
  data = raw_data.split("\n").filter(filterFn).map(mapFn)
} catch (e) {
  console.log('Error:', e.stack);
}

console.log(maximalPath(data));
