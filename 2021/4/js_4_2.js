const fs = require('fs');
let data;
try {
    const raw_data = fs.readFileSync('input.txt', 'utf8');
    data = raw_data.toString().split("\n")

} catch (e) {
    console.log('Error:', e.stack);
}

const input = data[0].split(",")
const raw_grids = data.slice(2)

const sanitise_line = (line) => line.split(" ").filter(char => char !== "")

let grids = []
let current_grid = []
raw_grids.forEach((current_line, i) => {
    if (current_line === "") {
        grids.push(current_grid)
        current_grid = []
    }
    else if (i === raw_grids.length - 1) {
        grids.push(current_grid.concat([sanitise_line(current_line)]))
    }
    else current_grid.push(sanitise_line(current_line))
})

const check_line_for_win = line => line.every(num => num === "X")

const invertGrid = grid => {
    const columns = []
    for (let i = 0; i < grid[0].length; i++) {
        let newColumn = []
        grid.forEach(row => {
            newColumn.push(row[i])
        })
        columns.push(newColumn)
    }
    return columns
}

const check_grid_for_win = (grid) => {
    const columns = invertGrid(grid)
    return grid.some(line => check_line_for_win(line)) || columns.some(line => check_line_for_win(line))
}

const find_last_win = () => {
    const analyse_grids = grids.map(grid => {
        let current_grid = JSON.parse(JSON.stringify(grid))
        let winning_grid = []
        let winning_num = 0
        let input_index = 0
        while(winning_grid.length === 0) {
            if (input_index === input.length) {
                return [0, []]
            }

            const input_num = input[input_index]
            const marked_grid = current_grid.map(line => line.map(num => num === input_num ? "X" : num))
            if (check_grid_for_win(marked_grid)) {
                winning_grid = marked_grid
                winning_num = input_num
            }
            current_grid = marked_grid
            input_index++
        }
        return [input_index, winning_num, winning_grid]
    })
    return analyse_grids.sort(([a], [b]) => {
        if (a < b) return +1
        if (a > b) return -1
        return 0
    })[0]
}

const [_, winning_num, winning_grid] = find_last_win()
let counter = 0;
winning_grid.forEach(row => row.forEach(number => {
    if (number !== "X") {
        counter = counter + parseInt(number)
    }
}))
console.log(winning_num, winning_grid)
console.log(counter * winning_num)