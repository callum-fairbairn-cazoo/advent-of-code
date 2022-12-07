
import copy

def flatten(t):
    return [item for sublist in t for item in sublist]

def transform_line(line):
    split = line.split(" ") 
    return [list(map(lambda x: int(x), split[0].split(","))), list(map(lambda x: int(x), split[2].split(",")))]

def draw_line(grid, line):
    [[x1, y1], [x2, y2]] = line
    grid_copy = copy.deepcopy(grid)

    x_step = 0 if x1 == x2 else -1 if x1 > x2 else 1
    y_step = 0 if y1 == y2 else -1 if y1 > y2 else 1

    current_x, current_y = x1, y1
    while(current_x != x2 + x_step or current_y != y2 + y_step):
        grid_copy[current_y][current_x] += 1
        current_x += x_step
        current_y += y_step
    
    return grid_copy

data = open("input.txt", "r").read().splitlines()
lines = list(map(transform_line, data))

max_x = int(max(flatten(map(lambda coord_piar: [coord_piar[0][0], coord_piar[1][0]], lines))))
max_y = int(max(flatten(map(lambda coord_piar: [coord_piar[0][1], coord_piar[1][1]], lines))))

grid = [[0] * (max_x + 1) for i in range(max_y + 1)]

for line in lines:
    print(line)
    grid = draw_line(grid, line)

counter = 0
for y in grid:
    for x in y:
        if (x > 1):
            counter += 1

print(counter)