data = open("test.txt", "r").read().split("\n")
lines = [line.split(" ") for line in data]
# outputs = [line.split("|")[1].split(" ") for line in data]

lines = list(map(lambda x: list(filter(lambda y: y != "|", x)), lines))
filtered_list = list(map(lambda x: list(map(lambda y: "".join(sorted(y)), x)), lines))

# def calculate(line):
    


print(lines, filtered_list)
