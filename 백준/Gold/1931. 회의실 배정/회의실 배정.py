from sys import stdin as s

n = int(s.readline())

endtime = 0
answer = 0

arr = [list(map(int, s.readline().split())) for _ in range(n)]

arr.sort(key=lambda x:(x[1], x[0]))

for newstart, newend in arr:
    if endtime <= newstart:
        answer +=1
        endtime = newend

print(answer)