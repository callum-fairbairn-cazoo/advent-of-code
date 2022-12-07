const fs = require("fs")

const scoreMap = {
  // Lose
  "X": 0,
  // Draw
  "Y": 3,
  // Win
  "Z": 6
}

const mapFn = (line) => {
 return [line[0], line[2]]
}

const filterFn = (line) => line !== ""

const getResult = (move1, move2) => {
  if (move1 === "A") {
    if (move2 === "X") return 3
    if (move2 === "Y") return 1
    else return 2
  }
  if (move1 === "B") {
    if (move2 === "X") return 1
    if (move2 === "Y") return 2
    else return 3
  }
  else {
    if (move2 === "X") return 2
    if (move2 === "Y") return 3
    else return 1
  }
}

let data;
try {
  const raw_data = fs.readFileSync('input.txt', 'utf8');
  data = raw_data.split("\n").filter(filterFn).map(mapFn)
} catch (e) {
  console.log('Error:', e.stack);
}

const total = data.reduce((acc, [move1, move2]) => {
  const lineTotal = getResult(move1, move2) + scoreMap[move2]
  console.log({ move1, move2, lineTotal});
  return acc + lineTotal
}, 0)

console.log(total);
