import { filterFn, mapFn, part1, part2 } from "./app";
import { rawTest } from "./rawTest";
import { rawInput } from "./rawInput";

const testData = rawTest.split("\n").filter(filterFn).map(mapFn)
const inputData = rawInput.split("\n").filter(filterFn).map(mapFn)

describe('execute', () => {
  it('part1', () => {
    part1(testData, inputData)
  });

  xit('part2', () => {
    part2(testData, inputData)
  });
});


