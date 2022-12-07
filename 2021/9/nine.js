const fs = require('fs');

class Node {
    constructor(value) {
        this.value = value
        this.isLowPoint = false
    }
}

let data;
try {
    const raw_data = fs.readFileSync('test.txt', 'utf8');
    data = raw_data.split("\n").map(line => line.split("").map(char => new Node(parseInt(char))))
} catch (e) {
    console.log('Error:', e.stack);
}

const isPointInBounds = (point, arr) => point >= 0 && point <= arr.length - 1


// code begins here

data.forEach((line, x) => {
    line.forEach((currentNode, y) => {
        const adjacentNodes = []
        // upper
        if (isPointInBounds(x - 1, data)) {
            adjacentNodes.push(data[x - 1][y])
        }
        // right
        if (isPointInBounds(y + 1, line)) {
            adjacentNodes.push(data[x][y + 1])
        }
        // lower
        if (isPointInBounds(x + 1, data)) {
            adjacentNodes.push(data[x + 1][y])
        }
        // left
        if (isPointInBounds(y - 1, line)) {
            adjacentNodes.push(data[x][y - 1])
        }

        if (!adjacentNodes.some(otherHeight => otherHeight.value <= currentNode.value)) {
            currentNode.isLowPoint = true
        }
    })
})

console.log(data)
