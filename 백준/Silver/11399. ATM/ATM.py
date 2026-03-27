from sys import stdin as s

n = int(s.readline())

arr = list(map(int, s.readline().split()))

arr.sort()

dp = [0] * n
dp[0] = arr[0]
answer = 0

for i in range(1, n):
    dp[i] = dp[i -1] + arr[i]

for i in range(n):
    answer += dp[i]

print(answer)