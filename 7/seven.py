def get_triangle(number):
    return (pow(number, 2) + number) / 2

data = open("input.txt", "r").read().split(",")
positions = list(map(lambda x: int(x), data))
print(positions)

min_total_fuel = 100000000000

for start_pos in range(0, max(positions)):
    fuel = 0
    for pos in positions:
        fuel += get_triangle(abs(start_pos - pos))

    if fuel < min_total_fuel:
        min_total_fuel = fuel

print(min_total_fuel)
    
