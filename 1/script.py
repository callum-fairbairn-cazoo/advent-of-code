file = open("input.txt", "r")
input = file.read()
numbers_as_text = input.splitlines()
numbers = [int(x) for x in numbers_as_text]

counter = 0
previous_window = numbers[0] + numbers[1] + numbers[2]

for index, val in enumerate(numbers[1:-2]):
    new_window = numbers[index + 1] + numbers[index + 2] + numbers[index + 3]
    if (new_window > previous_window):
        counter += 1
    previous_window = new_window

print(counter)
