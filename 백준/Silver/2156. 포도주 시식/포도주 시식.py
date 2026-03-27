from sys import stdin as s

n = int(s.readline())

arr = [int(s.readline()) for _ in range(n)]

dp = [0] * (n + 1)

dp[1] = arr[0]
if n>1:
    dp[2] = arr[0] + arr[1]
if n > 2:
    dp[3] = max(dp[2], arr[0] + arr[2], arr[1] + arr[2])
if n > 3:
    for i in range(4, n+1):
        dp[i] = max((dp[i-3] + arr[i - 1] + arr[i-2]), (dp[i-2] + arr[i - 1]) , dp[i-1])

print(max(dp))