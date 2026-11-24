n = int(input())

a = []
b = []

answer = 0

for i in range(2):
    for num in map(int, input().split(" ")):
        if i == 0:
            a.append(num)
        else:
            b.append(num)

a.sort()
b.sort(reverse=True)

for i in range(n):
    answer += a[i] * b[i]
    
print(answer)