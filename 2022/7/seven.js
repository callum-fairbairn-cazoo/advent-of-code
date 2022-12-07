const fs = require("fs")

const mapFn = (line) => line.split(" ")

const filterFn = (line) => line !== ""

let data;
try {
  const raw_data = fs.readFileSync('input.txt', 'utf8');
  data = raw_data.split("\n").filter(filterFn).map(mapFn)
} catch (e) {
  console.log('Error:', e.stack);
}

const allFiles = []
let min = Infinity

class Node {
  type
  size
  constructor(name, parent) {
    this.name = name
    this.parent = parent
  }

  getType() {
    return this.type
  }

  getParent() {
    return this.parent
  }
}

class Directory extends Node {
  type = "dir"
  content = []
  constructor(name, parent) {
    super(name, parent);
  }

  add(content) {
    this.content.push(content)
  }

  get(name) {
    // if (this.name === name) return this
    return this.content.find(thing => thing.name === name)
  }

  getSize() {
    if (this.size) {
      return this.size
    }
    this.size = this.content.reduce((acc, thing) => acc + thing.getSize(), 0)
    // console.log(this.size);
    if (this.size >= 3837783 && this.size < min) {
      min = this.size
    }
    return this.size
  }
}

class File extends Node {
  type = "file"
  constructor(name, parent, size) {
    super(name);
    this.size = size
  }

  getSize() {
    allFiles.push(this.size)
    return this.size
  }
}

const parseInput = () => {
  const tree = new Directory("/")
  let currentDir = tree

  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === "$") {
      if (data[i][1] === "cd") {
        if (data[i][2] === "..") {
          currentDir = currentDir.getParent()
        } else if (data[i][2] !== "/") {
          currentDir = currentDir.get(data[i][2])
        }
      }
    }
    if (data[i][0] === "dir") {
      currentDir.add(new Directory(data[i][1], currentDir))
    }
    if (!isNaN(parseInt(data[i][0]))) {
      currentDir.add(new File(data[i][1], currentDir, parseInt(data[i][0])))
    }
  }
  tree.getSize()
  return tree.getSize()
}

// console.log(parseInput())
console.log(30000000 - (70000000 - parseInput()));
console.log(min)
