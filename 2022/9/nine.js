const fs = require("fs")

const mapFn = (line) => line.split(" ")

const filterFn = (line) => line !== ""

let data;
try {
  const raw_data = fs.readFileSync('input.txt', 'utf8');
  data = raw_data.split("\n").filter(filterFn).map(mapFn)
} catch (e) {
  console.log('Error:', e.stack);
}

const hPosMap = {
  "L": ({x, y}) => ({x: x - 1, y}),
  "R": ({x, y}) => ({x: x + 1, y}),
  "U": ({x, y}) => ({x: x, y: y + 1}),
  "D": ({x, y}) => ({x: x, y: y - 1}),
}

const tPosMap = {
  "ENE": ({x, y}) => ({ x: x + 1, y: y + 1 }),
  "ESE": ({x, y}) => ({ x: x + 1, y: y - 1 }),
  "SES": ({x, y}) => ({ x: x - 1, y: y + 1 }),
  "SWS": ({x, y}) => ({ x: x - 1, y: y - 1 }),
  "WSW": ({x, y}) => ({ x: x + 1, y: y + 1 }),
  "WNW": ({x, y}) => ({ x: x - 1, y: y + 1 }),
  "NWN": ({x, y}) => ({ x: x + 1, y: y - 1 }),
  "NEN": ({x, y}) => ({ x: x - 1, y: y - 1 }),
}

const getNewTPos = (tPos, newHPos) => {
  if (newHPos.x - tPos.x >= 2) {
    if (newHPos.y > tPos.y) {
      return tPosMap["ENE"](tPos)
    }
    if (newHPos.y < tPos.y) {
      return tPosMap["ESE"](tPos)
    }
    return { x: tPos.x + 1, y: tPos.y }
  }
  if (newHPos.x - tPos.x <= -2) {
    if (newHPos.y > tPos.y) {
      return tPosMap["SES"](tPos)
    }
    if (newHPos.y < tPos.y) {
      return tPosMap["SWS"](tPos)
    }
    return { x: tPos.x - 1, y: tPos.y }
  }
  if (newHPos.y - tPos.y >= 2) {
    if (newHPos.x > tPos.x) {
      return tPosMap["WSW"](tPos)
    }
    if (newHPos.x < tPos.x) {
      return tPosMap["WNW"](tPos)
    }
    return { x: tPos.x, y: tPos.y + 1 }
  }
  if (newHPos.y - tPos.y <= -2) {
    if (newHPos.x > tPos.x) {
      return tPosMap["NWN"](tPos)
    }
    if (newHPos.x < tPos.x) {
      return tPosMap["NEN"](tPos)
    }
    return { x: tPos.x, y: tPos.y - 1 }
  }
  return tPos
}

const getNewPositions = ((positions, [dir, mag], set) => {
  const newPositions = [...positions]
  for (let n = 0; n < parseInt(mag); n++) {
    for (let i  = 0; i < positions.length - 1; i++) {
      const newHPos = i === 0 ? hPosMap[dir](newPositions[i]) : newPositions[i]
      const newTPos = getNewTPos(newPositions[i + 1], newHPos)
      newPositions[i] = newHPos
      newPositions[i + 1] = newTPos
      if (i === newPositions.length - 2) {
        set.add(`${newTPos.x}.${newTPos.y}`)
      }
    }
  }
  return newPositions
})

const calculateTPositions = (rope) => {
  const set = new Set()
  data.forEach((line) => {
    rope = getNewPositions(rope, line, set)
  })
  return set.size
}

const part1 = () => {
  const rope = [{ x: 0, y: 0 }, { x: 0, y: 0 }]
  return calculateTPositions(rope)
}

const part2 = () => {
  const rope = [
    // Head
    { x: 0, y: 0 },
    // T
    { x: 0, y: 0 },
    // 2
    { x: 0, y: 0 },
    // 3
    { x: 0, y: 0 },
    // 4
    { x: 0, y: 0 },
    // 5
    { x: 0, y: 0 },
    // 6
    { x: 0, y: 0 },
    // 7
    { x: 0, y: 0 },
    // 8
    { x: 0, y: 0 },
    // 9
    { x: 0, y: 0 },
  ]
  return calculateTPositions(rope)
}

console.log(part1() === 5858);
console.log(part2() === 2602);
