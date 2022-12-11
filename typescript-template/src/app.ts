import * as fs from "fs"

const mapFn = (line) => line

const filterFn = (line) => line !== ""

let data;
try {
  const raw_data = fs.readFileSync('input.txt', 'utf8');
  data = raw_data.split("\n").filter(filterFn).map(mapFn)
} catch (e) {
  console.log('Error:', e.stack);
}
