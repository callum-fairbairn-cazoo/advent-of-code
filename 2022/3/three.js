const fs = require("fs")

const mapFn = (line) => {
  return line
}

const filterFn = (line) => line !== ""

let data;
try {
  const raw_data = fs.readFileSync('input.txt', 'utf8');
  data = raw_data.split("\n").filter(filterFn).map(mapFn)
} catch (e) {
  console.log('Error:', e.stack);
}

const getPriority = (char) => {
  if (char === undefined) return 0
  const isUppercase = char === char.toUpperCase()
  if (isUppercase) {
    return char.charCodeAt(0) - 38
  }
  return char.charCodeAt(0) - 96
}

const getCommonChar = ([line1, line2, line3]) => {
  const charsIn1And2 = line1.split("").reduce((acc, char) => {
    if (line2.search(char) > -1) {
      acc.add(char);
    }
    return acc
  }, new Set())

  return Array.from(charsIn1And2).find((char) => {
    return line3.search(char) > -1;
  })
}

let store = []
const total = data.reduce((acc, line) => {
  store.push(line)
  if (store.length === 3) {
    store.sort((a, b) => a.length - b.length)
    acc = acc + getPriority(getCommonChar(store))
    store = []
  }
  return acc
}, 0)
console.log(total);
