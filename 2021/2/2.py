file = open("input.txt", "r")
input = file.read()
lines = input.splitlines()

pos = 0
depth = 0
aim = 0

for line in lines:
    [instruction, value] = line.split(" ")
    value = int(value)

    if (instruction == "down"):
        aim += value
    elif (instruction == "up"):
        aim -= value
    else:
        pos += value
        depth += aim * value

print(pos * depth)
