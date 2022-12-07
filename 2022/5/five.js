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

const crates = data
  .filter((line) => !line.includes("\[") && !line.includes("move"))[0]
  .split(" ")
  .filter(char => char !== "")
  .map(() => [])

// populate crates
data
  .reverse()
  .filter(line => line.includes("\["))
  .forEach(line => {
    for (let i = 0; i < line.length; i++) {
      if (/[A-Z]/.test(line[i])) {
        crates[Math.floor(i / 4)].push(line[i])
      }
    }
})

// do instructions
data
  .reverse()
  .filter(line => line.includes("move"))
  .forEach(instruction => {
    const stuff = instruction.split(" ")
    const amount = stuff[1]
    const crate1Index = stuff[3] - 1
    const crate2Index = stuff[5] - 1
    const crate1 = crates[crate1Index]

    const sliceIndex = crate1.length - amount
    const newCrate = crate1.slice(0, sliceIndex)
    const toMove = crate1.slice(sliceIndex)
    crates[crate1Index] = newCrate
    crates[crate2Index].push(...toMove)
  })

console.log(crates.map((crate) => crate.at(-1)).join(""));
