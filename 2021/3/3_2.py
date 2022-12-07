from functools import reduce

lines = open("input.txt", "r").read().splitlines()

# Assuming each binary number has the same length
no_of_bits = len(lines[0])

def difference_reducer(counter, bit):
    return counter - 1 if bit == "0" else counter + 1

def reduce_list_for(how_common):
    current_list = lines.copy()
    index = 0
    while len(current_list) > 1:
        all_bits_at_index = [line[index] for line in current_list]
        difference = reduce(difference_reducer, all_bits_at_index, 0)

        if (how_common == "most_common"):
            bit_to_keep = "0" if difference < 0 else "1"
        if (how_common == "least_common"):
            bit_to_keep = "0" if difference >= 0 else "1"


        def keep_bit_at_index(line):
            return line[index] == bit_to_keep

        current_list = list(filter(keep_bit_at_index, current_list))
        index += 1
    return current_list[0]

o2 = int(''.join(["1" if int(x) > 0 else "0" for x in reduce_list_for("most_common")]), 2)
co2 = int(''.join(["1" if int(x) > 0 else "0" for x in reduce_list_for("least_common")]), 2)

print(o2 * co2)
