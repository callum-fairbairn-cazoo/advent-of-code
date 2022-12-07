const fs = require("fs")

const mapFn = (line) => {
  return line.split(",").map((range) => range.split("-").map(numAsString => parseInt(numAsString)))
}

const filterFn = (line) => line !== ""

let data;
try {
  const raw_data = fs.readFileSync('input.txt', 'utf8');
  data = raw_data.split("\n").filter(filterFn).map(mapFn)
} catch (e) {
  console.log('Error:', e.stack);
}

const overlap = (rangeA, rangeB) => {
  const AStartsBeforeBStarts = rangeA[0] <= rangeB[0]
  const AEndsAfterBStarts = rangeA[1] >= rangeB[0]
  const AEndsAfterBEnds = rangeA[1] >= rangeB[1]
  const AStartsBeforeBEnds = rangeA[0] <= rangeB[1]
  return (AStartsBeforeBStarts && AEndsAfterBStarts) || AEndsAfterBEnds && AStartsBeforeBEnds;
}

const total = data.reduce((accumulator, [range1, range2]) => {
  if (overlap(range1, range2) || overlap(range2, range1)) {
    return accumulator + 1
  }
  return accumulator
}, 0)

console.log(total);
