from sys import stdin as s

n, k = map(int, s.readline().split())

arr = [i for i in range(1,n +1)]
temp = 0
answer = []

for i in range(n):
    temp += k-1
    if temp >= len(arr):
        temp = temp%len(arr)
    
    answer.append(str(arr.pop(temp)))

print("<",", ".join(answer)[:],">", sep="")