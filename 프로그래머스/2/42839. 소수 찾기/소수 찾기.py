import math
from itertools import permutations

def check_prime(number):
    if number < 2:
        return False
    
    for i in range(2, int(math.sqrt(number)) + 1):
        if number % i == 0:
            return False
    return True

def solution(numbers):
    answer = 0
    num_set = set()
    
    for i in range(1, len(numbers) + 1):
        for p in permutations(numbers, i):
            num_set.add(int("".join(p)))
    
    for num in num_set:
        if check_prime(num):
            answer += 1
    
    return answer