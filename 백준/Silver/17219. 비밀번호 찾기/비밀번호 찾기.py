n, m = map(int, input().split())

pasDic = {}

for _ in range(n):
    site, password = input().split(" ")
    pasDic[site] = password

for _ in range(m):
    print(pasDic.get(input()))

