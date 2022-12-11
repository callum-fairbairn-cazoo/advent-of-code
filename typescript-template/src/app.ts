import * as fs from "fs"

const mapFn = (line) => line

const filterFn = (line) => line !== ""

let data: { test: any[], input: any[] };
try {
  const raw_test_data = fs.readFileSync('test.txt', 'utf8');
  const raw_input_data = fs.readFileSync('input.txt', 'utf8');
  data.test = raw_test_data.split("\n").filter(filterFn).map(mapFn)
  data.input = raw_input_data.split("\n").filter(filterFn).map(mapFn)
} catch (e) {
  console.log('Error:', e.stack);
}
