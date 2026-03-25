from sys import stdin as s

n = int(s.readline())

queuestack = list(map(int, s.readline().split(' ')))

# 초기상태
arr = list(map(int, s.readline().split(' ')))

m = int(s.readline())

inputarr = list(map(int, s.readline().split(' ')))

answer = []

for i in range(n):
    if len(answer) == m:
        break
    if queuestack[n - i - 1] == 0:
        answer.append(arr[n - i - 1])

for i in range(m):
    if len(answer) == m:
        break
    answer.append(inputarr[i])

print(*answer)
