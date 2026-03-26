from sys import stdin as s

n, k = map(int, s.readline().split())

arr = [(map(int, s.readline().split())) for _ in range(n)]

# dp 역순으로 생각하기
# 중복선택 방지
def dp():
    dp = [0] * (k+1)
    
    for w, v in arr:
        for j in range(k, w - 1, -1):
            dp[j] = max(dp[j], dp[j-w] + v)

    return dp[k]

print(dp())