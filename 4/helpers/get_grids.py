def get_grids(raw_grids):
    grids, current_grid = [], []

    for i, line in enumerate(raw_grids):
        if line == "" or i == len(raw_grids) - 1:
            grids.append(current_grid)
            current_grid = []
        else:
            current_grid.append(list(filter(lambda n: n != "", line.split(" "))))
    return grids