import { compare, filterFn, mapFn, part1, part2, sort } from "./app";
import { rawTest } from "./rawTest";
import { rawInput } from "./rawInput";

const testData = rawTest.split("\n\n").filter(filterFn).map(mapFn)
const inputData = rawInput.split("\n\n").filter(filterFn).map(mapFn)

const testData2 = rawTest.split("\n").filter(filterFn).map((item) => eval(item))
const inputData2 = rawInput.split("\n").filter(filterFn).map((item) => eval(item))

describe("compare", () => {
  describe("for just ints", () => {
    it("returns true for inputs in the right order", () => {
      const left = [1,1,2,3,4]
      const right = [1,1,3,4,5]
      expect(compare(left, right)).toEqual(true)
    })

    it("returns false for inputs in the wrong order", () => {
      const left = [1,1,5,1,1]
      const right = [1,1,3,1,1]
      expect(compare(left, right)).toEqual(false)
    })
  })

  describe("when both values have lists", () => {
    it("returns true if left numbers are smaller ", () => {
      const left = [[2,3,4]]
      const right = [[4,5,6]]
      expect(compare(left, right)).toEqual(true)
    })

    it("returns true if right runs out of items first ", () => {
      const left = [[2]]
      const right = [[4,5,6]]
      expect(compare(left, right)).toEqual(true)
    })

    it("returns false if left numbers are larger", () => {
      const left = [[4,5,6]]
      const right = [[2,3,4]]
      expect(compare(left, right)).toEqual(false)
    })

    it("returns false if left numbers are larger 2", () => {
      const left = [[2,3,4]]
      const right = [[4]]
      expect(compare(left, right)).toEqual(true)
    })
  })

  describe("when one value is a list", () => {
    it("returns true when the left int becomes a list", () => {
      const left = [2]
      const right = [[4,5,6]]
      expect(compare(left, right)).toEqual(true)
    })

    it("returns false when the right int becomes a list", () => {
      const left = [[2,3,4]]
      const right = [4]
      expect(compare(left, right)).toEqual(true)
    })
  })

  it("test case 1", () => {
    const left = [1,1,3,1,1]
    const right = [1,1,5,1,1]
    expect(compare(left, right)).toEqual(true)
  })

  it("test case 2", () => {
    const left = [[1],[2,3,4]]
    const right = [[1],4]
    expect(compare(left, right)).toEqual(true)
  })

  it("test case 3", () => {
    const left = [9]
    const right = [[8,7,6]]
    expect(compare(left, right)).toEqual(false)
  })

  it("test case 4", () => {
    const left = [[4,4],4,4]
    const right = [[4,4],4,4,4]
    expect(compare(left, right)).toEqual(true)
  })

  it("test case 5", () => {
    const left = [1,[2,[3,[4,[5,6,7]]]],8,9]
    const right = [1,[2,[3,[4,[5,6,0]]]],8,9]
    expect(compare(left, right)).toEqual(false)
  })

  it("test case 6", () => {
    const left = [[]]
    const right = [[[]]]
    expect(compare(left, right)).toEqual(true)
  })

  it("test case 7", () => {
    const left = [[[]]]
    const right = [[]]
    expect(compare(left, right)).toEqual(false)
  })

  it("test case 8", () => {
    const left = []
    const right = [3]
    expect(compare(left, right)).toEqual(true)
  })

  it("test case 9", () => {
    const left = [3]
    const right = []
    expect(compare(left, right)).toEqual(false)
  })

  it("test case 10", () => {
    const left = [[2,[5],7,5,7],[1,[0,7,[3,7]],[0,10]],[10],[]]
    const right = [[9]]
    expect(compare(left, right)).toEqual(true)
  })

  it("test case 11", () => {
    const left = [7,7,7,7]
    const right = [7,7,7]
    expect(compare(left, right)).toEqual(false)
  })

  it("test case 12", () => {
    const left = [[3]]
    const right = [[[[9],[6,6]]],[4],[[7]]]
    expect(compare(left, right)).toEqual(true)
  })

  it("test case 13", () => {
    const left = [[2,[],8,[9,[10,5],[9],1]],[5]]
    const right = [[9,[[0,1],4,8,[6,5]],9,6]]
    expect(compare(left, right)).toEqual(true)
  })

  it("test case 14", () => {
    const left = [[[]]]
    const right = [[1]]
    // [[[]]] x [[1]] -> [[]] x [1] -> [] x 1
    expect(compare(left, right)).toEqual(true)
  })

  it("test case 15", () => {
    const left = [[7,[1,[7,8,5,10],5,[9,0,10,9,4]],[9],6],[[[9]],5,2],[],[10,[0],[[1,4],[2,6],[9,4,10]]],[[[],2,[3,7,1],7],7,9]]
    const right = [[[9,[8,7,7,4],[10,4,9],[1,8,6,8],6],10,[]],[9,[[],[6,7,6]],[]]]
    expect(compare(left, right)).toEqual(true)
  })

  it("test case 16", () => {
    const left = [[[[],8],1]]
    const right = [[[[]]],[[[0,6,8]],[],1,[[4,5,6,7]]],[[5,[10,10,8],[5,4,2,10,5],[4,10,7,0]],7,5,[6,[4,6,8,7,8],[4,8,6]]],[0,5],[9]]
    // [[[],8],1] x [[[]]]
    // [[],8] x [[]]
    expect(compare(left, right)).toEqual(false)
  })
})

describe("sort", () => {
  it.each([
    [
      [[2], [1]],
      [[1], [2]],
    ],
    [
      [[], [1]],
      [[], [1]],
    ],
    [
      [[[1]], [1]],
      [[1], [[1]]],
    ],
    [
      [[1, [2, 3]], [1, [1, 3]]],
      [[1, [1, 3]], [1, [2, 3]]],
    ],
  ])("sort(%o) => %o", (unsortded, sorted) => {
    expect(sort(unsortded)).toEqual(sorted)
  })
})

describe('execute', () => {
  it('part1 testData', () => {
    console.log(part1(testData));
  });

  it('part1 inputData', () => {
    console.log(part1(inputData));
  });

  it('part2 test data', () => {
    console.log(part2(testData2));
  });

  it('part2 input data', () => {
    console.log(part2(inputData2));
  });
});


