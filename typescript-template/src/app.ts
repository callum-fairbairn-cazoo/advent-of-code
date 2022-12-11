import { rawTest } from "./rawTest"
import { rawInput } from "./rawInput"

const mapFn = (line) => line
const filterFn = (line) => line !== ""

const testData = rawTest.split("\n").filter(filterFn).map(mapFn)
const inputData = rawInput.split("\n").filter(filterFn).map(mapFn)

export const part1 = () => testData

export const part2 = () => inputData
