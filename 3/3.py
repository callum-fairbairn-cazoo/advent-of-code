from functools import reduce

lines = open("input.txt", "r").read().splitlines()

# Assuming each binary number has the same length
no_of_bits = len(lines[0])

def iterate_bit_difference(counter, line):
    for i, bit in enumerate(line):
        if bit == "0":
            counter[i] -= 1
        if bit == "1":
            counter[i] += 1
    return counter

bit_differences = reduce(iterate_bit_difference, lines, [0] * no_of_bits)

gamma_binary = ''.join(["1" if x > 0 else "0" for x in bit_differences ])
gamma = int(gamma_binary, 2)

epsilon_binary = ''.join(["1" if x < 0 else "0" for x in bit_differences ])
epsilon = int(epsilon_binary, 2)

print(gamma * epsilon)
