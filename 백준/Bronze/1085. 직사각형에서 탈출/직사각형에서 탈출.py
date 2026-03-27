from sys import stdin as s

x, y, w, h = map(int, s.readline().split())

print(min(x, y, (w-x), (h-y)))