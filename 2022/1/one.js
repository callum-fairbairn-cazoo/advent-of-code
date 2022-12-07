const fs = require("fs")

let data;
try {
  const raw_data = fs.readFileSync('input.txt', 'utf8');
  data = raw_data.split("\n").reduce((acc, current) => {
    if (current === "") {
      return acc.concat(0)
    } else {
      const length = acc.length
       acc[length - 1] = acc.at(-1) + parseInt(current)
      return acc
    }
  }, [])
} catch (e) {
  console.log('Error:', e.stack);
}

const topThree = [
  0,
  0,
  0
]
data.forEach((item) => {
  const minTopThree = Math.min(...topThree)
  if (item > minTopThree) {
    const minIndex = topThree.indexOf(minTopThree)
    topThree[minIndex] = item
  }
})

console.log(topThree[0] + topThree[1] + topThree[2]);
