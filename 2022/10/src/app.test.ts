import { Computer, getSignalStrengths, part1, part2 } from "./app";

describe("getSignalStrengths", () => {
  it("returns 16 at the 4th step", () => {
    const input = `noop
addx 3
addx -5`
    const computer = new Computer([4])
    expect(getSignalStrengths(computer, input)).toEqual(16)
  })

  it("returns 420 at the 20th step", () => {
    const input = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5`
    const computer = new Computer([20])
    expect(getSignalStrengths(computer, input)).toEqual(420)
  })
})

describe('execute', () => {
  it('part1', () => {
    expect(part1()).toEqual(13140)
  });

  fit('part2', () => {
    const result = part2()
    result.forEach((line) => {
      line.forEach((char) => process.stdout.write(char))
      process.stdout.write("\n")
    })
  });
});


