import math

bracket_map = {
    "(": ")",
    "[": "]",
    "{": "}",
    "<": ">"
}

point_map = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137
}

point_map_2 = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4
}


def get_corrupted_score(string):
    array = []
    for char in string:
        if char in bracket_map.keys():
            array.append(char)
        elif char in bracket_map.values():
            if bracket_map[array.pop()] is not char:
                return point_map[char]

    return 0


def get_incomplete_score(string):
    array = []
    for char in string:
        if char in bracket_map.keys():
            array.append(char)
        elif char in bracket_map.values():
            if bracket_map[array.pop()] is not char:
                return 0

    print(array)
    sub_tally = 0
    for char in reversed(array):
        completing_char = bracket_map[char]
        sub_tally *= 5
        sub_tally += point_map_2[completing_char]
        print(sub_tally)

    return sub_tally


data = open("input.txt", "r").read().split("\n")
lines = [line.split(" ") for line in data]

scores = []

for line in lines:
    score = get_incomplete_score(line[0])
    if score is not 0:
        scores.append(score)

scores.sort()

print(scores[math.floor(len(scores) / 2)])
