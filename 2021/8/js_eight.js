const fs = require('fs');
let data;
try {
    const raw_data = fs.readFileSync('input.txt', 'utf8');
    data = raw_data.toString().split("\n")

} catch (e) {
    console.log('Error:', e.stack);
}

const outputs = data.map(
    line => line.split("|")[1].split(" ")
        .filter(char => char !== "")
        .map(segment => segment.split("").sort().join(""))
    )

const lines = data.map(
    line => line.split(" ")
        .filter(segment => segment !== "|")
        .map(segment => segment.split("").sort().join(""))
    )

const difference = (str1, str2) => str1.split("")
    .filter(char1 => !str2.split("").includes(char1)).join("")

const common2 = (str1, str2) => str1.split("")
    .filter(char1 => str2.split("").includes(char1)).join("")

const common3 = (str1, str2, str3) => str1.split("")
    .filter(char1 => str2.split("").includes(char1))
    .filter(char1 => str3.split("").includes(char1)).join("")

const createNumber = (arr) => arr.sort().join("")

const dicts = lines.map(line => {
    const filter_by_length = (length) => 
        Array.from(new Set(line.filter(segment => segment.length === length)))

    const len2 = filter_by_length(2)
    const len3 = filter_by_length(3)
    const len4 = filter_by_length(4)
    const len5 = filter_by_length(5)
    const len6 = filter_by_length(6)
    const len7 = filter_by_length(7)
    
    const TOP = difference(len3[0], len2[0])
    const TOP_MIDDLE_BOTTOM = common3(len5[0], len5[1], len5[2])
    const MIDDLE_BOTTOM = TOP_MIDDLE_BOTTOM.split("").filter(char => char !== TOP).join("")
    const TOPLEFT_MIDDLE = difference(len4[0], len2[0])
    const MIDDLE = common2(TOPLEFT_MIDDLE, MIDDLE_BOTTOM)
    const TOPLEFT = difference(TOPLEFT_MIDDLE, MIDDLE)
    const BOTTOM = difference(MIDDLE_BOTTOM, MIDDLE)
    
    const TOPRIGHT_BOTTOMRIGHT = difference(len3[0], TOP)
    const TOP_TOPLEFT_BOTTOM_BOTTOMRIGHT = common3(len6[0], len6[1], len6[2])
    const BOTTOMRIGHT = difference(TOP_TOPLEFT_BOTTOM_BOTTOMRIGHT, [TOP, TOPLEFT, BOTTOM].join(""))
    const TOPRIGHT = difference(TOPRIGHT_BOTTOMRIGHT, BOTTOMRIGHT)
    const BOTTOMLEFT = difference(len7[0], [TOP, TOPRIGHT, TOPLEFT, MIDDLE, BOTTOMRIGHT, BOTTOM].join(""))
    
    const zero = createNumber([TOP, TOPLEFT, TOPRIGHT, BOTTOMLEFT, BOTTOMRIGHT, BOTTOM])
    const one = createNumber([TOPRIGHT, BOTTOMRIGHT])
    const two = createNumber([TOP, TOPRIGHT, MIDDLE, BOTTOMLEFT, BOTTOM])
    const three = createNumber([TOP, TOPRIGHT, MIDDLE, BOTTOMRIGHT, BOTTOM])
    const four = createNumber([TOPLEFT, TOPRIGHT, MIDDLE, BOTTOMRIGHT])
    const five = createNumber([TOP, TOPLEFT, MIDDLE, BOTTOMRIGHT, BOTTOM])
    const six = createNumber([TOP, TOPLEFT, MIDDLE, BOTTOMLEFT, BOTTOMRIGHT, BOTTOM])
    const seven = createNumber([TOP, TOPRIGHT, BOTTOMRIGHT])
    const eight = createNumber([TOP, TOPLEFT, TOPRIGHT, MIDDLE, BOTTOMLEFT, BOTTOMRIGHT, BOTTOM])
    const nine = createNumber([TOP, TOPLEFT, TOPRIGHT, MIDDLE, BOTTOMRIGHT, BOTTOM])

    return {
        [zero]: 0,
        [one]: 1,
        [two]: 2,
        [three]: 3,
        [four]: 4,
        [five]: 5,
        [six]: 6,
        [seven]: 7,
        [eight]: 8,
        [nine]: 9,
    }
})

const values = outputs.map((output, index) => {
    const dict = dicts[index]
    return parseInt(output.map(digit => dict[digit]).join(""))
})
console.log(values)

console.log(values.reduce((acc, digit) => acc + digit))