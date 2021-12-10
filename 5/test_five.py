from five import draw_line

test_grid = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]

class TestDrawHorizontalLine:
    def test_works_for_line_of_length_1(self):
        grid = test_grid.copy()
        line = [[0, 0], [1, 0]]
        expected_grid = [[1, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]

        assert draw_line(grid, line) == expected_grid

    def test_works_for_reverse(self):
        grid = test_grid.copy()
        line = [[1, 0], [0, 0]]
        expected_grid = [[1, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]

        assert draw_line(grid, line) == expected_grid

    def test_works_for_a_different_y_value(self):
        grid = test_grid.copy()
        line = [[1, 2], [3, 2]]
        expected_grid = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 1, 1, 1], [0, 0, 0, 0]]

        assert draw_line(grid, line) == expected_grid

    def test_adds_to_numbers_already_there(self):
        grid = [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]]
        line = [[1, 2], [3, 2]]
        expected_grid = [[0, 0, 0, 0], [0, 0, 0, 0], [1, 2, 2, 2], [0, 0, 0, 0]]

        assert draw_line(grid, line) == expected_grid

class TestDrawVerticalLine:
    def test_line_of_length_1(self):
        grid = test_grid.copy()
        line = [[0, 0], [0, 1]]
        expected_grid = [[1, 0, 0, 0], [1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]

        assert draw_line(grid, line) == expected_grid

    def test_different_column_length_and_start(self):
        grid = [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]]
        line = [[1, 1], [1, 3]]
        expected_grid = [[0, 0, 0, 0], [0, 1, 0, 0], [1, 2, 1, 1], [0, 1, 0, 0]]

        assert draw_line(grid, line) == expected_grid

class TestDrawDiagonalLine:
    def test_diagonal(self):
        grid = test_grid.copy()
        line = [[0, 0], [2, 2]]
        expected_grid = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 0]]

        assert draw_line(grid, line) == expected_grid

    def test_diagonal_opposite_direction(self):
        grid = test_grid.copy()
        line = [[0, 2], [2, 0]]
        expected_grid = [[0, 0, 1, 0], [0, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 0]]

        assert draw_line(grid, line) == expected_grid

    
    