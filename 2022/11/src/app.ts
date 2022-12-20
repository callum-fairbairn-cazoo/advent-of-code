import { rawTest } from "./rawTest"
import { rawInput } from "./rawInput"
import * as R from "ramda"

const mapFn = (line) => line.split("\n")

const testData = rawTest.split("\n\n").map(mapFn)
const inputData = rawInput.split("\n\n").map(mapFn)

interface Monkey {
  startingItems: number[];
  operation: (old: number) => number;
  test: (worryLevel: number) => boolean;
  divisor: number;
  ifTrueThrowTo: number;
  ifFalseThrowTo: number;
}
export const multiplyRemainder = (remainder: number, divisor: number, multiplier: number) => (remainder * multiplier) % divisor
// const getNewRemainder = (remainder: number, divisor: number, operator: string, modifier: number) => {
//   if ()
// }

const parseInput = (input: string[][]): Monkey[] => input.map((commands) => ({
  startingItems: commands[1].split(":")[1].split(",").map(s => parseInt(s)),
  operation: eval(`old => ${commands[2].split("=")[1]}`),
  // assume division
  test: eval(`worryLevel => worryLevel % ${commands[3].split("by ")[1]} === 0`),
  divisor: parseInt(commands[3].split("by")[1].split(" ")[1]),
  ifTrueThrowTo: parseInt(commands[4].split("monkey ")[1]),
  ifFalseThrowTo: parseInt(commands[5].split("monkey ")[1])
}))


const calculateMonkeyBusiness = (counters: number[]) => {
  const sortedCounters = counters.sort((a, b) => b - a)
  return sortedCounters[0] * sortedCounters[1]
}

const getMonkeyBusiness = (input: string[][]): number => {
  const monkeys = parseInput(input)
  const counters = new Array(monkeys.length).fill(0)
  const product = R.product(monkeys.map(monkey => monkey.divisor))

  for (let i = 0; i < 10000; i++ ) {
    if (i % 1000 === 0) {
      console.log(i);
    }
    monkeys.forEach((monkey, monkeyIndex) => {
      while(monkey.startingItems.length > 0) {
        counters[monkeyIndex] = counters[monkeyIndex] + 1
        const worryLevel = monkey.startingItems.shift()
        const newWorryLevel = monkey.operation(worryLevel) % product
        const targetMonkey = monkey.test(newWorryLevel) ?
          monkey.ifTrueThrowTo : monkey.ifFalseThrowTo
        // const targetMonkey = monkey.ifFalseThrowTo
        monkeys[targetMonkey].startingItems.push(newWorryLevel)
      }
    })
  }

  return calculateMonkeyBusiness(counters)
}


export const test = () => getMonkeyBusiness(testData)

export const real = () => getMonkeyBusiness(inputData)
