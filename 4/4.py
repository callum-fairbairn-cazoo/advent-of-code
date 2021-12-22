from helpers.get_grids import get_grids
from helpers.check_for_win import check_grid_for_win

data = open("test.txt", "r").read().splitlines()

numbers = data[0].split(",")
raw_grids = data[2:]

grids = get_grids(raw_grids)
found = False

while(not found):
    for num in numbers:
        def fill_grid_with_x(grid):
            def fill_line_with_x(line):
                return list(map(lambda n: "X" if n == num else n, line))

            new_grid = list(map(fill_line_with_x, grid))
            if check_grid_for_win(new_grid):
                print("Win!", new_grid, num)
                found = True

            return new_grid
        grids = list(map(fill_grid_with_x, grids))
    
