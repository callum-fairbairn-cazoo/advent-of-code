const fs = require("fs")

const mapFn = (line) => line

const filterFn = (line) => line !== ""

let data;
try {
  const raw_data = fs.readFileSync('input.txt', 'utf8');
  data = raw_data.split("\n").filter(filterFn).map(mapFn)
} catch (e) {
  console.log('Error:', e.stack);
}

const containsRepeating = (window) => new Set(window).size !== window.length

const getPacketMarker = (size, line) => {
  const window = [...line.slice(0, size)]
  let counter = 3
  while(containsRepeating(window) && counter < line.length) {
    counter++
    window.shift()
    window.push(line[counter])
  }
  return counter + 1
}

const part1 = () => {
  return data.map((line) => getPacketMarker(4, line))
}

const part2 = () => {
  return data.map((line) => getPacketMarker(14, line))
}

console.log(part1());
console.log(part2());
