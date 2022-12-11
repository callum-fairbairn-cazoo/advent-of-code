import { rawTest } from "./rawTest"
import { rawInput } from "./rawInput"
import * as R from "ramda"

type command = "noop" | "addx"

const mapFn = (line): [command, string | undefined] => line.split(" ")
const filterFn = (line) => line !== ""

export class Computer {
  register = 1
  cycle = 1
  listenFor = []
  signalStrengths = []
  currentRow = []
  rows = []

  constructor(listenFor: number[]) {
    this.listenFor = listenFor
  }

  noop() {
    this.incrementCycle()
  }

  addx(amount: number) {
    this.incrementCycle()
    this.register = this.register + amount
    this.incrementCycle()
  }

  reset() {
    this.rows.push(this.currentRow)
    this.currentRow = []
  }

  draw() {
    if (this.currentRow.length === 40) {
      this.reset()
    }
    // console.log(this.currentRow.length, this.register);
    if (Math.abs(this.currentRow.length + 1 - this.register) <= 1) {
      this.currentRow.push("██")
      // console.log("#");
    } else {
      this.currentRow.push("░░")
      // console.log(".");
    }
  }

  incrementCycle() {
    this.draw()
    this.cycle++
    if (this.listenFor.includes(this.cycle)) {
      const index = this.listenFor.indexOf(this.cycle)
      this.signalStrengths[index] = this.register * this.cycle
    }
  }
}
export const getSignalStrengths = (computer: Computer, input: string) => {
  const data = input.split("\n").filter(filterFn).map(mapFn)

  data.forEach(([instruction, amount]) => {
    computer[instruction](parseInt(amount))
  })
  return R.sum(computer.signalStrengths)
}

export const part1 = () => {
  const computer = new Computer([20, 60, 100, 140, 180, 220])
  return getSignalStrengths(computer, rawTest)
}

export const part2 = () => {
  const computer = new Computer([20, 60, 100, 140, 180, 220])
  getSignalStrengths(computer, rawInput)
  const rows = computer.rows.concat([computer.currentRow])
  return rows
}
