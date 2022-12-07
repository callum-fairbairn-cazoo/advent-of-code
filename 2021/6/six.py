import copy

class Fish:
    def __init__(self, value):
        self.timer = int(value)

    def get_timer(self):
        return self.timer

    def decrement_timer(self):
        if (self.timer == 0):
            self.timer = 6
        else:
            self.timer -= 1

data = open("test.txt", "r").read().split(",")

fishies = list(map(lambda x: Fish(x), data))

for day in range(0, 256):
    # print("Day ", day)
    new_fishies = []

    for fish in fishies:
        # print(fish.get_timer())
        if (fish.get_timer() == 0):
            new_fishies.append(Fish(8))
        fish.decrement_timer()

    fishies.extend(new_fishies)
    
print(len(fishies))