def check_line_for_win(line):
    return all(n == "X" for n in line)


def check_grid_for_win(grid):
    return any(check_line_for_win(line) for line in grid)
