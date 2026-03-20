from sys import stdin as s

n = int(s.readline())

bags = 0

while n >= 0:
    if n % 5 == 0:
        bags += n // 5
        print(bags)
        break

    n -= 3
    bags += 1
else:
    print(-1)