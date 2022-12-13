import { findInMatrix, part1, part2, shortestPath } from "./app2";

describe("findInMatrix", () => {
  it("finds S", () => {
    // c a
    // b S
    const input = [["c", "a"], ["b", "S"]]

    expect(findInMatrix("S", input)).toEqual({ x: 1, y: 1 })
  })
})

describe("shortestPath", () => {
  it("finds the shortest path given trivial input", () => {
    // S E
    const input = [["S"], ["E"]]

    expect(shortestPath(input)).toEqual(["a", "E"])
  })

  it("finds the shortest path given short input", () => {
    // S f
    // b E
    const input = [["S", "f"], ["b", "E"]]

    expect(shortestPath(input)).toEqual(["a", "b", "E"])
  })

  it("finds the shortest path given heights", () => {
    // b c d e f
    // a z z z E
    // S z z z z
    const input = [["b", "c", "d", "e", "f"], ["a", "z", "z", "z", "E"], ["S", "z", "z", "z", "z"]]

    expect(shortestPath(input)).toEqual(["a", "a", "b", "c", "d", "e", "f", "E"])
  })
})

describe('execute', () => {
  it('part1', () => {
    console.log(part1());
  });

  it('part2', () => {
    console.log(part2());
  });
});


