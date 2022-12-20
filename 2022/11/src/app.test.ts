import { test, real, multiplyRemainder } from "./app";
describe("multiplyRemainder", () => {
  it("works", () => {
    expect(multiplyRemainder(1, 9, 6)).toEqual(6)
    expect(multiplyRemainder(10, 23, 19)).toEqual(6)
    expect(multiplyRemainder(10, 23, 10)).toEqual(8)
  })
})

describe('execute', () => {
  it('part1', () => {
    console.log(test());
  });

  it('part2', () => {
    console.log(real());
  });
});


