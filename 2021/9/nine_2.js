const fs = require('fs');

class Coord {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

class Node {
    constructor(value, coord) {
        this.value = value
        this.coord = coord
        this.visited = false
    }
}

let data;
try {
    const raw_data = fs.readFileSync('test.txt', 'utf8');
    data = raw_data.split("\n").map((line, x) => line.split("").map((char, y) => new Node(parseInt(char), new Coord(x, y))))
} catch (e) {
    console.log('Error:', e.stack);
}

const isPointInBounds = (point, arr) => point >= 0 && point <= arr.length - 1

const getAdjacentNodes = (x, y) => {
    const adjacentNodes = []

    // upper
    if (isPointInBounds(x - 1, data)) {
        const nextNode = data[x - 1][y]
        if (!nextNode.visited) {
            adjacentNodes.push()
        }
    }
    // right
    if (isPointInBounds(y + 1, data[x])) {
        const nextNode = data[x][y + 1]
        if (!nextNode.visited) {
            adjacentNodes.push()
        }
    }
    // lower
    if (isPointInBounds(x + 1, data)) {
        const nextNode = data[x + 1][y]
        if (!nextNode.visited) {
            adjacentNodes.push()
        }
    }
    // left
    if (isPointInBounds(y - 1, data[x])) {
        const nextNode = data[x][y - 1]
        if (!nextNode.visited) {
            adjacentNodes.push()
        }
    }
}

// code begins here

const stack = []

data.forEach((line, x) => {
    line.forEach((currentNode, y) => {
        if (!currentNode.visited) return

        const adjacentNodes = getAdjacentNodes(x, y)
    })
})
