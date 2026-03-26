from sys import stdin as s

n = int(s.readline())
data = [(map(int, s.readline().split())) for _ in range(n)]

def dp():
    dp = [0] * 3
    n_dp = [0] * 3

    for r, g, b in data:
        if dp[0] == 0:
            dp[0] = r
            dp[1] = g
            dp[2] = b
            n_dp = dp[:]
        else:
            n_dp[0] = min(r + dp[1], r + dp[2])
            n_dp[1] = min(g + dp[0], g + dp[2])
            n_dp[2] = min(b + dp[0], b + dp[1])

        dp = n_dp[:]

    return min(n_dp)

print(dp())