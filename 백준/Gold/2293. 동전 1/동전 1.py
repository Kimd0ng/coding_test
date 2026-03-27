from sys import stdin as s

n, k = map(int, s.readline().split())

dp = [0]*(k+1)

coins = [int(s.readline()) for _ in range(n)]

dp[0] = 1

for coin in coins:
    for i in range(coin, k+1):
        dp[i] = dp[i] + dp[i-coin]

print(dp[k])